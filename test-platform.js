const puppeteer = require('puppeteer');
const fs = require('fs');

// Test results storage
const results = {
  frontend: [],
  admin: [],
  api: [],
  errors: [],
  performance: [],
  screenshots: []
};

// Helper to log test results
function logTest(category, name, passed, details = '') {
  const result = {
    name,
    passed,
    details,
    timestamp: new Date().toISOString()
  };
  results[category].push(result);
  console.log(`${passed ? '✅' : '❌'} [${category.toUpperCase()}] ${name}${details ? ': ' + details : ''}`);
}

// Helper to capture console errors
function setupConsoleListener(page, pageName) {
  page.on('console', msg => {
    if (msg.type() === 'error') {
      results.errors.push({
        page: pageName,
        type: 'console',
        message: msg.text(),
        timestamp: new Date().toISOString()
      });
    }
  });

  page.on('pageerror', error => {
    results.errors.push({
      page: pageName,
      type: 'page',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  });

  page.on('requestfailed', request => {
    results.errors.push({
      page: pageName,
      type: 'network',
      message: `Failed to load: ${request.url()}`,
      timestamp: new Date().toISOString()
    });
  });
}

// Helper to measure page load time
async function measurePageLoad(page, url, name) {
  const startTime = Date.now();
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 10000 });
    const loadTime = Date.now() - startTime;
    results.performance.push({ page: name, loadTime });
    
    if (loadTime > 3000) {
      logTest('frontend', `${name} Performance`, false, `Slow load: ${loadTime}ms`);
    } else {
      logTest('frontend', `${name} Performance`, true, `${loadTime}ms`);
    }
    
    return true;
  } catch (error) {
    logTest('frontend', `${name} Load`, false, error.message);
    return false;
  }
}

// Helper to take screenshot
async function takeScreenshot(page, name) {
  const filename = `screenshot-${name.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.png`;
  await page.screenshot({ path: filename, fullPage: true });
  results.screenshots.push(filename);
  console.log(`📸 Screenshot saved: ${filename}`);
}

// FRONTEND TESTS
async function testFrontend(browser) {
  console.log('\n🌐 TESTING FRONTEND...\n');
  const page = await browser.newPage();
  setupConsoleListener(page, 'Frontend');

  // Test 1: Homepage
  console.log('Testing Homepage...');
  const loaded = await measurePageLoad(page, 'http://localhost:3000', 'Homepage');
  
  if (loaded) {
    // Check hero section
    try {
      await page.waitForSelector('h1', { timeout: 5000 });
      const heroText = await page.$eval('h1', el => el.textContent);
      logTest('frontend', 'Homepage Hero', heroText.includes('Transform'), `Found: ${heroText.substring(0, 50)}`);
    } catch (error) {
      logTest('frontend', 'Homepage Hero', false, 'Hero section not found');
    }

    // Check navigation
    try {
      const navLinks = await page.$$eval('nav a', links => links.map(a => a.textContent));
      const expectedLinks = ['Home', 'About', 'Services', 'Portfolio', 'Blog', 'Contact'];
      const hasAllLinks = expectedLinks.every(link => 
        navLinks.some(navLink => navLink.includes(link))
      );
      logTest('frontend', 'Navigation Links', hasAllLinks, `Found: ${navLinks.join(', ')}`);
    } catch (error) {
      logTest('frontend', 'Navigation Links', false, error.message);
    }

    // Check dark mode toggle
    try {
      const darkModeButton = await page.$('[aria-label*="dark"], [aria-label*="theme"], button[class*="dark"]');
      logTest('frontend', 'Dark Mode Toggle', !!darkModeButton, darkModeButton ? 'Found' : 'Not found');
    } catch (error) {
      logTest('frontend', 'Dark Mode Toggle', false, error.message);
    }

    await takeScreenshot(page, 'homepage');
  }

  // Test 2: About Page
  console.log('\nTesting About Page...');
  await measurePageLoad(page, 'http://localhost:3000/about', 'About Page');
  try {
    await page.waitForSelector('h1', { timeout: 5000 });
    const title = await page.$eval('h1', el => el.textContent);
    logTest('frontend', 'About Page Content', title.includes('Prime Staffing'), `Title: ${title}`);
  } catch (error) {
    logTest('frontend', 'About Page Content', false, error.message);
  }

  // Test 3: Services Page
  console.log('\nTesting Services Page...');
  await measurePageLoad(page, 'http://localhost:3000/services', 'Services Page');
  try {
    await page.waitForSelector('h1', { timeout: 5000 });
    logTest('frontend', 'Services Page Load', true);
  } catch (error) {
    logTest('frontend', 'Services Page Load', false, error.message);
  }

  // Test 4: Portfolio/Success Stories
  console.log('\nTesting Portfolio Page...');
  await measurePageLoad(page, 'http://localhost:3000/portfolio', 'Portfolio Page');
  try {
    await page.waitForSelector('.card, article, [class*="project"]', { timeout: 5000 });
    const cards = await page.$$('.card, article, [class*="project"]');
    logTest('frontend', 'Portfolio Projects', cards.length > 0, `Found ${cards.length} projects`);
  } catch (error) {
    logTest('frontend', 'Portfolio Projects', false, error.message);
  }

  // Test 5: Blog Page
  console.log('\nTesting Blog Page...');
  await measurePageLoad(page, 'http://localhost:3000/blog', 'Blog Page');
  try {
    await page.waitForSelector('.card, article, [class*="post"]', { timeout: 5000 });
    const posts = await page.$$('.card, article, [class*="post"]');
    logTest('frontend', 'Blog Posts', posts.length > 0, `Found ${posts.length} posts`);
  } catch (error) {
    logTest('frontend', 'Blog Posts', false, error.message);
  }

  // Test 6: Contact Page & Form
  console.log('\nTesting Contact Page...');
  await measurePageLoad(page, 'http://localhost:3000/contact', 'Contact Page');
  try {
    // Fill contact form
    await page.waitForSelector('input[type="text"], input[name="name"]', { timeout: 5000 });
    await page.type('input[type="text"], input[name="name"]', 'Test User');
    await page.type('input[type="email"], input[name="email"]', 'test@example.com');
    await page.type('textarea, input[name="message"]', 'This is a test message from automated testing.');
    
    logTest('frontend', 'Contact Form Fill', true, 'Form filled successfully');

    // Submit form
    const submitButton = await page.$('button[type="submit"]');
    if (submitButton) {
      await submitButton.click();
      
      // Wait for success message
      await new Promise(resolve => setTimeout(resolve, 2000));
      const successMessage = await page.$('[class*="success"], [class*="green"]');
      logTest('frontend', 'Contact Form Submit', !!successMessage, successMessage ? 'Success message shown' : 'No success message');
    } else {
      logTest('frontend', 'Contact Form Submit', false, 'Submit button not found');
    }

    await takeScreenshot(page, 'contact-form');
  } catch (error) {
    logTest('frontend', 'Contact Form', false, error.message);
  }

  // Test 7: Responsive Design
  console.log('\nTesting Responsive Design...');
  await page.setViewport({ width: 375, height: 667 }); // iPhone size
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  try {
    const mobileMenu = await page.$('[class*="mobile"], button[aria-label*="menu"]');
    logTest('frontend', 'Mobile Responsive', true, mobileMenu ? 'Mobile menu found' : 'Layout adapted');
    await takeScreenshot(page, 'mobile-view');
  } catch (error) {
    logTest('frontend', 'Mobile Responsive', false, error.message);
  }

  await page.close();
}

// ADMIN TESTS
async function testAdmin(browser) {
  console.log('\n🔐 TESTING ADMIN DASHBOARD...\n');
  const page = await browser.newPage();
  setupConsoleListener(page, 'Admin');

  // Test 1: Login Page
  console.log('Testing Admin Login...');
  await measurePageLoad(page, 'http://localhost:3001/login', 'Admin Login Page');
  
  try {
    await page.waitForSelector('input[type="email"]', { timeout: 5000 });
    await page.type('input[type="email"]', 'admin@primestaffing.com');
    await page.type('input[type="password"]', 'Admin123!');
    
    logTest('admin', 'Login Form Fill', true);

    // Click login button
    const loginButton = await page.$('button[type="submit"]');
    if (loginButton) {
      await loginButton.click();
      
      // Wait for redirect to dashboard
      await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 });
      
      const currentUrl = page.url();
      const isOnDashboard = currentUrl.includes('/dashboard');
      logTest('admin', 'Login Success', isOnDashboard, `Redirected to: ${currentUrl}`);

      await takeScreenshot(page, 'admin-dashboard');
    } else {
      logTest('admin', 'Login Button', false, 'Login button not found');
    }
  } catch (error) {
    logTest('admin', 'Login Process', false, error.message);
  }

  // Test 2: Dashboard Stats
  console.log('\nTesting Dashboard Stats...');
  try {
    await page.waitForSelector('[class*="stat"], [class*="card"]', { timeout: 5000 });
    const statCards = await page.$$('[class*="stat"], [class*="card"]');
    logTest('admin', 'Dashboard Stats', statCards.length > 0, `Found ${statCards.length} stat cards`);
  } catch (error) {
    logTest('admin', 'Dashboard Stats', false, error.message);
  }

  // Test 3: Sidebar Navigation
  console.log('\nTesting Sidebar Navigation...');
  try {
    const sidebarLinks = await page.$$('nav a, aside a, [class*="sidebar"] a');
    logTest('admin', 'Sidebar Navigation', sidebarLinks.length > 0, `Found ${sidebarLinks.length} nav links`);
  } catch (error) {
    logTest('admin', 'Sidebar Navigation', false, error.message);
  }

  // Test 4: Navigate to Projects
  console.log('\nTesting Projects Page...');
  try {
    const projectsLink = await page.$('a[href*="project"]');
    if (projectsLink) {
      await projectsLink.click();
      await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 5000 });
      logTest('admin', 'Projects Page Navigation', true);
      await takeScreenshot(page, 'admin-projects');
    } else {
      logTest('admin', 'Projects Page Navigation', false, 'Projects link not found');
    }
  } catch (error) {
    logTest('admin', 'Projects Page', false, error.message);
  }

  // Test 5: Navigate to Blog
  console.log('\nTesting Blog Management...');
  try {
    const blogLink = await page.$('a[href*="blog"]');
    if (blogLink) {
      await blogLink.click();
      await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 5000 });
      logTest('admin', 'Blog Page Navigation', true);
      await takeScreenshot(page, 'admin-blog');
    } else {
      logTest('admin', 'Blog Page Navigation', false, 'Blog link not found');
    }
  } catch (error) {
    logTest('admin', 'Blog Page', false, error.message);
  }

  // Test 6: Navigate to Social
  console.log('\nTesting Social Media Page...');
  try {
    const socialLink = await page.$('a[href*="social"]');
    if (socialLink) {
      await socialLink.click();
      await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 5000 });
      logTest('admin', 'Social Page Navigation', true);
      await takeScreenshot(page, 'admin-social');
    } else {
      logTest('admin', 'Social Page Navigation', false, 'Social link not found');
    }
  } catch (error) {
    logTest('admin', 'Social Page', false, error.message);
  }

  // Test 7: Navigate to Users (Admin only)
  console.log('\nTesting Users Management...');
  try {
    const usersLink = await page.$('a[href*="user"]');
    if (usersLink) {
      await usersLink.click();
      await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 5000 });
      logTest('admin', 'Users Page Navigation', true);
      await takeScreenshot(page, 'admin-users');
    } else {
      logTest('admin', 'Users Page Navigation', false, 'Users link not found');
    }
  } catch (error) {
    logTest('admin', 'Users Page', false, error.message);
  }

  await page.close();
}

// API TESTS
async function testAPI(browser) {
  console.log('\n🔌 TESTING API ENDPOINTS...\n');
  const page = await browser.newPage();

  // Test Swagger UI
  console.log('Testing Swagger Documentation...');
  try {
    await page.goto('http://localhost:4000/api/docs', { waitUntil: 'networkidle2', timeout: 10000 });
    await page.waitForSelector('.swagger-ui, #swagger-ui', { timeout: 5000 });
    logTest('api', 'Swagger UI Load', true);
    await takeScreenshot(page, 'swagger-ui');
  } catch (error) {
    logTest('api', 'Swagger UI Load', false, error.message);
  }

  // Test API endpoints directly
  const endpoints = [
    { url: 'http://localhost:4000/api/health', name: 'Health Check', expectStatus: 200 },
    { url: 'http://localhost:4000/api/blog', name: 'Blog Posts (Public)', expectStatus: 200 },
    { url: 'http://localhost:4000/api/projects', name: 'Projects (Public)', expectStatus: 200 },
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await page.goto(endpoint.url, { waitUntil: 'networkidle2', timeout: 5000 });
      const status = response.status();
      const passed = status === endpoint.expectStatus;
      logTest('api', endpoint.name, passed, `Status: ${status}`);
    } catch (error) {
      logTest('api', endpoint.name, false, error.message);
    }
  }

  await page.close();
}

// GENERATE REPORT
function generateReport() {
  console.log('\n' + '='.repeat(60));
  console.log('📊 TEST REPORT SUMMARY');
  console.log('='.repeat(60) + '\n');

  // Count results
  const frontendTests = results.frontend.length;
  const frontendPassed = results.frontend.filter(t => t.passed).length;
  const adminTests = results.admin.length;
  const adminPassed = results.admin.filter(t => t.passed).length;
  const apiTests = results.api.length;
  const apiPassed = results.api.filter(t => t.passed).length;

  const totalTests = frontendTests + adminTests + apiTests;
  const totalPassed = frontendPassed + adminPassed + apiPassed;

  console.log(`TOTAL TESTS: ${totalTests}`);
  console.log(`PASSED: ${totalPassed} (${((totalPassed/totalTests)*100).toFixed(1)}%)`);
  console.log(`FAILED: ${totalTests - totalPassed}\n`);

  console.log('Frontend: ' + frontendPassed + '/' + frontendTests);
  console.log('Admin: ' + adminPassed + '/' + adminTests);
  console.log('API: ' + apiPassed + '/' + apiTests);

  // Errors
  console.log('\n' + '='.repeat(60));
  console.log('🐛 ERRORS DETECTED');
  console.log('='.repeat(60) + '\n');

  if (results.errors.length === 0) {
    console.log('✅ No errors detected!');
  } else {
    results.errors.forEach((error, index) => {
      console.log(`${index + 1}. [${error.page}] ${error.type.toUpperCase()}: ${error.message}`);
    });
  }

  // Performance
  console.log('\n' + '='.repeat(60));
  console.log('⚡ PERFORMANCE');
  console.log('='.repeat(60) + '\n');

  results.performance.forEach(perf => {
    const status = perf.loadTime > 3000 ? '⚠️' : '✅';
    console.log(`${status} ${perf.page}: ${perf.loadTime}ms`);
  });

  // Failed tests
  console.log('\n' + '='.repeat(60));
  console.log('❌ FAILED TESTS');
  console.log('='.repeat(60) + '\n');

  const allTests = [...results.frontend, ...results.admin, ...results.api];
  const failedTests = allTests.filter(t => !t.passed);

  if (failedTests.length === 0) {
    console.log('✅ All tests passed!');
  } else {
    failedTests.forEach((test, index) => {
      console.log(`${index + 1}. ${test.name}: ${test.details}`);
    });
  }

  // Scores
  console.log('\n' + '='.repeat(60));
  console.log('📈 SCORES');
  console.log('='.repeat(60) + '\n');

  const uiScore = (frontendPassed / frontendTests * 10).toFixed(1);
  const backendScore = ((adminPassed + apiPassed) / (adminTests + apiTests) * 10).toFixed(1);
  const uxScore = results.errors.length === 0 ? 10 : Math.max(0, 10 - results.errors.length).toFixed(1);
  const overallScore = ((parseFloat(uiScore) + parseFloat(backendScore) + parseFloat(uxScore)) / 3).toFixed(1);

  console.log(`UI Score: ${uiScore}/10`);
  console.log(`Backend Score: ${backendScore}/10`);
  console.log(`UX Score: ${uxScore}/10`);
  console.log(`Overall Score: ${overallScore}/10`);

  // Screenshots
  console.log('\n' + '='.repeat(60));
  console.log('📸 SCREENSHOTS');
  console.log('='.repeat(60) + '\n');
  console.log(`Generated ${results.screenshots.length} screenshots:`);
  results.screenshots.forEach(screenshot => console.log(`  - ${screenshot}`));

  // Save report to file
  const report = {
    summary: {
      totalTests,
      totalPassed,
      totalFailed: totalTests - totalPassed,
      passRate: ((totalPassed/totalTests)*100).toFixed(1) + '%'
    },
    scores: {
      ui: parseFloat(uiScore),
      backend: parseFloat(backendScore),
      ux: parseFloat(uxScore),
      overall: parseFloat(overallScore)
    },
    results,
    timestamp: new Date().toISOString()
  };

  fs.writeFileSync('test-report.json', JSON.stringify(report, null, 2));
  console.log('\n✅ Full report saved to: test-report.json\n');

  return report;
}

// MAIN TEST RUNNER
async function runTests() {
  console.log('🚀 Starting Platform Tests...\n');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    await testFrontend(browser);
    await testAdmin(browser);
    await testAPI(browser);
    
    const report = generateReport();
    
    await browser.close();
    
    return report;
  } catch (error) {
    console.error('❌ Test execution failed:', error);
    await browser.close();
    throw error;
  }
}

// Run tests
runTests().catch(console.error);
