import { KeyUtils } from 'bitpay-sdk'
import { BitPayKeyUtils } from './keyUtils'
import type {
  BitPayKeys,
  BitPayTokenResponse,
  BitPayInvoiceData,
  BitPayInvoiceResponse,
  BitPayEnvironment,
  BitPayFacade,
} from './types'

export class BitPayClient {
  private environment: BitPayEnvironment
  private baseUrl: string
  private privateKey?: string
  private publicKey?: string
  private merchantToken?: string
  private payoutToken?: string
  private sin?: string

  constructor(environment: BitPayEnvironment = 'test') {
    this.environment = environment
    this.baseUrl =
      environment === 'prod' ? 'https://bitpay.com' : 'https://test.bitpay.com'

    // Get keys from environment variables
    this.privateKey = process.env.BITPAY_PRIVATE_KEY
    this.publicKey = process.env.BITPAY_PUBLIC_KEY
    this.merchantToken =
      process.env.BITPAY_MERCHANT_TOKEN || process.env.BITPAY_API_TOKEN // Fallback to API token
    this.payoutToken = process.env.BITPAY_PAYOUT_TOKEN
    this.sin = process.env.BITPAY_SIN

    // Validate that we have a proper private key
    if (!this.privateKey || this.privateKey === this.merchantToken) {
      console.warn('BitPay: Private key is missing or appears to be invalid')
    }
  }

  /**
   * Generate new keys and SIN
   */
  static generateKeys(): BitPayKeys {
    const privateKey = BitPayKeyUtils.generatePrivateKey()
    const publicKey = BitPayKeyUtils.getPublicKeyFromPrivateKey(privateKey)
    const sin = BitPayKeyUtils.getSinFromPublicKey(publicKey)

    return {
      privateKey,
      publicKey,
      sin,
    }
  }

  /**
   * Request a new token from BitPay
   */
  async requestToken(
    facade: BitPayFacade = 'merchant',
    label: string = 'Next.js App'
  ): Promise<BitPayTokenResponse> {
    if (!this.privateKey || !this.publicKey) {
      throw new Error('Private and public keys must be set')
    }
    const url = `${this.baseUrl}/tokens`

    const body = JSON.stringify({
      id: this.sin,
      label: label,
      facade: facade,
    })

    if (!this.publicKey || !this.privateKey) {
      throw new Error('Public and private keys must be set')
    }

    const headers = {
      'x-accept-version': '2.0.0',
      'Content-Type': 'application/json',
      'x-identity': BitPayKeyUtils.generateXIdentity(this.publicKey),
      'x-signature': BitPayKeyUtils.generateXSignature(
        this.privateKey,
        url,
        body
      ),
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
    })

    if (!response.ok) {
      throw new Error(
        `BitPay API error: ${response.status} ${response.statusText}`
      )
    }

    const data = await response.json()
    return data
  }

  /**
   * Create an invoice
   */
  async createInvoice(
    invoiceData: BitPayInvoiceData
  ): Promise<BitPayInvoiceResponse> {
    if (!this.merchantToken) {
      throw new Error('Merchant token is required')
    }

    // Validate private key format first
    if (!this.privateKey || this.privateKey.length < 30) {
      console.error(
        'Invalid private key format:',
        this.privateKey?.substring(0, 10) + '...'
      )
      throw new Error('Failed to read private key - Invalid format')
    }

    const url = `${this.baseUrl}/invoices`
    const body = JSON.stringify({
      ...invoiceData,
      token: this.merchantToken,
    })

    console.log('BitPay createInvoice body:', body)

    if (!this.publicKey || !this.privateKey) {
      throw new Error('Public and private keys must be set')
    }

    // Use our custom BitPayKeyUtils instead of direct SDK call
    // This handles the proper conversion of the private key format
    // const xsig = BitPayKeyUtils.generateXSignature(this.privateKey, url, body)
    // const xsig = new KeyUtils().sign(this.privateKey, url + body)

    const headers = {
      'x-accept-version': '2.0.0',
      'Content-Type': 'application/json',
      accept: 'application/json',
      // 'x-identity': BitPayKeyUtils.generateXIdentity(this.publicKey),
      // 'x-signature': xsig,
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
    })

    if (!response.ok) {
      throw new Error(
        `BitPay API error: ${response.status} ${response.statusText}`
      )
    }

    return await response.json()
  }
}
