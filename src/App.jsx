import { useState } from 'react';
import AppHeader from './components/AppHeader.jsx';
import AppFooter from './components/AppFooter.jsx';
import DetailModal from './components/DetailModal.jsx';
import ResultsPanel from './components/ResultsPanel.jsx';
import SearchForm from './components/SearchForm.jsx';
import { EMPTY_FILTERS } from './config.js';

export default function App() {
  // Filtros aplicados y página: los comparten el buscador y el listado, por eso viven aquí
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [page, setPage] = useState(0);

  // Rastro de Digimon abiertos en la ficha ({ id, name }). El último es el que se ve.
  // No hay un estado "ficha abierta": está abierta si el rastro tiene algo.
  const [trail, setTrail] = useState([]);

  function search(newFilters) {
    setFilters(newFilters);
    setPage(0); // una búsqueda nueva siempre empieza en la primera página
  }

  // Abrir desde el listado: empieza un rastro nuevo
  function openDetail(digimon) {
    setTrail([{ id: digimon.id, name: digimon.name }]);
  }

  // Volver a un paso anterior del rastro (se quitan los que había después)
  function jumpTo(index) {
    setTrail(trail.slice(0, index + 1));
  }

  // Saltar a una evolución desde la ficha. Si ya estaba en el rastro, se vuelve a ese
  // punto en vez de añadirla otra vez: así no hay ciclos (Agumon › Greymon › Agumon...)
  function openEvolution(evolution) {
    const index = trail.findIndex((step) => step.id === evolution.id);
    if (index !== -1) {
      jumpTo(index);
      return;
    }
    setTrail([...trail, { id: evolution.id, name: evolution.name }]);
  }

  function closeDetail() {
    setTrail([]);
  }

  return (
    <>
      <AppHeader />

      <main className="page">
        <SearchForm filters={filters} onSearch={search} />
        <ResultsPanel filters={filters} page={page} onPageChange={setPage} onSelect={openDetail} />
      </main>

      <AppFooter />

      {trail.length > 0 && (
        <DetailModal trail={trail} onJump={jumpTo} onEvolution={openEvolution} onClose={closeDetail} />
      )}
    </>
  );
}
