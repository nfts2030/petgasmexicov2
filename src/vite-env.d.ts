/// <reference types="vite/client" />

// Para módulos JSON
declare module '*.json' {
  const value: any;
  export default value;
}

// Para módulos CSS
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
