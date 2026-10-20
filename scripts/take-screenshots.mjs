import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const outDir = path.resolve('screenshots');
fs.mkdirSync(outDir, { recursive: true });

const viewports = [
  { name: 'desktop-1440x1200', width: 1440, height: 1200 },
  { name: 'tablet-1024x768', width: 1024, height: 768 },
  { name: 'mobile-390x844', width: 390, height: 844 },
];

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  for (const vp of viewports) {
    console.log(`Capturing ${vp.name} (${vp.width}x${vp.height})...`);
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 2 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    
    // Wait for animations
    await new Promise((r) => setTimeout(r, 1200));

    // Viewport screenshot
    const vpPath = path.join(outDir, `${vp.name}.png`);
    await page.screenshot({ path: vpPath, fullPage: false });

    // Fullpage screenshot
    const fpPath = path.join(outDir, `${vp.name}-fullpage.png`);
    await page.screenshot({ path: fpPath, fullPage: true });

    console.log(`Saved ${vp.name} snapshots`);
  }

  // --- Modal & Interaction Tests ---
  console.log('Testing ReadingDialog...');
  await page.setViewport({ width: 1440, height: 1200, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/?contenido=lectura', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, 'interaction-reading-dialog.png') });
  console.log('Saved interaction-reading-dialog.png');

  console.log('Testing FilmDialog...');
  await page.goto('http://localhost:3000/?contenido=cine', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, 'interaction-film-dialog.png') });
  console.log('Saved interaction-film-dialog.png');

  console.log('Testing Audio playback toggle...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 800));
  const musicaCard = await page.waitForSelector('#musica');
  if (musicaCard) {
    await musicaCard.click();
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({ path: path.join(outDir, 'interaction-audio-playing.png') });
    console.log('Saved interaction-audio-playing.png');
  }

  await browser.close();
  console.log('All QA tests and screenshots completed successfully!');
}

capture().catch((err) => {
  console.error('Error during capture:', err);
  process.exit(1);
});
