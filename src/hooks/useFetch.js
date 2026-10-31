import { useEffect, useState } from 'react';

// Hook reutilizable para cargar datos asíncronos (lo usan el listado y la ficha).
//
// `request` es una función que recibe un AbortSignal y devuelve una promesa con los datos.
// Quien lo usa tiene que pasarla con useCallback: si fuera una función nueva en cada render,
// el efecto se volvería a ejecutar en cada render y pediría los datos sin parar.
export function useFetch(request) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // Solo sirve para "Reintentar": al cambiar este número el efecto se vuelve a ejecutar
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const result = await request(controller.signal);
        // Si mientras tanto se ha cancelado, esta respuesta ya no le interesa a nadie
        if (controller.signal.aborted) return;
        setData(result);
      } catch (err) {
        // Al cancelar, fetch lanza un AbortError: no es un fallo y ya hay otra carga en marcha
        if (controller.signal.aborted) return;
        setError(err);
      }
      setLoading(false);
    }

    load();

    // Limpieza: si cambia la petición (otra página, otro Digimon) o el componente se desmonta,
    // se cancela la anterior. Así una respuesta antigua nunca pisa a la nueva.
    return () => controller.abort();
  }, [request, attempt]);

  function retry() {
    setAttempt((n) => n + 1);
  }

  return { data, error, loading, retry };
}
