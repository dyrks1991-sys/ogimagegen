#!/usr/bin/env node
'use strict'

const playwright = require('/tmp/quickqr-qa/node_modules/playwright')
const path = require('path')
const fs = require('fs')

const PW_CHROMIUM = '/tmp/pw-browsers/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell'
const OUT_PATH = path.join(__dirname, '../public/og.png')

const html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width:1200px; height:630px; overflow:hidden;
    background:#111827;
    font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;
    display:flex; align-items:center; justify-content:center;
  }
  body::before {
    content:''; position:absolute; inset:0;
    background-image:
      linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),
      linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px);
    background-size:40px 40px;
  }
  .card { position:relative; z-index:1; display:flex; flex-direction:column; align-items:center; gap:24px; text-align:center; padding:60px; }
  .logo { width:76px; height:76px; background:white; border-radius:18px; display:flex; align-items:center; justify-content:center; font-size:24px; font-weight:900; color:#111827; letter-spacing:-1px; box-shadow:0 20px 40px rgba(0,0,0,0.4); }
  h1 { font-size:72px; font-weight:800; color:white; letter-spacing:-3px; line-height:1.05; }
  h1 span { color:#6b7280; }
  p { font-size:28px; color:#9ca3af; font-weight:400; }
  .tags { display:flex; gap:10px; margin-top:4px; }
  .tag { padding:7px 18px; border:1px solid #374151; border-radius:100px; color:#9ca3af; font-size:20px; font-weight:500; }
  .url { position:absolute; bottom:28px; right:36px; font-size:15px; color:#374151; font-weight:500; }
</style></head>
<body>
<div class="card">
  <div class="logo">OG</div>
  <h1>OG<span>ImageGen</span></h1>
  <p>Generate beautiful OG images in seconds.</p>
  <div class="tags">
    <span class="tag">3 Templates</span>
    <span class="tag">Custom Colors</span>
    <span class="tag">No upload</span>
    <span class="tag">100% free</span>
  </div>
</div>
<div class="url">ogimagegen.vercel.app</div>
</body></html>`

;(async () => {
  console.log('Generating OG image…')
  const browser = await playwright.chromium.launch({
    executablePath: PW_CHROMIUM,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()
  await page.setViewportSize({ width: 1200, height: 630 })
  await page.setContent(html, { waitUntil: 'load' })
  await page.waitForTimeout(200)
  await page.screenshot({ path: OUT_PATH, type: 'png', fullPage: false })
  await browser.close()
  const size = (fs.statSync(OUT_PATH).size / 1024).toFixed(1)
  console.log(`✓ ${OUT_PATH}  (${size} KB)`)
  process.exit(0)
})().catch((e) => { console.error('Error:', e.message); process.exit(1) })
