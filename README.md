# 🚀 PETGAS Móvil

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Styled Components](https://img.shields.io/badge/styled--components-DB7093?logo=styled-components&logoColor=white)](https://styled-components.com/)

Versión móvil optimizada del sitio web oficial de [PETGAS México](https://petgas.com.mx/). Este proyecto es una adaptación fiel del sitio web original, diseñada específicamente para ofrecer la mejor experiencia en dispositivos móviles, con mejoras en la interfaz de usuario y rendimiento.

## 🎯 Objetivo

Crear una versión móvil del sitio web de PETGAS que:
- Sea una réplica exacta del diseño y funcionalidad del sitio original
- Ofrezca una experiencia de usuario optimizada para dispositivos móviles
- Mantenga la misma estructura de navegación y contenido que la versión de escritorio
- Sea rápida, accesible y fácil de usar en cualquier dispositivo móvil
- Incluya efectos visuales modernos como gradientes animados y transiciones suaves

## ♻️ Tipos de Plástico Soportados

La aplicación muestra información detallada sobre diferentes tipos de plásticos reciclables, incluyendo:

| Tipo | Nombre | Descripción |
|------|--------|-------------|
| PET | Tereftalato de Polietileno | Botellas de agua, refrescos, envases de alimentos, bandejas, alfombras |
| HDPE | Polietileno de Alta Densidad | Botes de Gel, botellas de lácteos, botellas de shampoo, baldes |
| LDPE | Polietileno de Baja Densidad | Bolsas de plástico, envolturas, botellas exprimibles, tapas flexibles |
| PP | Polipropileno | Envases de yogur, tapas de botellas, pajitas, envases de medicamentos |
| PS | Poliestireno | Vasos desechables, bandejas de carne, envases de comida rápida |

Cada tipo de plástico incluye una tarjeta informativa con su símbolo, descripción detallada y ejemplos de usos comunes.

## 🚀 Características Principales

- **Diseño responsive** que se adapta a cualquier dispositivo móvil
- **Navegación intuitiva** con menú desplegable
- **Páginas optimizadas** para carga rápida
- **Efectos visuales modernos** con gradientes animados y transiciones suaves
- **Animaciones optimizadas** con Framer Motion y CSS puro
- **Accesibilidad** siguiendo las mejores prácticas WCAG
- **Tipografía e iconografía** optimizadas para móviles
- **Formularios accesibles** con validación
- **Iconos de servicios** con efectos de hover y animaciones
- **Títulos con gradiente animado** para mayor impacto visual
- **Botón de WhatsApp flotante** con animación y tooltip interactivo

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 18 con TypeScript
- **Estilado**: Styled Components + CSS moderno (variables CSS, flexbox, grid)
- **Efectos Visuales**: Gradientes CSS, animaciones con keyframes
- **Enrutamiento**: React Router DOM v6
- **Animaciones**: Framer Motion + CSS Animations
- **Iconos**: React Icons (FontAwesome)
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
│   │   ├── HeroSection/  # Sección hero con título animado
│   │   ├── ServicesSection/  # Sección de servicios con iconos interactivos
│   │   └── ProcessSection/   # Sección del proceso con animaciones
│   └── ui/              # Componentes de interfaz de usuario genéricos
├── pages/               # Componentes de página
├── assets/              # Recursos estáticos (imágenes, fuentes, etc.)
├── styles/              # Estilos globales y temas
│   ├── animations.ts    # Definiciones de animaciones
│   ├── global.css       # Estilos globales
│   └── theme.ts         # Tema y variables de diseño
├── hooks/               # Custom hooks
├── utils/               # Funciones de utilidad
├── services/            # Llamadas a APIs y servicios
└── types/               # Definiciones de tipos TypeScript
```

## 🚀 Páginas Principales

- **Inicio** (`/`) - Página principal con información destacada y efectos visuales modernos
  - Hero con título con gradiente animado
  - Tarjetas de servicios con iconos interactivos
  - Sección de proceso con animaciones fluidas
  - Estadísticas impactantes
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

## ✨ Últimas Mejoras

### UI/UX Mejorada
- **Título Hero con Gradiente Animado**: Efecto de gradiente que fluye suavemente en el título principal
- **Iconos de Servicios Interactivos**: Efectos de hover y animaciones en los iconos de servicios
- **Botón de WhatsApp Flotante**: Acceso rápido a soporte con animación y tooltip informativo
- **Transiciones Suaves**: Mejoras en las transiciones entre páginas y elementos interactivos
- **Diseño Responsive Mejorado**: Mejoras en la adaptabilidad a diferentes tamaños de pantalla

### Rendimiento
- Optimización de animaciones CSS para mejor rendimiento en móviles
- Carga perezosa de componentes para mejorar el tiempo de carga inicial
- Optimización de imágenes y recursos estáticos

## 📦 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la versión de producción localmente
- `npm run lint` - Ejecuta el linter para verificar la calidad del código
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
