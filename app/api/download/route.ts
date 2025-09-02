import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const platform = searchParams.get('platform') || 'mac'
  const format = searchParams.get('format') || 'dmg'
  
  try {
    // Fetch latest release info from GitHub API
    const response = await fetch('https://api.github.com/repos/gtdrag/gramstr/releases/latest', {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'gramstr-website'
      }
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch release info')
    }
    
    const release = await response.json()
    
    // Find the appropriate asset
    let targetAsset
    if (platform === 'mac') {
      if (format === 'zip') {
        // Look for zip file
        targetAsset = release.assets.find((asset: any) => 
          asset.name.toLowerCase().includes('mac') && asset.name.toLowerCase().endsWith('.zip')
        )
      } else {
        // Look for DMG file (default)
        targetAsset = release.assets.find((asset: any) => 
          asset.name.toLowerCase().endsWith('.dmg')
        )
      }
    }
    
    if (targetAsset) {
      return NextResponse.redirect(targetAsset.browser_download_url)
    }
    
    // Fallback to hardcoded latest release URLs if no assets found
    const fallbackUrl = format === 'zip' 
      ? 'https://github.com/gtdrag/gramstr/releases/latest/download/Gramstr-1.1.0-arm64-mac.zip'
      : 'https://github.com/gtdrag/gramstr/releases/latest/download/Gramstr-1.1.0.dmg'
    
    return NextResponse.redirect(fallbackUrl)
    
  } catch (error) {
    console.error('Error fetching release:', error)
    
    // Fallback to hardcoded latest release URLs
    const fallbackUrl = format === 'zip' 
      ? 'https://github.com/gtdrag/gramstr/releases/latest/download/Gramstr-1.1.0-arm64-mac.zip'
      : 'https://github.com/gtdrag/gramstr/releases/latest/download/Gramstr-1.1.0.dmg'
    
    return NextResponse.redirect(fallbackUrl)
  }
}