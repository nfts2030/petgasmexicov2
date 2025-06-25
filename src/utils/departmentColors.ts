// Mapeo de colores por departamento
export const departmentColors = {
  'Dirección General': '#0a4b2a',      // Verde PETGAS
  'Área Comercial': '#2e7d32',         // Verde más claro
  'Vinculación Global': '#1565c0',     // Azul
  'Área Legal': '#5e35b1',             // Púrpura
  'Tecnología': '#00838f',             // Verde azulado
  'Investigación': '#2e7d32',          // Verde esmeralda
  'Consejo Directivo': '#5d4037',      // Marrón
  'Petgas Oceans': '#006064',          // Verde azulado oscuro
  'Executiva International Partnerships': '#5d4037', // Marrón
  'Web3': '#6a1b9a'                    // Púrpura oscuro
} as const;

type DepartmentKey = keyof typeof departmentColors;

// Función para obtener el color del departamento
export const getDepartmentColor = (division: string): string => {
  // Buscar la clave que coincida con la división
  const department = Object.keys(departmentColors).find(dept => 
    division.toLowerCase().includes(dept.toLowerCase())
  ) as DepartmentKey | undefined;
  
  // Si no se encuentra una coincidencia exacta, buscar por palabra clave
  if (!department) {
    if (division.toLowerCase().includes('comercial')) return departmentColors['Área Comercial'];
    if (division.toLowerCase().includes('legal')) return departmentColors['Área Legal'];
    if (division.toLowerCase().includes('tecnol')) return departmentColors['Tecnología'];
    if (division.toLowerCase().includes('investigación') || division.toLowerCase().includes('quím')) return departmentColors['Investigación'];
    if (division.toLowerCase().includes('consejo')) return departmentColors['Consejo Directivo'];
    if (division.toLowerCase().includes('ocean')) return departmentColors['Petgas Oceans'];
    if (division.toLowerCase().includes('partnership') || division.toLowerCase().includes('alianza')) return departmentColors['Executiva International Partnerships'];
    if (division.toLowerCase().includes('web3') || division.toLowerCase().includes('blockchain')) return departmentColors['Web3'];
    
    // Si no se encuentra ninguna coincidencia, usar el color por defecto
    return '#0a4b2a';
  }
  
  return departmentColors[department];
};
