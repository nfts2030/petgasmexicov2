import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta al archivo que queremos modificar
const filePath = path.join(__dirname, 'src/pages/EquipoPage.tsx');

async function updateBadges() {
  try {
    // Leer el contenido del archivo
    const data = await fs.readFile(filePath, 'utf8');
    
    // Reemplazar las instancias de los badges de departamento
    const updatedContent = data.replace(
      /<p className="division">\{member\.division\}<\/p>/g,
      '<DepartmentBadge $color={getDepartmentColor(member.division)}>\n                  {member.division}\n                </DepartmentBadge>'
    );

    // Escribir el contenido actualizado de vuelta al archivo
    await fs.writeFile(filePath, updatedContent, 'utf8');
    console.log('¡Archivo actualizado exitosamente!');
  } catch (err) {
    console.error('Error al procesar el archivo:', err);
  }
}

// Ejecutar la función
updateBadges();
