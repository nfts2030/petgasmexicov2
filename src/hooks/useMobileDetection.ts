import { useState, useEffect } from 'react';

interface MobileDetectionHook {
  isMobile: boolean;
  isTablet: boolean;
  deviceType: 'mobile' | 'tablet' | 'desktop';
}

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  screenWidth: number;
  userAgent: string;
  touchSupport: boolean;
}

// Mobile detection logic based on user agent and screen size
const detectMobile = (userAgent: string, screenWidth: number): boolean => {
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const isMobileUA = mobileRegex.test(userAgent);
  const isMobileScreen = screenWidth <= 768;
  
  // Consider it mobile if either user agent indicates mobile OR screen is small
  return isMobileUA || isMobileScreen;
};

// Tablet detection logic
const detectTablet = (userAgent: string, screenWidth: number): boolean => {
  const tabletRegex = /iPad|Android(?!.*Mobile)|Tablet/i;
  const isTabletUA = tabletRegex.test(userAgent);
  const isTabletScreen = screenWidth > 768 && screenWidth <= 1024;
  
  return isTabletUA || isTabletScreen;
};

const useMobileDetection = (): MobileDetectionHook => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(() => {
    // Initial detection on mount
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
    const touchSupport = typeof window !== 'undefined' && 'ontouchstart' in window;
    
    return {
      isMobile: detectMobile(userAgent, screenWidth),
      isTablet: detectTablet(userAgent, screenWidth),
      screenWidth,
      userAgent,
      touchSupport
    };
  });

  // Determine device type based on detection results
  const getDeviceType = (isMobile: boolean, isTablet: boolean): 'mobile' | 'tablet' | 'desktop' => {
    if (isMobile && !isTablet) return 'mobile';
    if (isTablet) return 'tablet';
    return 'desktop';
  };

  // Handle window resize events
  useEffect(() => {
    const handleResize = () => {
      const newScreenWidth = window.innerWidth;
      const userAgent = navigator.userAgent;
      const touchSupport = 'ontouchstart' in window;
      
      const newIsMobile = detectMobile(userAgent, newScreenWidth);
      const newIsTablet = detectTablet(userAgent, newScreenWidth);
      
      setDeviceInfo({
        isMobile: newIsMobile,
        isTablet: newIsTablet,
        screenWidth: newScreenWidth,
        userAgent,
        touchSupport
      });
    };

    // Debounce resize events to improve performance
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 150);
    };

    window.addEventListener('resize', debouncedResize);
    
    // Also listen for orientation changes on mobile devices
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', debouncedResize);
      window.removeEventListener('orientationchange', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return {
    isMobile: deviceInfo.isMobile,
    isTablet: deviceInfo.isTablet,
    deviceType: getDeviceType(deviceInfo.isMobile, deviceInfo.isTablet)
  };
};

export default useMobileDetection;
export type { MobileDetectionHook, DeviceInfo };