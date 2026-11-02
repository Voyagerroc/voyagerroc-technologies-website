import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('C:/Users/erol_/OneDrive/Belgeler/Default Project/payradar/node_modules/@playwright/test');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');
const brandDir = path.join(distDir, 'assets/brand');
const linkedinDir = path.join(root, 'brand/linkedin');

fs.mkdirSync(brandDir, { recursive: true });
fs.mkdirSync(linkedinDir, { recursive: true });

async function main() {
  const browser = await chromium.launch({ headless: true });

  // 1. Read the Phoenix Anka favicon SVG
  const svgFavicon = fs.readFileSync(path.join(distDir, 'assets/favicon.svg'), 'utf8');

  const icons = [
    { name: 'favicon-48x48.png', size: 48, dir: brandDir },
    { name: 'favicon.png', size: 48, dir: distDir },
    { name: 'favicon-96x96.png', size: 96, dir: brandDir },
    { name: 'apple-touch-icon.png', size: 180, dir: brandDir },
    { name: 'apple-touch-icon.png', size: 180, dir: distDir },
    { name: 'favicon-192x192.png', size: 192, dir: brandDir },
    { name: 'voyagerroc-technologies-logo-512.png', size: 512, dir: brandDir },
    { name: 'linkedin-company-logo-400x400.png', size: 400, dir: linkedinDir },
    { name: 'voyagerroc-technologies-logo.png', size: 512, dir: path.join(root, 'brand') }
  ];

  for (const icon of icons) {
    const page = await browser.newPage({ viewport: { width: icon.size, height: icon.size } });
    await page.setContent(`<!doctype html><html><body style="margin:0;padding:0;overflow:hidden;background:transparent;">${svgFavicon}</body></html>`);
    const buf = await page.screenshot({ omitBackground: true });
    fs.mkdirSync(icon.dir, { recursive: true });
    fs.writeFileSync(path.join(icon.dir, icon.name), buf);
    await page.close();
    console.log(`Generated: ${path.join(icon.dir, icon.name)} (${icon.size}x${icon.size})`);
  }

  // 2. Generate White & Crimson Social Card (1200x630)
  const socialCardHtml = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1200px;
    height: 630px;
    background: #FFFFFF;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    color: #1F0A0E;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 60px 80px;
  }
  .bg-glow {
    position: absolute;
    width: 900px;
    height: 700px;
    right: -150px;
    top: -100px;
    background: radial-gradient(circle at 60% 40%, rgba(254, 236, 239, 0.95), rgba(255, 245, 246, 0.6) 50%, rgba(255, 255, 255, 0) 75%);
    pointer-events: none;
    z-index: 0;
  }
  .bg-lines {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(to right, rgba(240, 213, 216, 0.4) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(240, 213, 216, 0.4) 1px, transparent 1px);
    background-size: 80px 80px;
    pointer-events: none;
    z-index: 1;
    mask-image: radial-gradient(ellipse 90% 80% at 75% 45%, black 40%, transparent 80%);
    -webkit-mask-image: radial-gradient(ellipse 90% 80% at 75% 45%, black 40%, transparent 80%);
  }
  .content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
  }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 7px 16px;
    background: #FFF0F2;
    border: 1px solid #F0D5D8;
    border-radius: 999px;
    font-size: 13.5px;
    font-weight: 750;
    color: #C82A3A;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .badge-dot {
    width: 8px;
    height: 8px;
    background: #C82A3A;
    border-radius: 50%;
  }
  .middle {
    margin-top: 10px;
    max-width: 720px;
  }
  .brand-title {
    font-size: 58px;
    font-weight: 850;
    letter-spacing: -0.025em;
    line-height: 1.06;
    color: #1F0A0E;
  }
  .brand-title span {
    color: #C82A3A;
  }
  .subtitle {
    margin-top: 16px;
    font-size: 23px;
    font-weight: 500;
    color: #784D55;
    line-height: 1.4;
  }
  .products {
    margin-top: 24px;
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
  .product-pill {
    padding: 8px 18px;
    background: #FFFFFF;
    border: 1.5px solid #F0D5D8;
    border-radius: 12px;
    font-size: 15.5px;
    font-weight: 650;
    color: #2D0C13;
    box-shadow: 0 2px 8px rgba(165, 45, 58, 0.04);
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1.5px solid #F0D5D8;
    padding-top: 20px;
  }
  .footer-left {
    font-size: 15.5px;
    color: #784D55;
    font-weight: 500;
  }
  .footer-left strong {
    color: #1F0A0E;
    font-weight: 700;
  }
  .footer-domain {
    font-size: 18px;
    font-weight: 750;
    color: #C82A3A;
    letter-spacing: 0.04em;
  }
  .phoenix-visual {
    position: absolute;
    right: 60px;
    top: 50%;
    transform: translateY(-50%);
    width: 350px;
    height: 350px;
    z-index: 2;
    filter: drop-shadow(0 20px 40px rgba(200, 42, 58, 0.12));
  }
</style>
</head>
<body>
  <div class="bg-glow"></div>
  <div class="bg-lines"></div>
  <div class="content">
    <div>
      <div class="badge"><span class="badge-dot"></span>WEB · MOBİL · SAAS · Si ÜRÜN MÜHENDİSLİĞİ</div>
    </div>
    <div class="middle">
      <h1 class="brand-title">Voyagerroc <span>Technologies</span></h1>
      <p class="subtitle">Bağımsız yazılım markası. Web ve mobil uygulamalar, SaaS ürün çalışmaları ve Si destekli iş akışları.</p>
      <div class="products">
        <div class="product-pill">PayRadar — Phoenix Ödeme Takibi</div>
        <div class="product-pill">Evidence Intelligence Platform (EİP)</div>
        <div class="product-pill">LaserDeck PTT</div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-left">Kurucu ve Yönetici: <strong>Erol Taşcı</strong> · Bağımsız Yazılım Markası</div>
      <div class="footer-domain">voyagerroctechnologies.com</div>
    </div>
  </div>
  <div class="phoenix-visual">
    ${svgFavicon}
  </div>
</body>
</html>`;

  const cardPage = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await cardPage.setContent(socialCardHtml);
  const cardBuf = await cardPage.screenshot();
  fs.writeFileSync(path.join(distDir, 'assets/social-card.png'), cardBuf);
  console.log('Generated: dist/assets/social-card.png (1200x630)');

  await browser.close();

  // 3. Compile multi-resolution favicon.ico using Python Pillow
  const pyCode = "from PIL import Image; img = Image.open(r'" + path.join(brandDir, 'voyagerroc-technologies-logo-512.png').replace(/\\/g, '/') + "'); img.save(r'" + path.join(distDir, 'favicon.ico').replace(/\\/g, '/') + "', format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])";
  execSync(`python -c "${pyCode}"`);
  console.log('Generated: dist/favicon.ico (16x16, 32x32, 48x48 multi-res ICO)');
}

main().catch(console.error);
