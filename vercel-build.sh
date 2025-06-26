#!/bin/bash

# Instalar dependencias
npm install

# Construir la aplicación
npm run build

# Verificar que el directorio de salida existe
if [ -d "dist" ]; then
  echo "✅ Directorio de salida 'dist' encontrado"
  ls -la dist/
else
  echo "❌ Error: No se encontró el directorio de salida 'dist'"
  exit 1
fi
