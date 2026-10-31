// Configuración general de la app.
// Todo lo que se puede ajustar está aquí para no tener "números mágicos" repartidos por el código.

export const API_URL = 'https://digi-api.com/api/v1';

// Digimon que se piden por página (24 cuadra bien en rejillas de 2, 3, 4 y 6 columnas)
export const PAGE_SIZE = 24;

// Filtros sin aplicar: es el estado inicial del buscador y lo que se usa al limpiar
export const EMPTY_FILTERS = { name: '', level: '', attribute: '' };

// Digi-Equipo: máximo de Digimon y clave con la que se guarda en localStorage
export const TEAM_SIZE = 6;
export const TEAM_STORAGE_KEY = 'digiarchivo:equipo';

// Triángulo de atributos de Digimon: cada atributo tiene ventaja sobre otro.
// Vacuna gana a Virus, Virus gana a Datos y Datos gana a Vacuna.
export const ADVANTAGES = { Vaccine: 'Virus', Virus: 'Data', Data: 'Vaccine' };

// La API usa los nombres japoneses de los niveles. Clave = valor de la API, valor = texto en pantalla.
export const LEVELS = {
  'Baby I': 'Bebé I',
  'Baby II': 'Bebé II',
  Child: 'Infantil',
  Adult: 'Adulto',
  Perfect: 'Perfecto',
  Ultimate: 'Definitivo',
  Armor: 'Armadura',
  Hybrid: 'Híbrido',
  Unknown: 'Desconocido',
};

export const ATTRIBUTES = {
  Vaccine: 'Vacuna',
  Data: 'Datos',
  Virus: 'Virus',
  Free: 'Libre',
  Variable: 'Variable',
  Unknown: 'Desconocido',
  'No Data': 'Sin datos',
};
