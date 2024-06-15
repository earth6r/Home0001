/* eslint-disable no-console */
import { enableCors } from '@lib/next/cors'
import { Stripe } from 'stripe'
import type { NextApiRequest, NextApiResponse } from 'next'

const stripe = new Stripe(process.env.STRIPE_API_KEY as string, {
  apiVersion: '2024-04-10',
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { propertyType } = req.body

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: 'usd',
      amount: 1000,
      automatic_payment_methods: { enabled: true },
      description: 'Deposit charge from HOME0001',
      statement_descriptor: 'Charge from HOME0001',
      metadata: { propertyType: propertyType },
    })
    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      metadata: paymentIntent.metadata,
    })
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      status: err,
    })
  }
}

export default enableCors(handler)
