import { useState } from 'react';
import AppHeader from './components/AppHeader.jsx';
import AppFooter from './components/AppFooter.jsx';
import SearchForm from './components/SearchForm.jsx';
import ResultsPanel from './components/ResultsPanel.jsx';
import { EMPTY_FILTERS } from './config.js';

export default function App() {
  // Filtros aplicados y página: los comparten el buscador y el listado, por eso viven aquí
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState(null);

  function search(newFilters) {
    setFilters(newFilters);
    setPage(0); // una búsqueda nueva siempre empieza en la primera página
  }

  return (
    <>
      <AppHeader />
      <main className="page">
        <SearchForm filters={filters} onSearch={search} />
        {selected && <p className="status">Has elegido a {selected.name}. La ficha llega en la siguiente fase.</p>}
        <ResultsPanel filters={filters} page={page} onPageChange={setPage} onSelect={setSelected} />
      </main>
      <AppFooter />
    </>
  );
}
