# PETGAS Mobile

PETGAS Mobile is a responsive web application for PETGAS México, showcasing their innovative plastic-to-fuel technology and services.

## Features

- Responsive design for all device sizes
- Multi-language support (Spanish/English)
- Interactive contact form with email integration
- Detailed information about PETGAS machinery and fuel products
- Plastic credit program information
- Modern UI with smooth animations

## Technologies Used

- React 18 with TypeScript
- Vite for build tooling
- Styled Components for styling
- React Router for navigation
- i18next for internationalization
- Vercel for deployment

## Development

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Deployment

This project is configured for deployment to Vercel. Simply connect your GitHub repository to Vercel and it will automatically deploy on pushes to the main branch.

## Environment Variables

For production deployment, set the following environment variables in your Vercel dashboard:

```
NODE_ENV=production
```

## API Endpoints

- `POST /api/contact` - Contact form submission
- `GET /api/health` - Health check endpoint

## License

Copyright © 2025 PETGAS México. All rights reserved.