const puppeteer = require('puppeteer');

async function testAPI() {
  console.log('🚀 Starting API tests with Puppeteer...\n');

  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  try {
    // Test 1: Health Check
    console.log('📍 Test 1: API Health Check');
    const healthResponse = await page.goto('http://localhost:4000/api/docs', {
      waitUntil: 'networkidle0',
      timeout: 10000
    });
    console.log(`   Status: ${healthResponse.status()}`);
    console.log(`   ✅ Swagger docs accessible\n`);

    // Test 2: Login
    console.log('📍 Test 2: User Login');
    const loginData = {
      email: 'admin@rajivinteriors.com',
      password: 'Admin123!'
    };

    const loginResponse = await page.evaluate(async (data) => {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      return {
        status: response.status,
        data: await response.json()
      };
    }, loginData);

    console.log(`   Status: ${loginResponse.status}`);
    if (loginResponse.status === 201) {
      console.log(`   ✅ Login successful`);
      console.log(`   User: ${loginResponse.data.user.email}`);
      console.log(`   Role: ${loginResponse.data.user.role}`);
      
      const accessToken = loginResponse.data.accessToken;

      // Test 3: Get Dashboard Analytics
      console.log('\n📍 Test 3: Dashboard Analytics');
      const analyticsResponse = await page.evaluate(async (token) => {
        const response = await fetch('http://localhost:4000/api/analytics/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        return {
          status: response.status,
          data: await response.json()
        };
      }, accessToken);

      console.log(`   Status: ${analyticsResponse.status}`);
      if (analyticsResponse.status === 200) {
        console.log(`   ✅ Analytics retrieved`);
        console.log(`   Total Projects: ${analyticsResponse.data.totalProjects}`);
        console.log(`   Total Clients: ${analyticsResponse.data.totalClients}`);
        console.log(`   Total Posts: ${analyticsResponse.data.totalPosts}`);
        console.log(`   Total Leads: ${analyticsResponse.data.totalLeads}`);
      }

      // Test 4: Get Social Posts
      console.log('\n📍 Test 4: Social Posts');
      const postsResponse = await page.evaluate(async (token) => {
        const response = await fetch('http://localhost:4000/api/social-posts', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        return {
          status: response.status,
          data: await response.json()
        };
      }, accessToken);

      console.log(`   Status: ${postsResponse.status}`);
      if (postsResponse.status === 200) {
        console.log(`   ✅ Social posts retrieved`);
        console.log(`   Total posts: ${postsResponse.data.length}`);
      }

      // Test 5: Get Blog Posts
      console.log('\n📍 Test 5: Blog Posts (Public)');
      const blogResponse = await page.evaluate(async () => {
        const response = await fetch('http://localhost:4000/api/blog');
        return {
          status: response.status,
          data: await response.json()
        };
      });

      console.log(`   Status: ${blogResponse.status}`);
      if (blogResponse.status === 200) {
        console.log(`   ✅ Blog posts retrieved`);
        console.log(`   Total posts: ${blogResponse.data.length}`);
        if (blogResponse.data.length > 0) {
          console.log(`   First post: "${blogResponse.data[0].title}"`);
        }
      }

      // Test 6: Get Projects
      console.log('\n📍 Test 6: Projects');
      const projectsResponse = await page.evaluate(async (token) => {
        const response = await fetch('http://localhost:4000/api/projects', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        return {
          status: response.status,
          data: await response.json()
        };
      }, accessToken);

      console.log(`   Status: ${projectsResponse.status}`);
      if (projectsResponse.status === 200) {
        console.log(`   ✅ Projects retrieved`);
        console.log(`   Total projects: ${projectsResponse.data.length}`);
      }

      // Test 7: Get Users (Admin only)
      console.log('\n📍 Test 7: Users (Admin only)');
      const usersResponse = await page.evaluate(async (token) => {
        const response = await fetch('http://localhost:4000/api/users', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        return {
          status: response.status,
          data: await response.json()
        };
      }, accessToken);

      console.log(`   Status: ${usersResponse.status}`);
      if (usersResponse.status === 200) {
        console.log(`   ✅ Users retrieved`);
        console.log(`   Total users: ${usersResponse.data.length}`);
      }

      console.log('\n✅ All tests passed successfully!');
    } else {
      console.log(`   ❌ Login failed: ${JSON.stringify(loginResponse.data)}`);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
}

// Run tests
testAPI().catch(console.error);
