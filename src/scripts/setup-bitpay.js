const { KeyUtils } = require('bitpay-sdk')
const fs = require('fs')
const path = require('path')
const axios = require('axios')

async function setupBitPaySimple() {
  try {
    console.log('🔄 Setting up BitPay using the official SDK...')

    // Step 1: Generate private key using BitPay SDK
    console.log('🔑 Generating private key...')
    const ecPrivateKey = new KeyUtils().generate_keypair()
    // Convert to hex format for storage in .env file
    const privateKeyHex = ecPrivateKey.getPrivate('hex')
    console.log('Private Key (hex):', privateKeyHex)

    // Step 2: Generate public key from private key
    console.log('🔑 Generating public key...')
    const publicKey = new KeyUtils().getPublicKeyFromPrivateKey(ecPrivateKey)
    console.log('Public Key:', publicKey.toString())

    // Step 3: Generate SIN from private key
    console.log('🔑 Generating SIN...')
    const sin = new KeyUtils().get_sin_from_key(ecPrivateKey)
    console.log('SIN:', sin)

    // Step 4: Generate x-identity header
    console.log('🔑 Generating x-identity header...')
    const xIdentity = publicKey.toString()
    console.log('X-Identity:', xIdentity)

    // Step 5: Prepare token request
    const tokenData = {
      id: sin,
      label: 'Home0001 Application',
      facade: 'merchant',
    }

    const url = 'https://test.bitpay.com/tokens'

    // Step 6: Make API request
    console.log('🌐 Requesting token from BitPay API...')

    try {
      const response = await axios.post(url, tokenData, {
        headers: {
          'x-accept-version': '2.0.0',
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      })

      console.log('\n🎉 SUCCESS! Token generated:')
      console.log('Response:', JSON.stringify(response.data, null, 2))

      const tokenResponse = response.data.data || response.data
      const token = tokenResponse[0].token

      if (token) {
        // Save configuration to JSON file
        const configData = {
          BitPayConfiguration: {
            Environment: 'Prod',
            EnvConfig: {
              Test: {
                PrivateKey: privateKeyHex, // Store as hex string instead of JSON object
                PublicKey: publicKey.toString(),
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
        console.log(`\n💾 Configuration saved to: ${configPath}`)

        // Update .env file with the token and keys
        const envPath = path.join(__dirname, '..', '..', '.env')
        if (fs.existsSync(envPath)) {
          console.log('\n🔄 Updating .env file with BitPay configuration...')
          let envContent = fs.readFileSync(envPath, 'utf8')

          // Update or add BITPAY_API_TOKEN
          if (envContent.includes('GENERATED_BITPAY_API_TOKEN=')) {
            envContent = envContent.replace(
              /GENERATED_BITPAY_API_TOKEN=.*/g,
              `GENERATED_BITPAY_API_TOKEN=${token}`
            )
          } else {
            envContent += `\nGENERATED_BITPAY_API_TOKEN=${token}`
          }

          // Update or add BITPAY_PRIVATE_KEY
          if (envContent.includes('BITPAY_PRIVATE_KEY=')) {
            envContent = envContent.replace(
              /BITPAY_PRIVATE_KEY=.*/g,
              `BITPAY_PRIVATE_KEY=${privateKeyHex}`
            )
          } else {
            envContent += `\nBITPAY_PRIVATE_KEY=${privateKeyHex}`
          }

          // Update or add BITPAY_PUBLIC_KEY
          if (envContent.includes('BITPAY_PUBLIC_KEY=')) {
            envContent = envContent.replace(
              /BITPAY_PUBLIC_KEY=.*/g,
              `BITPAY_PUBLIC_KEY=${publicKey.toString()}`
            )
          } else {
            envContent += `\nBITPAY_PUBLIC_KEY=${publicKey.toString()}`
          }

          // Update or add BITPAY_SIN
          if (envContent.includes('BITPAY_SIN=')) {
            envContent = envContent.replace(
              /BITPAY_SIN=.*/g,
              `BITPAY_SIN=${sin}`
            )
          } else {
            envContent += `\nBITPAY_SIN=${sin}`
          }

          fs.writeFileSync(envPath, envContent)
          console.log('✅ .env file updated successfully!')
        } else {
          console.log('❌ .env file not found, creating new one...')
          const envContent = `GENERATED_BITPAY_API_TOKEN=${token}\nBITPAY_PRIVATE_KEY=${privateKeyHex}\nBITPAY_PUBLIC_KEY=${publicKey.toString()}\nBITPAY_SIN=${sin}`
          fs.writeFileSync(envPath, envContent)
          console.log('✅ New .env file created with BitPay configuration')
        }

        console.log('\n✅ BitPay setup complete!')
        console.log(
          '\n📝 IMPORTANT: You need to go to BitPay dashboard to approve this token'
        )
        console.log('Visit: https://bitpay.com/dashboard/merchant/api-tokens')
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

      console.log('\n--- BitPay Configuration Check ---')

      // Check API Token
      if (envContent.includes('BITPAY_API_TOKEN')) {
        const tokenMatch = envContent.match(/BITPAY_API_TOKEN=([^\n]+)/)
        if (tokenMatch && tokenMatch[1]) {
          const token = tokenMatch[1].trim()
          console.log(
            `✅ API Token: ${token.substring(0, 10)}... (${
              token.length
            } characters)`
          )
        } else {
          console.log('❌ BITPAY_API_TOKEN found but empty')
        }
      } else {
        console.log('❌ BITPAY_API_TOKEN not found in .env file')
      }

      // Check Private Key
      if (envContent.includes('BITPAY_PRIVATE_KEY')) {
        const keyMatch = envContent.match(/BITPAY_PRIVATE_KEY=([^\n]+)/)
        if (keyMatch && keyMatch[1]) {
          const key = keyMatch[1].trim()

          // If the key is a JSON object, it's in the wrong format
          if (key.startsWith('{') && key.includes('ec')) {
            console.log(
              '❌ BITPAY_PRIVATE_KEY is in JSON format. Should be a hex string.'
            )
            console.log('   Run this script again to fix it.')
          } else {
            console.log(
              `✅ Private Key: ${key.substring(0, 10)}... (${
                key.length
              } characters)`
            )
            if (key.length >= 64) {
              console.log('   Appears to be in correct hex format')
            } else {
              console.log('⚠️  Private Key might be too short for hex format')
            }
          }
        } else {
          console.log('❌ BITPAY_PRIVATE_KEY found but empty')
        }
      } else {
        console.log('❌ BITPAY_PRIVATE_KEY not found in .env file')
      }

      // Check Public Key and SIN
      console.log(
        envContent.includes('BITPAY_PUBLIC_KEY')
          ? '✅ BITPAY_PUBLIC_KEY found'
          : '❌ BITPAY_PUBLIC_KEY not found'
      )
      console.log(
        envContent.includes('BITPAY_SIN')
          ? '✅ BITPAY_SIN found'
          : '❌ BITPAY_SIN not found'
      )

      console.log(
        '\nℹ️  If any component is missing or in the wrong format, run the script again without parameters'
      )
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
