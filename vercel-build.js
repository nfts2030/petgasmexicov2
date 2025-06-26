// Este archivo ayuda a Vercel a construir la aplicación correctamente
const { execSync } = require('child_process');

console.log('Instalando dependencias...');
try {
  execSync('npm install', { stdio: 'inherit' });
  
  console.log('Construyendo la aplicación...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('✅ Construcción completada con éxito');
  process.exit(0);
} catch (error) {
  console.error('❌ Error durante la construcción:', error);
  process.exit(1);
}
