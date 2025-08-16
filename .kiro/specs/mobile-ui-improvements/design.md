# Design Document

## Overview

This design document outlines the implementation of mobile UI improvements for the PETGAS website, focusing on three key areas: mobile device detection with conditional "Modo Móvil" indicator, removal of the team section, and implementation of a cohesive corporate color palette. The solution will enhance the mobile user experience while maintaining the existing React + TypeScript architecture.

## Architecture

The implementation will leverage the existing React architecture with the following key components:

### Component Architecture
- **Mobile Detection Hook**: Custom React hook for device detection
- **Header Component**: Modified to include conditional mobile indicator
- **Router Configuration**: Updated to remove team routes
- **Theme System**: Enhanced CSS custom properties for corporate colors
- **Styled Components**: Updated with new color palette

### State Management
- Mobile detection state managed through custom hook
- No additional global state required
- Existing LanguageContext remains unchanged

## Components and Interfaces

### 1. Mobile Detection System

#### Custom Hook: `useMobileDetection`
```typescript
interface MobileDetectionHook {
  isMobile: boolean;
  isTablet: boolean;
  deviceType: 'mobile' | 'tablet' | 'desktop';
}

const useMobileDetection = (): MobileDetectionHook
```

**Implementation Strategy:**
- Use `navigator.userAgent` for initial detection
- Combine with `window.innerWidth` for responsive detection
- Listen to resize events for dynamic updates
- Support for both touch and screen size detection

#### Mobile Mode Indicator Component
```typescript
interface MobileModeIndicatorProps {
  show: boolean;
}

const MobileModeIndicator: React.FC<MobileModeIndicatorProps>
```

**Features:**
- Animated signal bars with CSS keyframes
- Conditional rendering based on device detection
- Styled with corporate colors
- Responsive design for different screen sizes

### 2. Team Section Removal

#### Router Updates
- Remove `/equipo` route from App.tsx
- Remove EquipoPage import and lazy loading
- Update navigation menu to exclude team link
- Implement redirect or 404 handling for legacy URLs

#### Navigation Menu Updates
- Remove team navigation item from Header component
- Update translation keys to exclude team references
- Maintain existing menu structure and styling

### 3. Corporate Color System

#### CSS Custom Properties Update
```css
:root {
  /* Corporate Color Palette */
  --primary-color: #0a4b2a;      /* Verde oscuro */
  --secondary-color: #0d7a3d;    /* Verde medio */
  --accent-color: #11914b;       /* Verde PETGAS */
  --accent-hover: #1abc9c;       /* Verde turquesa */
  --text-color: #f0fdf4;         /* Verde muy claro */
  
  /* Background Gradients */
  --bg-gradient-primary: linear-gradient(135deg, #0a4b2a, #0d7a3d);
  --bg-gradient-secondary: linear-gradient(90deg, rgba(10,75,42,0.9), rgba(13,122,61,0.8));
  --bg-gradient-accent: linear-gradient(45deg, #11914b, #1abc9c);
}
```

#### Component Color Mapping
- **Headers/Navigation**: Primary color (#0a4b2a)
- **Buttons/CTAs**: Accent color (#11914b) with hover (#1abc9c)
- **Secondary Elements**: Secondary color (#0d7a3d)
- **Text**: Light green (#f0fdf4) for contrast
- **Backgrounds**: Green gradients with transparency

## Data Models

### Mobile Detection Data
```typescript
interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  screenWidth: number;
  userAgent: string;
  touchSupport: boolean;
}
```

### Color Theme Data
```typescript
interface ColorTheme {
  primary: string;
  secondary: string;
  accent: string;
  accentHover: string;
  text: string;
  gradients: {
    primary: string;
    secondary: string;
    accent: string;
  };
}
```

## Error Handling

### Mobile Detection Fallbacks
- Default to desktop mode if detection fails
- Graceful degradation for unsupported browsers
- Console warnings for debugging in development

### Route Handling
- Redirect `/equipo` to home page with 301 status
- Maintain SEO by updating sitemap
- Log removed route access for analytics

### Color System Fallbacks
- CSS fallback colors for unsupported browsers
- Maintain accessibility contrast ratios
- Progressive enhancement approach

## Testing Strategy

### Unit Tests
- Mobile detection hook functionality
- Color theme application
- Component rendering with new props

### Integration Tests
- Navigation flow without team section
- Mobile indicator visibility logic
- Color consistency across components

### Visual Regression Tests
- Screenshot comparison for color changes
- Mobile vs desktop indicator display
- Navigation menu layout verification

### Accessibility Tests
- Color contrast validation
- Mobile touch target sizes
- Screen reader compatibility

## Implementation Phases

### Phase 1: Mobile Detection
1. Create `useMobileDetection` hook
2. Implement mobile indicator component
3. Update Header component
4. Test across devices

### Phase 2: Team Section Removal
1. Remove route from App.tsx
2. Update Header navigation
3. Remove EquipoPage component
4. Update translations

### Phase 3: Color System Implementation
1. Update CSS custom properties
2. Modify styled components
3. Update global styles
4. Test color consistency

### Phase 4: Testing & Optimization
1. Cross-browser testing
2. Performance optimization
3. Accessibility validation
4. Documentation updates

## Performance Considerations

### Mobile Detection Optimization
- Debounce resize event listeners
- Cache detection results
- Minimize re-renders with useMemo

### Color System Performance
- Use CSS custom properties for efficient updates
- Minimize styled-components re-compilation
- Optimize gradient rendering

### Bundle Size Impact
- Remove team-related components from bundle
- Tree-shake unused color utilities
- Optimize mobile detection logic

## Browser Compatibility

### Supported Browsers
- Chrome 90+
- Safari 14+
- Firefox 88+
- Edge 90+

### Fallback Strategies
- CSS custom properties fallbacks
- UserAgent detection alternatives
- Progressive enhancement for older browsers