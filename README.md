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

### Características de las Tarjetas de Plástico

Cada tipo de plástico se muestra en una tarjeta interactiva con las siguientes características:

- **Símbolo de identificación** superpuesto sobre la imagen del plástico
- **Efectos visuales** como sombras y resplandor para mejorar la visibilidad
- **Animaciones suaves** al cargar las imágenes y al interactuar con las tarjetas
- **Diseño responsivo** que se adapta a diferentes tamaños de pantalla
- **Manejo de errores** para mostrar contenido alternativo si falla la carga de imágenes

### Símbolos de Identificación

Cada tipo de plástico incluye su símbolo de identificación estándar superpuesto sobre la imagen correspondiente. Los símbolos están diseñados para ser claramente visibles y reconocibles, con efectos de sombra y brillo para mejorar la legibilidad sobre diferentes fondos.

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
- **Videos Explicativos**: Se han añadido videos en las secciones de productos para una mejor visualización
- **Actualización de Contenido**: Textos mejorados en las secciones de contacto y llamados a la acción
- **Optimización de Imágenes**: Mejora en la carga y visualización de recursos multimedia

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

## 🎨 Efecto 3D del Logo

El logo en el footer utiliza un efecto 3D avanzado que combina múltiples capas y animaciones CSS. A continuación se detalla su implementación:

### Estructura del Componente

```jsx
<Logo3DContainer>
  <Logo3DInner>
    <LogoFront>
      <img src="/img/logoGlow.png" alt="PETGAS Logo" />
    </LogoFront>
    <LogoEffects>
      <LogoGlow />
      <LogoBorder />
      <LogoShine />
      <LogoLight top="20%" left="20%" size="6px" delay="4s" />
      <LogoLight top="70%" left="70%" size="4px" delay="3s" />
      <LogoReflection />
    </LogoEffects>
  </Logo3DInner>
  <LogoShadow />
</Logo3DContainer>
```

### Animaciones Principales

1. **Flotación 3D** (`float3d`):
   - Movimiento suave de flotación en 3D
   - Rotación sutil en los ejes X e Y
   - Cambio en la sombra para dar profundidad

2. **Brillo** (`shine`):
   - Efecto de luz que se desliza sobre el logo
   - Se mueve en diagonal a través del contenedor

3. **Destellos** (`twinkle`):
   - Puntos de luz que parpadean suavemente
   - Tamaño y opacidad variables

4. **Sombra Pulsante** (`shadowPulse`):
   - Sombra que cambia de tamaño y opacidad
   - Crea efecto de profundidad y realismo

5. **Pulso** (`pulse`):
   - Efecto de resplandor que late suavemente
   - Aumenta y disminuye de tamaño y opacidad

### Componentes del Efecto

- **Logo3DContainer**: Contenedor principal con perspectiva 3D
- **Logo3DInner**: Elemento interno que contiene las capas del logo
- **LogoFront**: Capa frontal con la imagen del logo
- **LogoEffects**: Contenedor para efectos visuales
- **LogoGlow**: Resplandor base alrededor del logo
- **LogoBorder**: Borde con sombra sutil
- **LogoShine**: Efecto de brillo deslizante
- **LogoLight**: Puntos de luz parpadeantes
- **LogoShadow**: Sombra proyectada debajo del logo
- **LogoReflection**: Reflejo de luz en la parte superior

### Personalización

Puedes ajustar los siguientes parámetros:

- Tamaño del logo: Modifica `width` y `height` en `Logo3DContainer`
- Intensidad del efecto: Ajusta `opacity` y `filter` en los componentes de efectos
- Velocidad de animación: Modifica las duraciones en las definiciones de `keyframes`
- Colores: Actualiza los gradientes en `LogoGlow` y otros componentes

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
- [x] Equipo (`/equipo`)
- [x] Nuestras Máquinas (`/maquinas`)
- [x] Combustibles (`/combustibles`)
- [x] Créditos Plásticos (`/creditos`)
- [x] Contacto (`/contacto`)
- [x] Intranet (`/intranet`)

## Progreso Actual

### Componentes Principales
- [x] Header con menú móvil
- [x] Footer con efectos 3D
- [x] Componente de Testimonios
- [x] Galería de Productos
- [x] Formulario de Contacto
- [x] Tarjetas de Productos Interactivas
- [x] Sección de Proceso con Animaciones
- [x] Integración de Videos Explicativos

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

- Este proyecto es una versión mejorada y optimizada del sitio web original de PETGAS México.
- Se han implementado mejoras en la interfaz de usuario, rendimiento y experiencia móvil.
- Se han añadido secciones interactivas y contenido multimedia para una mejor presentación de los productos.
- El diseño es completamente responsivo y se ha optimizado para dispositivos móviles.
- Incluye animaciones suaves y efectos visuales modernos para mejorar la experiencia del usuario.

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
