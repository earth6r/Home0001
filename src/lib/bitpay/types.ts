export interface BitPayKeys {
  privateKey: string
  publicKey: string
  sin: string
}

export interface BitPayTokenResponse {
  data: {
    token: string
    facade: string
    dateCreated: string
    pairingExpiration: string
    pairingCode: string
  }
}

export interface BitPayInvoiceData {
  price: number
  currency: string
  orderId: string
  notificationURL?: string
  redirectURL?: string
  buyer?: {
    name?: string
    email?: string
    phone?: string
  }
  itemDesc?: string
  itemCode?: string
  physical?: boolean
  fullNotifications?: boolean
  extendedNotifications?: boolean
  transactionSpeed?: 'high' | 'medium' | 'low'
}

export interface BitPayInvoiceResponse {
  data: {
    id: string
    url: string
    status: string
    price: number
    currency: string
    invoiceTime: string
    expirationTime: string
    currentTime: string
    guid: string
    token: string
    paymentUrls: {
      BIP21: string
      BIP72: string
      BIP72b: string
      BIP73: string
    }
    acceptanceWindow: number
    posData: string
    itemDesc: string
    itemCode: string
    orderId: string
    redirectURL: string
    notificationURL: string
    buyer: {
      name: string
      email: string
      phone: string
    }
  }
}

export interface BitPayWebhookData {
  id: string
  status: 'new' | 'paid' | 'confirmed' | 'complete' | 'expired' | 'invalid'
  price: number
  currency: string
  invoiceTime: string
  expirationTime: string
  currentTime: string
  orderId: string
  guid: string
  paymentUrls: {
    BIP21: string
    BIP72: string
    BIP72b: string
    BIP73: string
  }
}

export type BitPayEnvironment = 'test' | 'prod'
export type BitPayFacade = 'merchant' | 'payout'
