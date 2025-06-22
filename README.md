# 🚀 PETGAS Móvil

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-3178C6?logo=typescript)](https://www.typescriptlang.org/)

Versión móvil optimizada del sitio web oficial de [PETGAS México](https://petgas.com.mx/). Este proyecto es una adaptación fiel del sitio web original, diseñada específicamente para ofrecer la mejor experiencia en dispositivos móviles.

## 🎯 Objetivo

Crear una versión móvil del sitio web de PETGAS que:
- Sea una réplica exacta del diseño y funcionalidad del sitio original
- Ofrezca una experiencia de usuario optimizada para dispositivos móviles
- Mantenga la misma estructura de navegación y contenido que la versión de escritorio
- Sea rápida, accesible y fácil de usar en cualquier dispositivo móvil

## 🚀 Características Principales

- **Diseño responsive** que se adapta a cualquier dispositivo móvil
- **Navegación intuitiva** con menú desplegable
- **Páginas optimizadas** para carga rápida
- **Animaciones suaves** con Framer Motion
- **Accesibilidad** siguiendo las mejores prácticas WCAG
- **Tipografía e iconografía** optimizadas para móviles
- **Formularios accesibles** con validación

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 18 con TypeScript
- **Estilado**: Styled Components
- **Enrutamiento**: React Router DOM v6
- **Animaciones**: Framer Motion
- **Gestión de Estado**: React Context API
- **Bundler**: Vite
- **Linting**: ESLint + Prettier
- **Control de Versiones**: Git + GitHub

## 🏗️ Estructura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── layout/          # Componentes de diseño (Header, Footer, etc.)
│   ├── home/            # Componentes específicos de la página de inicio
│   └── ui/              # Componentes de interfaz de usuario genéricos
├── pages/               # Componentes de página
├── assets/              # Recursos estáticos (imágenes, fuentes, etc.)
├── styles/              # Estilos globales y temas
├── hooks/               # Custom hooks
├── utils/               # Funciones de utilidad
├── services/            # Llamadas a APIs y servicios
└── types/               # Definiciones de tipos TypeScript
```

## 🚀 Páginas Principales

- **Inicio** (`/`) - Página principal con información destacada
- **Equipo** (`/equipo`) - Conoce a nuestro equipo
- **Nuestras Máquinas** (`/maquinas`) - Tecnología y equipamiento
- **Combustibles** (`/combustibles`) - Productos y soluciones energéticas
- **Créditos Plásticos** (`/creditos`) - Programa de reciclaje
- **Contacto** (`/contacto`) - Formulario de contacto
- **Intranet** (`/intranet`) - Acceso al sistema interno

## 🏃‍♂️ Empezando

### Prerrequisitos

- Node.js (v16 o superior)
- npm (v8 o superior) o yarn
- Git

### Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/ricardoduhalt2/petgasmobile.git
   cd petgasmobile
   ```

2. Instala las dependencias:
   ```bash
   npm install
   # o
   yarn
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   # o
   yarn dev
   ```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador

## 📦 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la versión de producción
- `npm run lint` - Ejecuta el linter
- `npm run format` - Formatea el código
- `npm test` - Ejecuta las pruebas (si están configuradas)

## 🌐 Despliegue

El proyecto está configurado para desplegarse fácilmente en Vercel o Netlify. Simplemente haz push a la rama `main` para desplegar automáticamente.

## 🤝 Cómo Contribuir

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Haz push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Contacto

- Ricardo Duhalt - [@ricardoduhalt](https://twitter.com/ricardoduhalt)
- Proyecto: [https://github.com/ricardoduhalt2/petgasmobile](https://github.com/ricardoduhalt2/petgasmobile)

## 🙏 Agradecimientos

- A todo el equipo de PETGAS México por su apoyo.
- A los colaboradores que han ayudado a mejorar este proyecto.
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Páginas del Sitio

- [x] Inicio (`/`)
- [ ] Equipo (`/equipo`)
- [ ] Nuestras Máquinas (`/maquinas`)
- [ ] Combustibles (`/combustibles`)
- [ ] Créditos Plásticos (`/creditos`)
- [ ] Contacto (`/contacto`)
- [ ] Intranet (`/intranet`)

## Progreso Actual

### Componentes Principales
- [x] Header con menú móvil
- [x] Footer
- [ ] Componente de Testimonios
- [ ] Componente de Galería
- [ ] Formulario de Contacto

### Páginas
- [x] Estructura básica de rutas
- [ ] Página de Inicio (parcialmente completada)
- [ ] Páginas restantes

## Cómo Ejecutar el Proyecto

1. Clona el repositorio
2. Instala las dependencias:
   ```bash
   npm install
   # o
   yarn install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   # o
   yarn dev
   ```
4. Abre tu navegador en [http://localhost:3000](http://localhost:3000)

## Notas de Implementación

- Este proyecto es un clon fiel del sitio web original de PETGAS México.
- Todos los textos, imágenes y recursos son propiedad de PETGAS México.
- El propósito de este proyecto es únicamente educativo y de práctica de desarrollo web.

## Licencia

Este proyecto es propiedad de PETGAS México. Todos los derechos reservados.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
