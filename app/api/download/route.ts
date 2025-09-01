import { NextResponse } from 'next/server'

// Store download URLs here (update these with your actual hosting URLs)
// For now, using GitHub releases as fallback
const DOWNLOADS = {
  mac: {
    dmg: process.env.DOWNLOAD_URL_MAC_DMG || 'https://github.com/gtdrag/gramstr/releases/download/v1.1.0/Gramstr-1.1.0-arm64.dmg',
    zip: process.env.DOWNLOAD_URL_MAC_ZIP || 'https://github.com/gtdrag/gramstr/releases/download/v1.1.0/Gramstr-1.1.0-arm64-mac.zip',
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const platform = searchParams.get('platform') || 'mac'
  const format = searchParams.get('format') || 'dmg'
  
  // Get the appropriate download URL
  let downloadUrl = DOWNLOADS.mac.dmg // default
  
  if (platform === 'mac') {
    downloadUrl = format === 'zip' ? DOWNLOADS.mac.zip : DOWNLOADS.mac.dmg
  }
  
  // Redirect to the download URL
  return NextResponse.redirect(downloadUrl)
}