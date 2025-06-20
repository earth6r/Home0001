/* eslint-disable no-console */
import { enableCors } from '@lib/next/cors'
import { Stripe } from 'stripe'
import type { NextApiRequest, NextApiResponse } from 'next'
import { saveError } from '@lib/util/save-error'

const stripe = new Stripe(process.env.STRIPE_API_KEY as string, {
  apiVersion: '2024-04-10',
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, propertyType, amount, product_id } = req.body

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: 'usd',
      amount: amount || 10000,
      automatic_payment_methods: { enabled: true },
      description: 'HOME0001 Application Fee',
      statement_descriptor: 'HOME0001 Application Fee',
      metadata: {
        propertyType: propertyType,
        email: email,
        product_id: product_id,
      },
    })
    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      metadata: paymentIntent.metadata,
    })
  } catch (err) {
    console.error(err)
    saveError(
      {
        error: err,
        additionalInfo: {
          email,
          propertyType,
        },
      },
      'createStripePayment'
    )
    return res.status(400).json({
      status: err,
    })
  }
}

export default enableCors(handler)
