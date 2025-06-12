const { KeyUtils } = require('bitpay-sdk')
const fs = require('fs')
const path = require('path')
const axios = require('axios')

async function setupBitPaySimple() {
  try {
    console.log('🔄 Setting up BitPay using the official SDK...')

    // Step 1: Generate private key using BitPay SDK
    console.log('🔑 Generating private key...')
    const privateKey = KeyUtils.generateNewKeypair()
    console.log('Private Key:', privateKey.toString())

    // Step 2: Generate public key from private key
    console.log('🔑 Generating public key...')
    const publicKey = KeyUtils.getPublicKeyFromPrivateKey(privateKey)
    console.log('Public Key:', publicKey.toString())

    // Step 3: Generate SIN from private key
    console.log('🔑 Generating SIN...')
    const sin = KeyUtils.getSinFromKey(privateKey)
    console.log('SIN:', sin)

    // Step 4: Generate x-identity header
    console.log('🔑 Generating x-identity header...')
    const xIdentity = KeyUtils.generatePubKeyHexFromPrivateKey(privateKey)
    console.log('X-Identity:', xIdentity)

    // Step 4: Prepare token request
    const tokenData = {
      id: sin,
      label: 'Home0001 Application',
      facade: 'merchant',
    }

    const url = 'https://test.bitpay.com/tokens'
    const body = JSON.stringify(tokenData)

    // Step 5: Generate signature
    console.log('🔑 Generating signature...')
    const fullUrl = url + body
    const xSignature = KeyUtils.sign(fullUrl, privateKey)
    console.log('X-Signature:', xSignature)

    // Step 6: Make API request
    console.log('🌐 Requesting token from BitPay API...')

    try {
      const response = await axios.post(url, tokenData, {
        headers: {
          'x-accept-version': '2.0.0',
          'Content-Type': 'application/json',
          'x-identity': xIdentity,
          'x-signature': xSignature,
        },
        timeout: 30000,
      })

      console.log('\n🎉 SUCCESS! Token generated:')
      console.log('Response:', JSON.stringify(response.data, null, 2))

      const tokenResponse = response.data.data || response.data
      const token = tokenResponse.token

      if (token) {
        // Save configuration
        const configData = {
          BitPayConfiguration: {
            Environment: 'Test',
            EnvConfig: {
              Test: {
                PrivateKey: privateKey.toString(),
                PublicKey: publicKey.toString(),
                SIN: sin,
                XIdentity: xIdentity,
                ApiTokens: {
                  merchant: token,
                },
              },
            },
          },
          createdAt: new Date().toISOString(),
        }

        const configPath = path.join(
          __dirname,
          '..',
          '..',
          'bitpay-config.json'
        )
        fs.writeFileSync(configPath, JSON.stringify(configData, null, 2))

        console.log('\n📝 Add this to your .env file:')
        console.log(`BITPAY_API_TOKEN=${token}`)

        console.log(`\n💾 Configuration saved to: ${configPath}`)
        console.log('\n✅ BitPay setup complete!')
      } else {
        console.log('❌ No token found in response')
      }
    } catch (apiError) {
      console.log('\n❌ API request failed:')
      console.log('Status:', apiError.response?.status)
      console.log('Message:', apiError.message)

      if (apiError.response?.data) {
        console.log('Data:', JSON.stringify(apiError.response.data, null, 2))
      }

      console.log(
        '\n💡 This is normal - BitPay may require manual token approval.'
      )
      console.log('📋 Manual setup options:')
      console.log('1. Go to https://test.bitpay.com/dashboard')
      console.log('2. Navigate to Settings > API Tokens')
      console.log('3. Generate a token manually')
      console.log('4. Add it to your .env as BITPAY_API_TOKEN=your_token')
    }
  } catch (error) {
    console.error('❌ Error setting up BitPay:', error.message)
  }
}

function verifyBitPaySetup() {
  try {
    console.log('🔍 Checking BitPay configuration...')

    const envPath = path.join(__dirname, '..', '..', '.env')

    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8')

      if (envContent.includes('BITPAY_API_TOKEN')) {
        console.log('✅ BITPAY_API_TOKEN found in .env file')

        const tokenMatch = envContent.match(/BITPAY_API_TOKEN=(.+)/)
        if (tokenMatch && tokenMatch[1]) {
          const token = tokenMatch[1].trim()
          console.log(`📊 Token length: ${token.length} characters`)
          console.log(`🔑 Token preview: ${token.substring(0, 10)}...`)

          if (token.length > 20) {
            console.log('✅ Token appears to be valid format')
          } else {
            console.log('⚠️  Token might be too short')
          }
        }
      } else {
        console.log('❌ BITPAY_API_TOKEN not found in .env file')
      }
    } else {
      console.log('❌ .env file not found')
    }
  } catch (error) {
    console.error('❌ Error verifying setup:', error)
  }
}

// Check command line arguments
const command = process.argv[2]

if (command === 'verify') {
  verifyBitPaySetup()
} else {
  setupBitPaySimple()
}
