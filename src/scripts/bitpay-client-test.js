/**
 * Simple BitPay client test
 * Shows the correct way to use the private key in hex format
 */
require('dotenv').config()
const crypto = require('crypto')
const { KeyUtils } = require('bitpay-sdk')
const axios = require('axios')

// Function to create a proper BitPay request
async function createBitPayRequest() {
  try {
    console.log('⚙️ Testing BitPay client with proper key format...')

    // 1. Get environment variables
    const apiToken = process.env.BITPAY_API_TOKEN
    const privateKeyHex = process.env.BITPAY_PRIVATE_KEY
    const publicKey = process.env.BITPAY_PUBLIC_KEY

    // Always log the key format (without revealing the entire key)
    console.log(`Private key format: ${typeof privateKeyHex}`)
    console.log(`First 5 chars: ${privateKeyHex.substring(0, 5)}...`)
    console.log(`Key length: ${privateKeyHex.length} characters`)

    // 2. Set up the request data
    const url = 'https://test.bitpay.com/invoices'
    const invoiceData = {
      price: 10.0,
      currency: 'USD',
      token: apiToken,
      notificationURL: 'https://your-app.com/bitpay/webhook',
      redirectURL: 'https://your-app.com/payment/complete',
    }

    console.log('Preparing invoice request...')
    const body = JSON.stringify(invoiceData)

    // 3. Create ECKey from hex private key
    console.log('Converting private key to BitPay ECKey...')
    let ecPrivateKey

    try {
      // Attempt to create an ECKey from the hex string
      ecPrivateKey = KeyUtils.load_keypair(privateKeyHex)
      console.log(
        '✓ Successfully loaded private key using KeyUtils.load_keypair()'
      )
    } catch (loadError) {
      console.log(
        'Could not load keypair directly, trying fromHex():',
        loadError.message
      )

      try {
        // Try alternative ECKey creation method
        const { ECKey } = require('bitpay-sdk')
        ecPrivateKey = ECKey.fromHex(privateKeyHex)
        console.log('✓ Successfully created ECKey using ECKey.fromHex()')
      } catch (hexError) {
        console.error('Failed to create ECKey from hex:', hexError)

        // If it's a JSON string, try to extract the hex key
        if (privateKeyHex.startsWith('{')) {
          try {
            const keyObj = JSON.parse(privateKeyHex)
            if (keyObj.priv) {
              const extractedHex = keyObj.priv
              console.log(
                'Extracted hex key from JSON object, length:',
                extractedHex.length
              )

              const { ECKey } = require('bitpay-sdk')
              ecPrivateKey = ECKey.fromHex(extractedHex)
              console.log('✓ Successfully created ECKey from extracted hex')
            } else {
              console.error('Could not find private key in JSON object')
            }
          } catch (jsonError) {
            console.error('Failed to parse JSON key:', jsonError)
          }
        }
      }
    }

    if (!ecPrivateKey) {
      throw new Error('Failed to create ECKey from private key')
    }

    // 4. Generate signature
    console.log('Generating signature...')
    const signature = ecPrivateKey.sign(url + body)
    console.log(
      'Signature generated:',
      signature.toString('hex').substring(0, 10) + '...'
    )

    // 5. Set up headers
    const headers = {
      'Content-Type': 'application/json',
      'X-Accept-Version': '2.0.0',
      'X-Identity': publicKey,
      'X-Signature': signature.toString('hex'),
    }

    console.log('📡 Sending request to BitPay...')
    console.log('Url:', url)
    console.log('Headers:', {
      'Content-Type': headers['Content-Type'],
      'X-Accept-Version': headers['X-Accept-Version'],
      'X-Identity': headers['X-Identity'].substring(0, 10) + '...',
      'X-Signature': headers['X-Signature'].substring(0, 10) + '...',
    })

    // 6. Only send if not in test mode
    console.log('\nThis is a demonstration script.')
    console.log(
      'To actually make the request, uncomment the axios section below.\n'
    )

    /*
    // Send the request
    const response = await axios.post(url, body, { headers });
    console.log('✓ Request successful!');
    console.log('Response:', JSON.stringify(response.data, null, 2));
    */

    // Display correct format reminder
    console.log('\n📝 REMINDER:')
    console.log(
      'The private key in your .env file should be a plain hex string'
    )
    console.log(
      'Example format: BITPAY_PRIVATE_KEY=5fdcc76804bbfc288559a2846eb776bc0df5562c07fe09aded814da7131cdda0'
    )
    console.log(
      'Run "npm run fix-bitpay-key" if your key is still in JSON format'
    )
  } catch (error) {
    console.error('❌ Error creating BitPay request:', error)
  }
}

// Run the test
createBitPayRequest()
