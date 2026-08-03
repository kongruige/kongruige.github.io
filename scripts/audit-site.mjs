import { chromium } from 'playwright-core';
import axe from 'axe-core';

const baseUrl = process.env.SITE_URL || 'http://127.0.0.1:4321';
const executablePath = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const routes = ['/', '/research/', '/publications/', '/experience/', '/about/'];
const viewports = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'desktop', width: 1440, height: 1000 }
];

const browser = await chromium.launch({ headless: true, executablePath });
let failed = false;

for (const viewport of viewports) {
  const page = await browser.newPage({ viewport });
  const consoleErrors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });

  for (const route of routes) {
    const response = await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' });
    for (const image of await page.locator('img').all()) {
      await image.scrollIntoViewIfNeeded();
    }
    await page.waitForFunction(
      () => [...document.images].every((image) => image.complete && image.naturalWidth > 0),
      undefined,
      { timeout: 15000 }
    ).catch(() => {});
    await page.evaluate(() => window.scrollTo(0, 0));
    const metrics = await page.evaluate(() => {
      const documentWidth = document.documentElement.scrollWidth;
      const containedByScroller = (element) => {
        let parent = element.parentElement;
        while (parent && parent !== document.body) {
          const overflowX = getComputedStyle(parent).overflowX;
          if (['auto', 'scroll', 'hidden', 'clip'].includes(overflowX)) return true;
          parent = parent.parentElement;
        }
        return false;
      };
      const offenders = [...document.querySelectorAll('body *')]
        .map((element) => {
          const rect = element.getBoundingClientRect();
          return { tag: element.tagName, className: element.className || '', left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width) };
        })
        .filter(({ left, right }, index) => {
          const element = document.querySelectorAll('body *')[index];
          return (left < -1 || right > window.innerWidth + 1) && !containedByScroller(element);
        })
        .sort((a, b) => b.right - a.right)
        .slice(0, 5);
      return { innerWidth: window.innerWidth, documentWidth, title: document.title, offenders };
    });

    const imagesLoaded = await page.locator('img').evaluateAll((images) => images.every((image) => image.complete && image.naturalWidth > 0));
    await page.addScriptTag({ content: axe.source });
    const accessibility = await page.evaluate(async () => window.axe.run(document, {
      resultTypes: ['violations'],
      rules: { region: { enabled: false } }
    }));
    const seriousViolations = accessibility.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact));
    const ok = response?.ok() && metrics.documentWidth <= metrics.innerWidth + 1 && imagesLoaded && consoleErrors.length === 0 && seriousViolations.length === 0;
    if (!ok) failed = true;
    console.log(`${ok ? 'PASS' : 'FAIL'} ${viewport.name.padEnd(7)} ${route} status=${response?.status()} width=${metrics.documentWidth}/${metrics.innerWidth} images=${imagesLoaded}`);
    if (metrics.offenders.length) console.log('  overflow:', metrics.offenders);
    if (consoleErrors.length) console.log('  console:', consoleErrors);
    if (seriousViolations.length) console.log('  accessibility:', seriousViolations.map(({ id, impact, help }) => ({ id, impact, help })));
  }

  if (viewport.name === 'mobile') {
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    const menuButton = page.locator('[data-menu-button]');
    await menuButton.click();
    const expanded = await menuButton.getAttribute('aria-expanded');
    const navVisible = await page.locator('[data-nav]').isVisible();
    const menuOk = expanded === 'true' && navVisible;
    if (!menuOk) failed = true;
    console.log(`${menuOk ? 'PASS' : 'FAIL'} mobile navigation opens and reports expanded state`);
  }

  await page.close();
}

const page = await browser.newPage();
await page.goto(baseUrl, { waitUntil: 'networkidle' });
const internalHrefs = await page.locator('a[href^="/"]').evaluateAll((links) => [...new Set(links.map((link) => link.getAttribute('href')).filter(Boolean))]);
for (const href of internalHrefs) {
  const response = await page.request.get(new URL(href, baseUrl).toString());
  const ok = response.ok();
  if (!ok) failed = true;
  console.log(`${ok ? 'PASS' : 'FAIL'} internal link ${href} status=${response.status()}`);
}

await browser.close();
if (failed) process.exit(1);
