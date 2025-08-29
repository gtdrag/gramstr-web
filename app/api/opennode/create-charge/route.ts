import { NextRequest, NextResponse } from 'next/server'

const OPENNODE_API_KEY = process.env.OPENNODE_API_KEY || ''
const OPENNODE_API_URL = 'https://api.opennode.com/v1'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount_sats, description, callback_url, success_url } = body

    if (!amount_sats || amount_sats < 1000) {
      return NextResponse.json(
        { error: 'Minimum donation is 1000 sats' },
        { status: 400 }
      )
    }

    // Create charge with OpenNode
    const response = await fetch(`${OPENNODE_API_URL}/charges`, {
      method: 'POST',
      headers: {
        'Authorization': OPENNODE_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount_sats,
        currency: 'sats',
        description: description || `Gramstr Donation - ${amount_sats} sats`,
        callback_url,
        success_url,
        auto_settle: true,
        ttl: 30, // 30 minutes to pay
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('OpenNode API error:', error)
      throw new Error('Failed to create charge')
    }

    const data = await response.json()
    
    return NextResponse.json({
      id: data.data.id,
      hosted_checkout_url: data.data.hosted_checkout_url,
      lightning_invoice: data.data.lightning_invoice?.payreq,
      chain_invoice: data.data.chain_invoice?.address,
      amount: data.data.amount,
      expires_at: data.data.expires_at,
    })
  } catch (error) {
    console.error('Failed to create OpenNode charge:', error)
    return NextResponse.json(
      { error: 'Failed to create donation charge' },
      { status: 500 }
    )
  }
}