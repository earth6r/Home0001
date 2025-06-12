/**
 * Test script to validate BitPay signature generation works
 * Run with: node src/scripts/test-bitpay-signature.js
 */

require('dotenv').config()
const crypto = require('crypto')

// Get environment variables
const privateKey = process.env.BITPAY_PRIVATE_KEY
const publicKey = process.env.BITPAY_PUBLIC_KEY
const merchantToken =
  process.env.BITPAY_MERCHANT_TOKEN || process.env.BITPAY_API_TOKEN

console.log('===== BitPay Signature Test =====')
console.log(`Private key exists: ${!!privateKey}`)
console.log(`Private key length: ${privateKey ? privateKey.length : 'N/A'}`)
console.log(`Public key exists: ${!!publicKey}`)
console.log(`Merchant token exists: ${!!merchantToken}`)

// Test message to sign
const testUrl = 'https://test.bitpay.com/invoices'
const testBody = JSON.stringify({
  price: 100,
  currency: 'USD',
  token: merchantToken,
})
const testMessage = testUrl + testBody

console.log('\n===== Signing Test =====')

// Method 1: Try ECKey from BitPay SDK
try {
  console.log('\nTrying BitPay SDK ECKey method...')
  const { ECKey } = require('bitpay-sdk/dist/Key')
  const key = ECKey.fromHex(privateKey)
  const sdkSignature = key.sign(testMessage).toString('hex')
  console.log('✅ SUCCESS! SDK ECKey signing worked')
  console.log('Signature:', sdkSignature.substring(0, 20) + '...')
} catch (error) {
  console.error('❌ Failed BitPay SDK ECKey method:', error.message)
}

// Method 2: PEM Method
try {
  console.log('\nTrying PEM conversion method...')
  // Convert private key to PEM format
  const convertToPem = privateKeyHex => {
    const privateKeyBuffer = Buffer.from(privateKeyHex, 'hex')
    const base64 = privateKeyBuffer.toString('base64')
    const lines = base64.match(/.{1,64}/g) || []
    return `-----BEGIN EC PRIVATE KEY-----\n${lines.join(
      '\n'
    )}\n-----END EC PRIVATE KEY-----`
  }

  const pemKey = convertToPem(privateKey)
  const sign = crypto.createSign('SHA256')
  sign.update(testMessage)
  const signature = sign.sign(pemKey).toString('hex')
  console.log('✅ SUCCESS! PEM signing worked')
  console.log('Signature:', signature.substring(0, 20) + '...')
} catch (error) {
  console.error('❌ Failed PEM method:', error.message)
}

// Method 3: Direct Buffer Method
try {
  console.log('\nTrying direct buffer method...')
  const privateKeyBuffer = Buffer.from(privateKey, 'hex')
  const sign = crypto.createSign('SHA256')
  sign.update(testMessage)
  const signature = sign
    .sign({
      key: privateKeyBuffer,
      format: 'der',
      type: 'sec1',
    })
    .toString('hex')
  console.log('✅ SUCCESS! Direct buffer signing worked')
  console.log('Signature:', signature.substring(0, 20) + '...')
} catch (error) {
  console.error('❌ Failed direct buffer method:', error.message)
}

console.log(
  '\nTest completed. If any method succeeded, your keys should work with BitPay.'
)
