# Quick Start Guide - Get Live in 15 Minutes! 🚀

## Your Next Steps (in order):

### 1️⃣ Sign Up for OpenNode (3 mins)
1. Go to https://www.opennode.com
2. Sign up with your email
3. Verify your email
4. In Dashboard → Developer → API Keys
5. Create a new API key with "Charges" permission
6. Copy the key (save it somewhere safe!)

### 2️⃣ Deploy to Vercel (5 mins)
```bash
# Make sure you're in the right directory
cd /Users/georgedrag/APP_PROJECTS/gramstr-website

# Install Vercel CLI if you haven't
npm i -g vercel

# Deploy!
vercel
```

When prompted:
- Set up and deploy? **Y**
- Which scope? **Select your account**
- Link to existing project? **N**
- Project name? **gramstr-website** (or keep default)
- Directory? **./** (current directory)
- Override settings? **N**

### 3️⃣ Add Environment Variables in Vercel (2 mins)
After deployment:
1. Go to https://vercel.com/dashboard
2. Click on your project
3. Go to Settings → Environment Variables
4. Add:
   - `OPENNODE_API_KEY` = your-api-key-from-step-1

### 4️⃣ Configure Your Domain (3 mins)
In Vercel:
1. Settings → Domains
2. Add `gramstr.com`
3. Vercel will show you DNS records

In your domain registrar:
- Add the A/CNAME records Vercel provides
- DNS takes 5-48 hours to propagate

### 5️⃣ Test Everything (2 mins)
1. Visit your Vercel URL (e.g., `gramstr-website.vercel.app`)
2. Scroll to donation section
3. Click "1k sats" to test
4. You'll see OpenNode checkout page
5. Success! 🎉

## While DNS Propagates:

### Quick Wins:
- Share your Vercel preview URL on Nostr
- Post "Donations now live!" with the link
- Test with a small 1000 sat donation
- Screenshot the donation page for social media

### Monitor Donations:
- OpenNode Dashboard: https://app.opennode.com
- See all charges, withdrawals, and stats
- Set up auto-withdrawal to your cold wallet

## Common Issues:

**"Failed to create donation"**
- Check your API key is correct in Vercel env vars
- Make sure the key has "Charges" permission

**Site not loading**
- Vercel deployment might still be building
- Check https://vercel.com/dashboard for status

**Domain not working**
- DNS takes time (5-48 hours)
- Use Vercel preview URL in meantime

## Success Checklist:
- [ ] OpenNode account created
- [ ] API key obtained
- [ ] Site deployed to Vercel
- [ ] Environment variable added
- [ ] Test donation works
- [ ] Domain DNS configured
- [ ] Shared on social media

## Need Help?
- OpenNode Support: support@opennode.com
- Vercel Docs: https://vercel.com/docs
- Your local dev still running at: http://localhost:3000

---

You're about to start accepting Bitcoin donations! LFG! 🚀₿