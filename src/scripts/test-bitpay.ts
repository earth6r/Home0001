import axios from 'axios'
import * as fs from 'fs'
import * as path from 'path'

async function testBitPayInvoice() {
  try {
    console.log('🧪 Testing BitPay invoice creation...')

    // Check if we have a BitPay token in .env
    const envPath = path.join(__dirname, '..', '..', '.env')

    if (!fs.existsSync(envPath)) {
      console.log(
        '❌ No .env file found. Add BITPAY_API_TOKEN to your .env file.'
      )
      return
    }

    const envContent = fs.readFileSync(envPath, 'utf8')
    const tokenMatch = envContent.match(/BITPAY_API_TOKEN=(.+)/)

    if (!tokenMatch || !tokenMatch[1]) {
      console.log('❌ BITPAY_API_TOKEN not found in .env file.')
      console.log('   Add: BITPAY_API_TOKEN=your_token_here')
      return
    }

    const token = tokenMatch[1].trim()
    console.log(
      `✅ Found token (${token.length} chars): ${token.substring(0, 10)}...`
    )

    // Test BitPay API directly
    console.log('🔗 Testing BitPay API connection...')

    const invoiceData = {
      price: 10,
      currency: 'USD',
      orderId: `test-${Date.now()}`,
      itemDesc: 'Test Invoice from Home0001',
      buyer: {
        name: 'Test User',
        email: 'test@example.com',
      },
      notificationURL: 'https://your-domain.com/api/bitpay/webhook',
      redirectURL: 'https://your-domain.com/payment-success',
      acceptanceWindow: 900000, // 15 minutes
      // Include token in request
      token: token,
    }

    console.log('📝 Invoice data:', JSON.stringify(invoiceData, null, 2))

    try {
      // Try different API approaches
      console.log('🔄 Attempting BitPay API call...')

      const response = await axios.post(
        'https://bitpay.com/api/invoices',
        invoiceData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          timeout: 10000,
        }
      )

      console.log('\n🎉 SUCCESS! Test invoice created:')
      console.log('================================')
      console.log(`Response Status: ${response.status}`)
      console.log(`Invoice Data:`, JSON.stringify(response.data, null, 2))
      console.log('================================')

      console.log('\n✅ BitPay integration is working correctly!')

      // Save test result
      const testResult = {
        testDate: new Date().toISOString(),
        success: true,
        response: response.data,
      }

      const testPath = path.join(
        __dirname,
        '..',
        '..',
        'bitpay-test-result.json'
      )
      fs.writeFileSync(testPath, JSON.stringify(testResult, null, 2))
      console.log(`💾 Test result saved to: ${testPath}`)
    } catch (apiError: any) {
      console.log('\n❌ BitPay API Error:')
      console.log('Status:', apiError.response?.status)
      console.log('Data:', JSON.stringify(apiError.response?.data, null, 2))
      console.log('Message:', apiError.message)

      console.log('\n🔧 Common issues:')
      console.log('- Token might be invalid or expired')
      console.log('- Wrong API environment (test vs prod)')
      console.log('- Missing required fields')
      console.log('- BitPay API might be down')
    }
  } catch (error: any) {
    console.error('❌ Error testing BitPay invoice:', error.message)
    console.log('\n🔧 Troubleshooting tips:')
    console.log('- Make sure BITPAY_API_TOKEN is in your .env file')
    console.log('- Check token format and permissions')
    console.log('- Try generating a new token in BitPay dashboard')
  }
}

testBitPayInvoice()
