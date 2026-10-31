import { useCallback } from 'react';
import AppHeader from './components/AppHeader.jsx';
import AppFooter from './components/AppFooter.jsx';
import { getDigimonPage } from './api/digimonApi.js';
import { useFetch } from './hooks/useFetch.js';
import { EMPTY_FILTERS } from './config.js';

export default function App() {
  // Prueba de la capa de datos: primera página sin filtros
  const loadPage = useCallback((signal) => getDigimonPage({ ...EMPTY_FILTERS, page: 0 }, signal), []);
  const { data, error, loading } = useFetch(loadPage);

  return (
    <>
      <AppHeader />
      <main className="page">
        {loading && <p className="status">Cargando Digimon…</p>}
        {error && <p className="status">{error.message}</p>}
        {data && (
          <ul>
            {data.digimons.map((digimon) => (
              <li key={digimon.id}>
                {digimon.name} · {digimon.levels.join(', ')} · {digimon.attributes.join(', ')}
              </li>
            ))}
          </ul>
        )}
      </main>
      <AppFooter />
    </>
  );
}
