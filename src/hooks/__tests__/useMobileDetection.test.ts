import { renderHook, act } from '@testing-library/react';
import useMobileDetection from '../useMobileDetection';

// Mock window object for testing
const mockWindow = (width: number, userAgent: string) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  
  Object.defineProperty(navigator, 'userAgent', {
    writable: true,
    configurable: true,
    value: userAgent,
  });
};

describe('useMobileDetection', () => {
  beforeEach(() => {
    // Reset window size and user agent before each test
    mockWindow(1024, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
  });

  it('should detect desktop device correctly', () => {
    mockWindow(1200, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    
    const { result } = renderHook(() => useMobileDetection());
    
    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.deviceType).toBe('desktop');
  });

  it('should detect mobile device by screen width', () => {
    mockWindow(375, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    
    const { result } = renderHook(() => useMobileDetection());
    
    expect(result.current.isMobile).toBe(true);
    expect(result.current.deviceType).toBe('mobile');
  });

  it('should detect mobile device by user agent', () => {
    mockWindow(1200, 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15');
    
    const { result } = renderHook(() => useMobileDetection());
    
    expect(result.current.isMobile).toBe(true);
    expect(result.current.deviceType).toBe('mobile');
  });

  it('should detect tablet device', () => {
    mockWindow(800, 'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15');
    
    const { result } = renderHook(() => useMobileDetection());
    
    expect(result.current.isTablet).toBe(true);
    expect(result.current.deviceType).toBe('tablet');
  });

  it('should update detection on window resize', () => {
    mockWindow(1200, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    
    const { result } = renderHook(() => useMobileDetection());
    
    // Initially desktop
    expect(result.current.isMobile).toBe(false);
    
    // Simulate resize to mobile width
    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });
      
      // Trigger resize event
      window.dispatchEvent(new Event('resize'));
    });
    
    // Should now detect as mobile
    expect(result.current.isMobile).toBe(true);
  });
});