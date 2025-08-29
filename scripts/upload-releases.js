#!/usr/bin/env node

/**
 * Upload Gramstr release files to Vercel Blob Storage
 * 
 * Usage:
 * 1. Set your BLOB_READ_WRITE_TOKEN in .env.local
 * 2. Run: node scripts/upload-releases.js
 */

const { put } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');

// Configure your token - get this from Vercel dashboard
const token = process.env.BLOB_READ_WRITE_TOKEN;

if (!token) {
  console.error('❌ BLOB_READ_WRITE_TOKEN not found in environment');
  console.log('\nTo get your token:');
  console.log('1. Go to https://vercel.com/dashboard');
  console.log('2. Select your project');
  console.log('3. Go to Storage tab');
  console.log('4. Create a Blob store (if you haven\'t)');
  console.log('5. Copy the BLOB_READ_WRITE_TOKEN');
  console.log('6. Add it to .env.local');
  process.exit(1);
}

async function uploadFile(filePath, filename) {
  try {
    console.log(`📤 Uploading ${filename}...`);
    
    const file = fs.readFileSync(filePath);
    const blob = await put(filename, file, {
      access: 'public',
      token,
    });
    
    console.log(`✅ Uploaded: ${blob.url}`);
    return blob.url;
  } catch (error) {
    console.error(`❌ Failed to upload ${filename}:`, error.message);
    return null;
  }
}

async function main() {
  const gramstrDir = '/Users/georgedrag/APP_PROJECTS/gramstr/dist';
  
  const files = [
    { path: path.join(gramstrDir, 'Gramstr-1.0.0-arm64.dmg'), name: 'Gramstr-1.0.0-arm64.dmg' },
    { path: path.join(gramstrDir, 'Gramstr-1.0.0-arm64-mac.zip'), name: 'Gramstr-1.0.0-arm64-mac.zip' },
  ];
  
  console.log('🚀 Starting upload to Vercel Blob Storage...\n');
  
  const urls = {};
  for (const file of files) {
    if (fs.existsSync(file.path)) {
      const url = await uploadFile(file.path, file.name);
      if (url) {
        urls[file.name] = url;
      }
    } else {
      console.log(`⚠️  File not found: ${file.path}`);
    }
  }
  
  if (Object.keys(urls).length > 0) {
    console.log('\n✨ Upload complete! Add these to your .env.local:\n');
    console.log(`DOWNLOAD_URL_MAC_DMG="${urls['Gramstr-1.0.0-arm64.dmg'] || ''}"`);
    console.log(`DOWNLOAD_URL_MAC_ZIP="${urls['Gramstr-1.0.0-arm64-mac.zip'] || ''}"`);
    
    console.log('\n📝 Or update app/api/download/route.ts with these URLs directly.');
  }
}

// Load env vars if running locally
if (fs.existsSync('.env.local')) {
  require('dotenv').config({ path: '.env.local' });
}

main().catch(console.error);