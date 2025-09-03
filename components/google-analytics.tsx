'use client'

import Script from 'next/script'

export default function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  )
}

export function trackDownload(platform: string, format: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'download', {
      event_category: 'engagement',
      event_label: `${platform}_${format}`,
      value: 1
    })
  }
}

export function trackGitHubClick() {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'click', {
      event_category: 'outbound',
      event_label: 'github',
      value: 1
    })
  }
}

export function trackDonation(method: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'donation_click', {
      event_category: 'engagement',
      event_label: method,
      value: 1
    })
  }
}