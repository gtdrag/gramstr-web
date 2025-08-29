# BTCPay Server Setup Guide for Gramstr Donations

This guide will help you set up BTCPay Server to accept Bitcoin and Lightning donations for becoming a wholecoiner.

## Prerequisites

1. A BTCPay Server instance (self-hosted or third-party hosted)
2. A Bitcoin wallet (on-chain)
3. A Lightning node (for Lightning payments)

## Step 1: Set Up BTCPay Server

### Option A: Use a Hosted BTCPay Instance
- **BTCPay Jungle** (Free): https://btcpayjungle.com
- **LunaNode**: https://www.lunanode.com/btcpay
- Sign up and create your account

### Option B: Self-Host BTCPay Server
- Follow the official deployment guide: https://docs.btcpayserver.org/Deployment/
- Recommended: Use the Docker deployment on a VPS

## Step 2: Create Your Store

1. Log into your BTCPay Server instance
2. Click "Create a new store"
3. Name it "Gramstr Donations" or similar
4. Select your preferred default currency (BTC recommended)
5. Save the store

## Step 3: Configure Wallets

### Bitcoin On-Chain Wallet
1. Go to Store Settings > Wallets > Bitcoin
2. Choose wallet setup method:
   - **Hot Wallet** (easier): Generate a new wallet in BTCPay
   - **Watch-Only** (more secure): Import an xpub from your hardware wallet
3. Save wallet configuration

### Lightning Wallet
1. Go to Store Settings > Wallets > Lightning
2. Connect your Lightning node:
   - **LND**: Provide connection details
   - **Core Lightning**: Provide connection details
   - **Internal Node**: Use BTCPay's built-in Lightning node
3. Test the connection
4. Save configuration

## Step 4: Create Donation App

1. Go to Apps > Create a new app
2. Select "Point of Sale" app type
3. Configure:
   - **App Name**: "Gramstr Wholecoiner Fund"
   - **Title**: "Help Me Become a Wholecoiner"
   - **Currency**: BTC (Bitcoin)
   - **Default View**: "Amount"
   - **Enable tips**: Yes
4. Add preset amounts:
   - 1,000 sats - Coffee ☕
   - 5,000 sats - Pizza Slice 🍕
   - 10,000 sats - Burger 🍔
   - 21,000 sats - Satoshi Special ⚡
   - 50,000 sats - Power User 💪
   - 100,000 sats - Champion 🏆
   - 210,000 sats - King 👑
   - 1,000,000 sats - Whale 🐋
5. Save the app
6. Note the App ID from the URL

## Step 5: Generate API Key

1. Go to Account > API Keys
2. Click "Generate Key"
3. Set permissions:
   - ✅ View invoices for your stores
   - ✅ View your stores
   - ✅ View app data
4. Optional permissions for advanced features:
   - Create invoices for your stores
   - Modify invoices for your stores
5. Generate and save the API key securely

## Step 6: Set Up Webhooks

1. Go to Store Settings > Webhooks
2. Click "Create Webhook"
3. Configure:
   - **Payload URL**: `https://gramstr.com/api/btcpay-webhook`
   - **Secret**: Generate a strong secret and save it
   - **Events to subscribe**:
     - ✅ Invoice Settled
     - ✅ Invoice Processing
     - ✅ Invoice Complete
     - ✅ Invoice Expired
4. Save the webhook

## Step 7: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Fill in your BTCPay details:
```env
# Your BTCPay Server URL
NEXT_PUBLIC_BTCPAY_SERVER_URL=https://your-btcpay-instance.com

# Store ID (from Store Settings > General)
NEXT_PUBLIC_BTCPAY_STORE_ID=YOUR_STORE_ID

# API Key (from Step 5)
BTCPAY_API_KEY=YOUR_API_KEY

# Donation App ID (from Step 4)
NEXT_PUBLIC_BTCPAY_DONATION_APP_ID=YOUR_APP_ID

# Webhook Secret (from Step 6)
BTCPAY_WEBHOOK_SECRET=YOUR_WEBHOOK_SECRET
```

## Step 8: Test the Integration

1. Start the development server:
```bash
npm run dev
```

2. Visit http://localhost:3000
3. Check that donation stats load (will show mock data if BTCPay not configured)
4. Click a donation preset amount
5. Verify BTCPay checkout page opens
6. Make a test donation (use testnet if available)
7. Check webhook logs in BTCPay Server

## Step 9: Deploy to Production

1. Set environment variables on your hosting platform (Vercel, Netlify, etc.)
2. Deploy the application
3. Update webhook URL in BTCPay to production domain
4. Test with a small real donation

## Monitoring Donations

### View Donation Stats
- The API endpoint `/api/donation-stats` provides real-time statistics
- Stats are cached for 1 minute to reduce API calls
- Includes total raised, donation count, recent donations, and top donors

### Webhook Notifications
- The `/api/btcpay-webhook` endpoint receives real-time payment notifications
- Logs are available in your hosting platform's dashboard
- Consider adding Discord/Telegram notifications for new donations

## Troubleshooting

### API Connection Issues
- Verify API key has correct permissions
- Check BTCPay Server URL is correct (no trailing slash)
- Ensure Store ID matches your actual store

### Webhook Not Triggering
- Check webhook secret matches in both BTCPay and environment variables
- Verify webhook URL is publicly accessible
- Check BTCPay webhook delivery logs for errors

### Lightning Payments Not Working
- Ensure Lightning node is properly connected
- Check node has inbound liquidity
- Verify Lightning is enabled for the store

## Security Best Practices

1. **Use HTTPS** for all connections
2. **Secure API Keys**: Never commit them to git
3. **Verify Webhooks**: Always validate webhook signatures
4. **Regular Backups**: Backup your BTCPay database and wallets
5. **Monitor Logs**: Check for suspicious activity regularly

## Support

- BTCPay Documentation: https://docs.btcpayserver.org
- BTCPay Community: https://chat.btcpayserver.org
- Gramstr Support: Open an issue on GitHub

## Next Steps

1. ✅ Promote your donation page on social media
2. ✅ Add donation link to your Nostr profile
3. ✅ Create content about your wholecoiner journey
4. ✅ Thank donors publicly (with permission)
5. ✅ Share progress updates regularly

Good luck on your journey to becoming a wholecoiner! 🚀₿