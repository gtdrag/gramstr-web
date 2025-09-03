# Google Analytics Setup Guide

## Overview
Google Analytics 4 (GA4) has been integrated into your Gramstr marketing site to track:
- Page visits
- Download button clicks (with platform and format)
- GitHub link clicks
- Donation method interactions

## Setup Instructions

### 1. Create a Google Analytics 4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Admin" (gear icon) in the bottom left
3. Click "Create" > "Property"
4. Enter your property name (e.g., "Gramstr Website")
5. Select your reporting time zone and currency
6. Click "Next" and fill in your business information
7. Click "Create"

### 2. Get Your Measurement ID

1. In your new property, go to Admin > Data Streams
2. Click "Add stream" > "Web"
3. Enter your website URL: `https://gramstr.com`
4. Enter a stream name: "Gramstr Website"
5. Click "Create stream"
6. Copy your Measurement ID (format: `G-XXXXXXXXXX`)

### 3. Configure Your Environment

1. Open `.env.local` in your project root
2. Replace `G-XXXXXXXXXX` with your actual Measurement ID:
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-YOUR_ACTUAL_ID
   ```

### 4. Deploy Your Changes

For Vercel deployment:
1. Add the environment variable in Vercel dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add `NEXT_PUBLIC_GA_MEASUREMENT_ID` with your GA4 ID

For other deployments, ensure the environment variable is set.

## Events Being Tracked

### Automatic Events (GA4 default)
- Page views
- Session duration
- Bounce rate
- User engagement

### Custom Events
1. **Download** - Fired when download button is clicked
   - Event category: `engagement`
   - Event label: `mac_dmg` (platform_format)

2. **GitHub Click** - Fired when GitHub button is clicked
   - Event category: `outbound`
   - Event label: `github`

3. **Donation Click** - Fired when donation methods are used
   - Event category: `engagement`
   - Event label: `lightning`, `bitcoin`, or `lightning_amount_[amount]`

## Viewing Your Analytics

### Real-time Data
1. Go to Reports > Realtime
2. You'll see active users and events as they happen

### Download Tracking
1. Go to Reports > Engagement > Events
2. Look for the "download" event
3. Click on it to see breakdown by platform/format

### Conversion Tracking
To track downloads as conversions:
1. Admin > Events > Mark as conversion
2. Toggle on "download" event

### Custom Reports
Create a download report:
1. Go to Explore > Free form
2. Add dimensions: Event name, Event parameter (event_label)
3. Add metrics: Event count, Users
4. Filter by event name = "download"

## Testing Your Setup

1. Open your website with `?gtag_debug=true` appended to URL
2. Open browser console
3. Perform actions (download, click GitHub, etc.)
4. You should see GA debug messages in console

## Privacy Considerations

- GA4 respects user privacy settings
- Consider adding a cookie consent banner if required by law
- GA4 uses cookieless pings when cookies are blocked
- No personally identifiable information is tracked

## Troubleshooting

If events aren't showing:
1. Check that the Measurement ID is correct
2. Wait 24-48 hours for data to appear (real-time should work immediately)
3. Check browser console for errors
4. Ensure ad blockers aren't blocking GA
5. Verify the environment variable is loaded (check Network tab for gtag.js request)

## Additional Features You Can Add

1. **Enhanced Ecommerce**: Track donation amounts as transactions
2. **User Properties**: Track user preferences or app version
3. **Custom Dimensions**: Add more context to events
4. **Audiences**: Create segments for remarketing
5. **Google Ads Integration**: If you plan to run ads

## Support

For GA4 help: https://support.google.com/analytics
For implementation issues: Check the browser console or GitHub issues