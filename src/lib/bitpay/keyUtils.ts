import crypto from 'crypto'

export class BitPayKeyUtils {
  /**
   * Generate a private key using secp256k1 curve
   */
  static generatePrivateKey(): string {
    // Generate 32 random bytes for private key
    const privateKey = crypto.randomBytes(32)
    return privateKey.toString('hex')
  }

  /**
   * Generate public key from private key
   */
  static getPublicKeyFromPrivateKey(privateKeyHex: string): string {
    const privateKey = Buffer.from(privateKeyHex, 'hex')
    const ecdh = crypto.createECDH('secp256k1')
    ecdh.setPrivateKey(privateKey)
    const publicKey = ecdh.getPublicKey()
    return publicKey.toString('hex')
  }

  /**
   * Generate SIN (System Identification Number) from public key
   */
  static getSinFromPublicKey(publicKeyHex: string): string {
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
    const message = url + body
    const privateKey = Buffer.from(privateKeyHex, 'hex')

    const sign = crypto.createSign('SHA256')
    sign.update(message)
    const signature = sign.sign({
      key: privateKey,
      format: 'der',
      type: 'sec1',
    })

    return signature.toString('hex')
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
