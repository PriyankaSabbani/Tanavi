// Quick API Test Script
// Run with: node test-api.js

const API_TESTS = [
  { name: 'Health Check', endpoint: '/api/properties', method: 'GET' },
  { name: 'Gallery', endpoint: '/api/gallery', method: 'GET' },
  { name: 'Buy/Sell', endpoint: '/api/buysell', method: 'GET' }
];

const BASE_URL = process.env.API_URL || 'http://localhost:5000';

async function testEndpoint(test) {
  try {
    const start = Date.now();
    const response = await fetch(`${BASE_URL}${test.endpoint}`, {
      method: test.method,
      headers: { 'Content-Type': 'application/json' }
    });
    const duration = Date.now() - start;
    
    const status = response.ok ? '✓' : '✗';
    console.log(`${status} ${test.name}: ${response.status} (${duration}ms)`);
    
    if (!response.ok) {
      const error = await response.text();
      console.log(`  Error: ${error}`);
    }
  } catch (error) {
    console.log(`✗ ${test.name}: ${error.message}`);
  }
}

async function runTests() {
  console.log(`\nTesting API at: ${BASE_URL}\n`);
  console.log('='.repeat(50));
  
  for (const test of API_TESTS) {
    await testEndpoint(test);
  }
  
  console.log('='.repeat(50));
  console.log('\nTest complete!\n');
}

runTests();
