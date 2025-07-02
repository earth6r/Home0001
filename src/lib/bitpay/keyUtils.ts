import crypto from 'crypto'

export class BitPayKeyUtils {
  /**
   * Generate a private key using secp256k1 curve
   */
  static generatePrivateKey(): string {
    try {
      // Try to use BitPay SDK first if available
      try {
        const { ECKey } = require('bitpay-sdk')
        const key = new ECKey()
        return key.getPrivate('hex')
      } catch (sdkError) {
        console.log('BitPay SDK not available, using crypto fallback')
      }

      // Fallback to crypto
      const privateKey = crypto.randomBytes(32)
      return privateKey.toString('hex')
    } catch (error) {
      console.error('Failed to generate BitPay private key:', error)
      throw new Error('Cannot generate BitPay private key')
    }
  }

  /**
   * Generate public key from private key
   */
  static getPublicKeyFromPrivateKey(privateKeyHex: string): string {
    try {
      // Try to use BitPay SDK first if available
      try {
        const { ECKey } = require('bitpay-sdk')
        const key = ECKey.fromHex(privateKeyHex)
        return key.getPublic('hex')
      } catch (sdkError) {
        console.log('BitPay SDK not available, using crypto fallback')
      }

      // Fallback to crypto
      const privateKey = Buffer.from(privateKeyHex, 'hex')
      const ecdh = crypto.createECDH('secp256k1')
      ecdh.setPrivateKey(privateKey)
      const publicKey = ecdh.getPublicKey()
      return publicKey.toString('hex')
    } catch (error) {
      console.error('Failed to derive public key:', error)
      throw new Error('Cannot derive BitPay public key')
    }
  }

  /**
   * Generate SIN (System Identification Number) from public key
   */
  static getSinFromPublicKey(publicKeyHex: string): string {
    try {
      const publicKey = Buffer.from(publicKeyHex, 'hex')

      // Step 1: SHA256 hash of public key
      const sha256Hash = crypto.createHash('sha256').update(publicKey).digest()

      // Step 2: RIPEMD160 hash of SHA256 hash
      const ripemd160Hash = crypto
        .createHash('ripemd160')
        .update(sha256Hash)
        .digest()

      // Step 3: Add version byte (0x0F for SIN)
      const versionedHash = Buffer.concat([
        Buffer.from([0x0f, 0x02]),
        ripemd160Hash,
      ])

      // Step 4: Double SHA256 for checksum
      const checksum = crypto
        .createHash('sha256')
        .update(crypto.createHash('sha256').update(versionedHash).digest())
        .digest()
        .slice(0, 4)

      // Step 5: Combine and encode in Base58
      const fullHash = Buffer.concat([versionedHash, checksum])
      return this.base58Encode(fullHash)
    } catch (error) {
      console.error('Failed to generate SIN:', error)
      throw new Error('Cannot generate BitPay SIN')
    }
  }

  /**
   * Generate x-identity header from public key
   */
  static generateXIdentity(publicKeyHex: string): string {
    return publicKeyHex
  }

  /**
   * Generate x-signature header
   */
  static generateXSignature(
    privateKeyHex: string,
    url: string,
    body: string = ''
  ): string {
    try {
      // First, normalize the private key to ensure it's in hex format
      let hexKey = privateKeyHex

      // Check if key might be a JSON string and try to extract the hex
      if (typeof privateKeyHex === 'string' && privateKeyHex.startsWith('{')) {
        try {
          const keyObj = JSON.parse(privateKeyHex)
          if (keyObj.priv) {
            hexKey = keyObj.priv
            console.log('Extracted hex key from JSON priv property')
          } else if (keyObj.ec && keyObj.ec.priv) {
            hexKey = keyObj.ec.priv
            console.log('Extracted hex key from JSON ec.priv property')
          }
        } catch (parseError) {
          console.log(
            'Key appears to be in JSON format but could not be parsed'
          )
        }
      }

      const message = url + body

      // Method 1: Try crypto with PEM format
      try {
        const pemKey = this.convertToPem(hexKey)
        const sign = crypto.createSign('SHA256')
        sign.update(message)
        const signature = sign.sign(pemKey)
        return signature.toString('hex')
      } catch (error) {
        console.log(
          'PEM signing failed:',
          error instanceof Error ? error.message : String(error)
        )
      }

      // Method 2: Try direct buffer method
      const privateKey = Buffer.from(privateKeyHex, 'hex')
      const sign = crypto.createSign('SHA256')
      sign.update(message)
      const signature = sign.sign({
        key: privateKey,
        format: 'der',
        type: 'sec1',
      })
      return signature.toString('hex')
    } catch (error) {
      console.error('Failed to generate signature:', error)
      throw new Error(
        'Cannot generate BitPay signature: ' +
          (error instanceof Error ? error.message : String(error))
      )
    }
  }

  /**
   * Convert a hex private key to PEM format
   */
  private static convertToPem(privateKeyHex: string): string {
    const privateKeyBuffer = Buffer.from(privateKeyHex, 'hex')
    const base64 = privateKeyBuffer.toString('base64')
    const lines = base64.match(/.{1,64}/g) || []
    return `-----BEGIN EC PRIVATE KEY-----\n${lines.join(
      '\n'
    )}\n-----END EC PRIVATE KEY-----`
  }

  /**
   * Base58 encoding (simplified version)
   */
  static base58Encode(buffer: Buffer): string {
    const alphabet =
      '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
    let num = buffer.toString('hex')
    let result = ''
    const BASE = 58

    // Use a different approach without BigInt
    let remainders: number[] = []
    while (num.length > 0) {
      let remainder = 0
      let temp = ''

      for (let i = 0; i < num.length; i++) {
        const digit = parseInt(num[i], 16)
        const value = remainder * 16 + digit
        remainder = value % BASE
        const quotient = Math.floor(value / BASE)
        if (temp !== '' || quotient !== 0) {
          temp += quotient.toString(16)
        }
      }

      remainders.push(remainder)
      num = temp
    }

    // Build result from remainders
    for (let i = remainders.length - 1; i >= 0; i--) {
      result += alphabet[remainders[i]]
    }

    // Add leading zeros
    for (let i = 0; i < buffer.length && buffer[i] === 0; i++) {
      result = '1' + result
    }

    return result
  }
}
