const https = require('https');
const http = require('http');
const { URL } = require('url');
const fs = require('fs');

const baseUrl = 'https://primestaffingltd.com';
const visited = new Set();
const broken = [];
const results = [];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const client = urlObj.protocol === 'https:' ? https : http;
    
    const options = {
      method: 'HEAD',
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    };

    const req = client.request(url, options, (res) => {
      resolve({
        url,
        status: res.statusCode,
        headers: res.headers
      });
    });

    req.on('error', (err) => {
      resolve({
        url,
        status: 0,
        error: err.message
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        url,
        status: 0,
        error: 'Timeout'
      });
    });

    req.end();
  });
}

async function checkLinks() {
  console.log('Starting link audit...\n');

  const urlsToCheck = [
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
    '/portfolio/3',
    '/portfolio/4',
    '/portfolio/5',
    '/portfolio/6',
    '/blog',
    '/contact',
    '/placeholders/prime-group.svg',
    '/placeholders/concept-decor.svg',
    '/placeholders/precision-cooling.svg',
    '/placeholders/mechanical-equipment.svg',
    '/placeholders/green-technology.svg',
    '/placeholders/prime-blind.svg',
    '/placeholders/health-care.svg',
    '/placeholders/portfolio-default.svg',
    '/placeholders/blog-default.svg',
    '/placeholders/contact-default.svg'
  ];

  for (const path of urlsToCheck) {
    const fullUrl = baseUrl + path;
    console.log(`Testing: ${fullUrl}`);
    
    const result = await fetchUrl(fullUrl);
    results.push(result);
    
    if (result.status === 404) {
      broken.push({
        url: fullUrl,
        path,
        status: 404,
        issue: 'Page not found'
      });
      console.log(`  ❌ 404 - ${path}`);
    } else if (result.status === 500) {
      broken.push({
        url: fullUrl,
        path,
        status: 500,
        issue: 'Server error'
      });
      console.log(`  ❌ 500 - ${path}`);
    } else if (result.status === 0) {
      broken.push({
        url: fullUrl,
        path,
        status: 0,
        issue: result.error || 'Connection failed'
      });
      console.log(`  ❌ ERROR - ${path}: ${result.error}`);
    } else if (result.status >= 200 && result.status < 400) {
      console.log(`  ✅ ${result.status} - ${path}`);
    } else {
      console.log(`  ⚠️  ${result.status} - ${path}`);
    }
    
    // Small delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  generateReport();
}

function generateReport() {
  console.log('\n' + '='.repeat(60));
  console.log('LINK AUDIT REPORT');
  console.log('='.repeat(60) + '\n');

  const report = [];
  report.push('# Link Audit Report\n');
  report.push(`**Date:** ${new Date().toISOString()}\n`);
  report.push(`**Base URL:** ${baseUrl}\n`);
  report.push(`**Total URLs Tested:** ${results.length}\n\n`);

  const successful = results.filter(r => r.status >= 200 && r.status < 400).length;
  const errors = results.filter(r => r.status === 404 || r.status === 500 || r.status === 0).length;

  report.push('## Summary\n\n');
  report.push(`- ✅ Successful: ${successful}\n`);
  report.push(`- ❌ Errors: ${errors}\n\n`);

  if (broken.length > 0) {
    report.push('## Broken Links\n\n');
    report.push('| URL | Status | Issue |\n');
    report.push('|-----|--------|-------|\n');
    
    broken.forEach(item => {
      report.push(`| ${item.path} | ${item.status} | ${item.issue} |\n`);
    });
    report.push('\n');
  }

  report.push('## All Results\n\n');
  report.push('| URL | Status |\n');
  report.push('|-----|--------|\n');
  
  results.forEach(result => {
    const status = result.status === 0 ? `ERROR: ${result.error}` : result.status;
    const emoji = result.status >= 200 && result.status < 400 ? '✅' : '❌';
    report.push(`| ${emoji} ${result.url.replace(baseUrl, '')} | ${status} |\n`);
  });

  const reportContent = report.join('');
  fs.writeFileSync('LINK_AUDIT_REPORT.md', reportContent);
  
  console.log(reportContent);
  console.log('\nReport saved to: LINK_AUDIT_REPORT.md');
  
  if (broken.length > 0) {
    console.log(`\n⚠️  Found ${broken.length} broken link(s) that need fixing!`);
    process.exit(1);
  } else {
    console.log('\n✅ All links are working correctly!');
    process.exit(0);
  }
}

checkLinks().catch(err => {
  console.error('Error running link checker:', err);
  process.exit(1);
});
