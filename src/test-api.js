// Test script for API endpoints
const testApiEndpoints = async () => {
  console.log('Testing API endpoints...');
  
  try {
    // Test health endpoint
    console.log('Testing /api/health...');
    const healthResponse = await fetch('/api/health');
    const healthData = await healthResponse.json();
    console.log('Health check result:', healthData);
    
    if (healthData.success) {
      console.log('✓ Health check passed');
    } else {
      console.log('✗ Health check failed');
    }
  } catch (error) {
    console.error('Error testing health endpoint:', error);
  }
  
  try {
    // Test contact endpoint (OPTIONS method)
    console.log('Testing /api/contact OPTIONS...');
    const optionsResponse = await fetch('/api/contact', {
      method: 'OPTIONS'
    });
    console.log('Contact OPTIONS status:', optionsResponse.status);
    
    if (optionsResponse.status === 200) {
      console.log('✓ Contact OPTIONS check passed');
    } else {
      console.log('✗ Contact OPTIONS check failed');
    }
  } catch (error) {
    console.error('Error testing contact OPTIONS endpoint:', error);
  }
};

// Run the test
testApiEndpoints();