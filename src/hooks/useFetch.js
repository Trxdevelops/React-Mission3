import { useEffect, useState } from 'react';

// Hook reutilizable para cargar datos asíncronos (lo usan el listado y la ficha).
//
// `request` es una función que recibe un AbortSignal y devuelve una promesa con los datos.
// Quien lo usa tiene que pasarla con useCallback: si fuera una función nueva en cada render,
// el efecto se volvería a ejecutar en cada render y pediría los datos sin parar.
export function useFetch(request) {
  // La respuesta se guarda junto a la petición (y el intento) que la ha producido
  const [result, setResult] = useState({ request: null, attempt: 0, data: null, error: null });
  // Solo sirve para "Reintentar": al cambiar este número el efecto se vuelve a ejecutar
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const data = await request(controller.signal);
        if (!controller.signal.aborted) setResult({ request, attempt, data, error: null });
      } catch (error) {
        // Al cancelar, fetch lanza un AbortError: no es un fallo, ya hay otra carga en marcha
        if (!controller.signal.aborted) setResult({ request, attempt, data: null, error });
      }
    }

    load();

    // Limpieza: si cambia la petición (otra página, otro Digimon) o el componente se desmonta,
    // se cancela la anterior. Así una respuesta antigua nunca pisa a la nueva.
    return () => controller.abort();
  }, [request, attempt]);

  // "Cargando" no es un estado aparte: se deriva. Si la respuesta guardada no es de la
  // petición actual, es que la buena todavía no ha llegado.
  const loading = result.request !== request || result.attempt !== attempt;

  function retry() {
    setAttempt((n) => n + 1);
  }

  return { data: result.data, error: result.error, loading, retry };
}
