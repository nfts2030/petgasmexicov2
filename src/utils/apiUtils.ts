// Utility function to check API health
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch('/api/health', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.warn('API health check returned non-JSON response');
      return false;
    }
    
    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};

// Function to retry API calls with exponential backoff
export const retryApiCall = async <T>(
  apiCall: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: Error;
  
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await apiCall();
    } catch (error) {
      lastError = error as Error;
      
      if (i === maxRetries) {
        throw lastError;
      }
      
      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
    }
  }
  
  throw lastError!;
};

// Helper function to safely parse API responses
export const safeJsonParse = async (response: Response): Promise<any> => {
  try {
    const contentType = response.headers.get('content-type');
    
    if (!contentType || !contentType.includes('application/json')) {
      // If not JSON, try to get text and create a generic response
      const text = await response.text();
      if (text) {
        try {
          return JSON.parse(text);
        } catch {
          // If parsing fails, return a generic response
          return { 
            success: response.status >= 200 && response.status < 300,
            message: text || 'Request completed'
          };
        }
      } else {
        // Empty response
        return { 
          success: response.status >= 200 && response.status < 300,
          message: 'Request completed successfully'
        };
      }
    }
    
    // If JSON content type, parse normally
    return await response.json();
  } catch (error) {
    console.error('Error parsing JSON response:', error);
    // Return a generic error response
    return {
      success: false,
      message: 'Invalid response format from server'
    };
  }
};;