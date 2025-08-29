# OpenNode Setup Guide - 5 Minutes to Accept Bitcoin!

OpenNode makes it incredibly easy to accept Bitcoin and Lightning payments. Here's how to get started in just 5 minutes.

## Step 1: Create OpenNode Account (2 mins)

1. Go to https://www.opennode.com
2. Click "Get Started" or "Sign Up"
3. Fill in your email and create a password
4. Verify your email address

## Step 2: Get Your API Key (1 min)

1. Log into your OpenNode dashboard
2. Navigate to **Developer** → **API Keys**
3. Click **"Create API Key"**
4. Give it a name like "Gramstr Donations"
5. Select permissions:
   - ✅ Charges (Create & Read)
   - ✅ Withdrawals (optional, for auto-withdrawing to your wallet)
6. Copy the API key (you won't see it again!)

## Step 3: Configure Your Environment (1 min)

1. In your project, copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Add your OpenNode API key:
```env
OPENNODE_API_KEY=your-api-key-here
```

That's it! You're ready to accept donations! 🎉

## Step 4: Set Up Webhooks (Optional, 1 min)

For real-time donation notifications:

1. In OpenNode Dashboard, go to **Developer** → **Webhooks**
2. Click **"Add Webhook"**
3. Enter your webhook URL:
   - Local testing: Use ngrok or similar
   - Production: `https://gramstr.com/api/opennode/webhook`
4. Select events:
   - ✅ charge.succeeded
   - ✅ charge.pending
5. Copy the webhook secret and add to `.env.local`:
```env
OPENNODE_WEBHOOK_SECRET=your-webhook-secret
```

## Testing Your Integration

### Local Development:
```bash
npm run dev
```
Visit http://localhost:3000 and try a donation!

### Test Mode:
OpenNode provides testnet support for testing without real Bitcoin:
1. In Dashboard → Settings → Enable Testnet Mode
2. Use testnet Bitcoin for testing

## How It Works

1. **User clicks donation amount** → Creates a charge via OpenNode API
2. **OpenNode provides payment page** → User pays with Lightning or on-chain
3. **Payment confirmed** → Webhook notifies your server
4. **Stats update** → Dashboard shows new donation

## Fees

- **Lightning**: 1% fee (capped at 10,000 sats)
- **On-chain**: 1% fee (no cap)
- **No monthly fees** or setup costs!

## Withdrawing Funds

### Manual Withdrawal:
1. Go to OpenNode Dashboard → Wallet
2. Click "Withdraw"
3. Enter your Bitcoin address or Lightning invoice
4. Confirm withdrawal

### Auto-Withdrawal:
1. Dashboard → Settings → Auto-Withdrawal
2. Set your Bitcoin address
3. Choose threshold amount
4. Funds auto-withdraw when threshold reached

## Benefits Over BTCPay Server

| Feature | OpenNode | BTCPay Server |
|---------|----------|---------------|
| Setup Time | 5 minutes | 1-2 hours |
| Server Required | No | Yes |
| Maintenance | None | Regular updates |
| Lightning Support | Built-in | Requires node setup |
| API | Simple REST | Complex |
| Cost | 1% fee | Server costs |

## Support

- OpenNode Docs: https://developers.opennode.com
- Support: support@opennode.com
- Status: https://status.opennode.com

## Next Steps

1. ✅ Test with a small donation
2. ✅ Share your donation page
3. ✅ Monitor donations in OpenNode dashboard
4. ✅ Withdraw to your cold storage regularly

You're all set! Start stacking sats toward your wholecoiner goal! 🚀₿