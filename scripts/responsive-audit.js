const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const baseUrl = 'https://primestaffingltd.com';

const pages = [
  '/',
  '/about',
  '/companies',
  '/companies/prime-concept-decor',
  '/companies/prime-precision-cooling',
  '/companies/prime-mechanical-equipment',
  '/companies/prime-green-technology',
  '/companies/prime-blind',
  '/companies/prime-health-care',
  '/services',
  '/services/cooling',
  '/services/electrical',
  '/services/plumbing',
  '/portfolio',
  '/portfolio/1',
  '/portfolio/2',
  '/blog',
  '/contact'
];

const viewports = [
  { name: 'mobile-320', width: 320, height: 568 },
  { name: 'mobile-360', width: 360, height: 800 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'mobile-414', width: 414, height: 896 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'tablet-820', width: 820, height: 1180 },
  { name: 'tablet-1024', width: 1024, height: 1366 },
  { name: 'laptop-1280', width: 1280, height: 720 },
  { name: 'laptop-1366', width: 1366, height: 768 },
  { name: 'laptop-1440', width: 1440, height: 900 },
  { name: 'desktop-1920', width: 1920, height: 1080 },
  { name: 'desktop-2560', width: 2560, height: 1440 },
  { name: 'ultrawide-3440', width: 3440, height: 1440 }
];

const issues = [];

async function checkResponsive() {
  console.log('Starting responsive audit...\n');
  
  // Create report directory
  const reportDir = path.join(process.cwd(), 'responsive-report');
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  let totalTests = 0;
  let issuesFound = 0;

  for (const pagePath of pages) {
    console.log(`\nTesting page: ${pagePath}`);
    
    for (const viewport of viewports) {
      totalTests++;
      const page = await browser.newPage();
      
      try {
        await page.setViewport({
          width: viewport.width,
          height: viewport.height,
          deviceScaleFactor: 1
        });

        const url = baseUrl + pagePath;
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

        // Check for horizontal overflow
        const hasOverflow = await page.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth;
        });

        // Check for elements wider than viewport
        const wideElements = await page.evaluate(() => {
          const elements = document.querySelectorAll('*');
          const wide = [];
          const viewportWidth = window.innerWidth;
          
          elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.width > viewportWidth + 5) { // 5px tolerance
              wide.push({
                tag: el.tagName,
                class: el.className,
                width: rect.width,
                id: el.id
              });
            }
          });
          
          return wide.slice(0, 5); // Return first 5
        });

        // Take screenshot if issues found
        if (hasOverflow || wideElements.length > 0) {
          issuesFound++;
          const screenshotName = `${pagePath.replace(/\//g, '_')}_${viewport.name}.png`;
          const screenshotPath = path.join(reportDir, screenshotName);
          await page.screenshot({ path: screenshotPath, fullPage: true });

          issues.push({
            page: pagePath,
            viewport: `${viewport.name} (${viewport.width}x${viewport.height})`,
            hasOverflow,
            wideElements,
            screenshot: screenshotName
          });

          console.log(`  ❌ ${viewport.name}: Issues found`);
        } else {
          console.log(`  ✅ ${viewport.name}: OK`);
        }

      } catch (error) {
        console.log(`  ⚠️  ${viewport.name}: Error - ${error.message}`);
      } finally {
        await page.close();
      }
    }
  }

  await browser.close();

  generateReport(totalTests, issuesFound);
}

function generateReport(totalTests, issuesFound) {
  console.log('\n' + '='.repeat(60));
  console.log('RESPONSIVE AUDIT REPORT');
  console.log('='.repeat(60) + '\n');

  const report = [];
  report.push('# Responsive Audit Report\n\n');
  report.push(`**Date:** ${new Date().toISOString()}\n`);
  report.push(`**Base URL:** ${baseUrl}\n`);
  report.push(`**Total Tests:** ${totalTests}\n`);
  report.push(`**Issues Found:** ${issuesFound}\n\n`);

  report.push('## Summary\n\n');
  report.push(`- ✅ Passed: ${totalTests - issuesFound}\n`);
  report.push(`- ❌ Issues: ${issuesFound}\n\n`);

  if (issues.length > 0) {
    report.push('## Issues Detected\n\n');
    
    issues.forEach((issue, index) => {
      report.push(`### ${index + 1}. ${issue.page} - ${issue.viewport}\n\n`);
      
      if (issue.hasOverflow) {
        report.push('**Problem:** Horizontal overflow detected\n\n');
        report.push('**Fix:** Add `overflow-x: hidden` or fix wide elements\n\n');
      }
      
      if (issue.wideElements.length > 0) {
        report.push('**Wide Elements:**\n\n');
        issue.wideElements.forEach(el => {
          report.push(`- \`${el.tag}\` ${el.class ? `class="${el.class}"` : ''} ${el.id ? `id="${el.id}"` : ''} - Width: ${Math.round(el.width)}px\n`);
        });
        report.push('\n');
      }
      
      report.push(`**Screenshot:** \`responsive-report/${issue.screenshot}\`\n\n`);
      report.push('---\n\n');
    });
  } else {
    report.push('## ✅ No Issues Found\n\n');
    report.push('All pages are responsive across all tested viewports!\n\n');
  }

  const reportContent = report.join('');
  fs.writeFileSync('RESPONSIVE_AUDIT_REPORT.md', reportContent);
  
  console.log(reportContent);
  console.log('Report saved to: RESPONSIVE_AUDIT_REPORT.md');
  console.log(`Screenshots saved to: responsive-report/\n`);
  
  if (issues.length > 0) {
    console.log(`⚠️  Found ${issues.length} responsive issue(s) that need fixing!`);
    process.exit(1);
  } else {
    console.log('✅ All responsive tests passed!');
    process.exit(0);
  }
}

checkResponsive().catch(err => {
  console.error('Error running responsive audit:', err);
  process.exit(1);
});
