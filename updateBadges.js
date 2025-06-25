const fs = require('fs');
const path = require('path');

// Ruta al archivo que queremos modificar
const filePath = path.join(__dirname, 'src/pages/EquipoPage.tsx');

// Leer el contenido del archivo
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo:', err);
    return;
  }

  // Reemplazar las instancias de los badges de departamento
  const updatedContent = data.replace(
    /<p className="division">\{member\.division\}<\/p>/g,
    '<DepartmentBadge $color={getDepartmentColor(member.division)}>\n                  {member.division}\n                </DepartmentBadge>'
  );

  // Escribir el contenido actualizado de vuelta al archivo
  fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
    if (err) {
      console.error('Error al escribir en el archivo:', err);
      return;
    }
    console.log('¡Archivo actualizado exitosamente!');
  });
});
