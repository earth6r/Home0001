/**
 * Script to fix the current BitPay private key format
 * This will convert a JSON ECKey in the .env file to the proper hex format
 */
require('dotenv').config()
const fs = require('fs')
const path = require('path')

function fixCurrentKey() {
  console.log('🔄 Fixing BitPay private key format...')

  // Get the current key from .env
  const privateKeyStr = process.env.BITPAY_PRIVATE_KEY

  if (!privateKeyStr) {
    console.log('❌ No BITPAY_PRIVATE_KEY found in .env file')
    return
  }

  console.log('Current key format:', privateKeyStr.substring(0, 30) + '...')

  try {
    // Check if the key is already in hex format (not starting with '{')
    if (!privateKeyStr.trim().startsWith('{')) {
      console.log(
        '✅ Key appears to be already in hex format. No changes needed.'
      )
      return
    }

    // Parse the JSON key object
    const keyObj = JSON.parse(privateKeyStr)

    // Try different extraction methods based on possible formats
    let hexKey

    if (keyObj.priv) {
      // Format 1: Direct priv property
      hexKey = keyObj.priv
      console.log('Found private key in "priv" property')
    } else if (keyObj.ec && keyObj.ec.priv) {
      // Format 2: Nested in ec.priv
      hexKey = keyObj.ec.priv
      console.log('Found private key in "ec.priv" property')
    } else {
      console.log(
        '⚠️ Could not find private key in known locations of the JSON object'
      )
      console.log('❌ Unable to extract hex key from JSON object')
      return
    }

    if (hexKey) {
      console.log(
        `Extracted hex key: ${hexKey.substring(0, 10)}...${hexKey.substring(
          hexKey.length - 10
        )}`
      )

      // Update the .env file
      const envPath = path.resolve(process.cwd(), '.env')
      let envContent = fs.readFileSync(envPath, 'utf8')

      // Replace the JSON key with the hex key
      envContent = envContent.replace(
        /BITPAY_PRIVATE_KEY=.*/,
        `BITPAY_PRIVATE_KEY=${hexKey}`
      )

      fs.writeFileSync(envPath, envContent)
      console.log('✅ Updated .env file with hex format private key')

      // Also verify and update public key if possible
      if (keyObj.pub) {
        let pubKey
        if (Array.isArray(keyObj.pub)) {
          pubKey = keyObj.pub.join('')
        } else {
          pubKey = keyObj.pub
        }

        if (pubKey && !process.env.BITPAY_PUBLIC_KEY) {
          envContent = envContent.replace(
            /BITPAY_PUBLIC_KEY=.*/,
            `BITPAY_PUBLIC_KEY=${pubKey}`
          )
          fs.writeFileSync(envPath, envContent)
          console.log('✅ Also updated public key')
        }
      }
    }
  } catch (error) {
    console.error('❌ Error fixing key format:', error)
    console.log(
      '\nPlease run the setup-bitpay.js script to generate new keys in the correct format.'
    )
  }
}

// Run the fix
fixCurrentKey()
