/// <reference types="vite/client" />

// Environment Variables
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_API_BASE_URL: string;
  // Add other environment variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// JSON Modules
declare module '*.json' {
  const value: any;
  export default value;
}

// CSS Modules
interface CSSModuleClasses {
  [key: string]: string;
}

declare module '*.module.css' {
  const classes: CSSModuleClasses;
  export default classes;
}

declare module '*.module.scss' {
  const classes: CSSModuleClasses;
  export default classes;
}

declare module '*.module.sass' {
  const classes: CSSModuleClasses;
  export default classes;
}

declare module '*.module.less' {
  const classes: CSSModuleClasses;
  export default classes;
}

declare module '*.module.styl' {
  const classes: CSSModuleClasses;
  export default classes;
}
