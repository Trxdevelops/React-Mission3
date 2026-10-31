// Acceso a la Digi-API (https://digi-api.com).
// Este módulo solo hace peticiones: no sabe nada de React ni de la interfaz.
import { API_URL, PAGE_SIZE } from '../config.js';
import { mergeDetails, normalizeDigimon, normalizeList } from '../logic/digimon.js';

// Error propio para distinguir los fallos de la API de los errores de programación
export class ApiError extends Error {
  constructor(message, status = 0) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

// Caché en memoria (URL -> JSON). Volver a una página o a una ficha ya vista no repite la petición.
// Se pierde al recargar, que es justo lo que queremos: así los datos nunca se quedan viejos.
const cache = new Map();

function getHttpErrorMessage(status) {
  // La Digi-API responde 400 cuando el Digimon no existe
  if (status === 400 || status === 404) {
    return `La Digi-API no ha encontrado lo que buscabas (error ${status}).`;
  }
  if (status === 429) {
    return 'Has hecho demasiadas peticiones seguidas. Espera un momento y vuelve a intentarlo.';
  }
  if (status >= 500) {
    return `La Digi-API tiene problemas ahora mismo (error ${status}). Prueba dentro de un rato.`;
  }
  return `La Digi-API ha respondido con un error inesperado (${status}).`;
}

// GET a una URL de la API: mira la caché, comprueba response.ok y devuelve el JSON.
// `signal` viene de un AbortController y permite cancelar la petición.
async function getJSON(url, signal) {
  if (cache.has(url)) return cache.get(url);

  let response;
  try {
    response = await fetch(url, { signal });
  } catch (error) {
    // Una cancelación hecha a propósito no es un fallo de red: se deja pasar tal cual
    if (error.name === 'AbortError') throw error;
    throw new ApiError('No se ha podido conectar con la Digi-API. Revisa tu conexión a internet.');
  }

  // fetch no rechaza la promesa con un 404 o un 500: hay que mirar response.ok a mano
  if (!response.ok) {
    throw new ApiError(getHttpErrorMessage(response.status), response.status);
  }

  const data = await response.json();
  cache.set(url, data);
  return data;
}

// Una página del listado, ya con nivel y atributo de cada Digimon.
// El listado solo trae nombre e imagen, así que después se piden las fichas en paralelo.
export async function getDigimonPage({ page, name, level, attribute }, signal) {
  const params = new URLSearchParams({ page, pageSize: PAGE_SIZE });
  if (name) params.set('name', name);
  if (level) params.set('level', level);
  if (attribute) params.set('attribute', attribute);

  const list = normalizeList(await getJSON(`${API_URL}/digimon?${params}`, signal));

  // Con allSettled, si una ficha falla no se pierden las demás
  const details = await Promise.allSettled(
    list.items.map((item) => getJSON(`${API_URL}/digimon/${item.id}`, signal)),
  );

  return { total: list.total, digimons: mergeDetails(list.items, details) };
}

// Ficha completa de un Digimon
export async function getDigimon(id, signal) {
  return normalizeDigimon(await getJSON(`${API_URL}/digimon/${id}`, signal));
}

// Los errores de la API ya traen un mensaje pensado para el usuario; el resto no
export function getErrorMessage(error) {
  return error instanceof ApiError ? error.message : 'Ha ocurrido un error inesperado al cargar los datos.';
}
