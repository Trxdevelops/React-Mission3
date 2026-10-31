import { useCallback, useRef } from 'react';
import AttributeStats from './AttributeStats.jsx';
import DigimonGrid from './DigimonGrid.jsx';
import Pagination from './Pagination.jsx';
import SkeletonGrid from './SkeletonGrid.jsx';
import StateMessage from './StateMessage.jsx';
import { getDigimonPage, getErrorMessage } from '../api/digimonApi.js';
import { useFetch } from '../hooks/useFetch.js';
import { describeFilters, hasFilters } from '../logic/digimon.js';
import { PAGE_SIZE } from '../config.js';

// Zona de resultados: pide la página que toca y decide qué enseñar (cargando, error, vacío o lista).
export default function ResultsPanel({ filters, page, onPageChange, onSelect }) {
  const headingRef = useRef(null);

  // useCallback hace que esta función solo cambie cuando cambian los filtros o la página.
  // useFetch la tiene como dependencia de su efecto, así que solo se vuelve a pedir cuando toca.
  const loadPage = useCallback((signal) => getDigimonPage({ ...filters, page }, signal), [filters, page]);
  const result = useFetch(loadPage);

  function changePage(newPage) {
    onPageChange(newPage);
    // Al cambiar de página llevamos el foco al título de los resultados: el navegador
    // hace scroll hasta él y quien usa lector de pantalla sabe dónde está.
    headingRef.current.focus();
  }

  return (
    <section className="results" aria-labelledby="results-title">
      <h2 id="results-title" className="results-title" ref={headingRef} tabIndex={-1}>
        Resultados
      </h2>
      <ResultsBody result={result} filters={filters} page={page} onSelect={onSelect} onPageChange={changePage} />
    </section>
  );
}

// Cada estado devuelve algo muy distinto, por eso se usa un if antes de cada return
function ResultsBody({ result, filters, page, onSelect, onPageChange }) {
  const { data, error, loading, retry } = result;

  if (loading) {
    return <SkeletonGrid />;
  }

  if (error) {
    return (
      <StateMessage
        isError
        title="No se han podido cargar los datos"
        text={getErrorMessage(error)}
        actionLabel="Reintentar"
        onAction={retry}
      />
    );
  }

  const { total, digimons } = data;

  if (digimons.length === 0) {
    return (
      <StateMessage
        title="Ningún Digimon coincide"
        text={
          hasFilters(filters)
            ? `No hay resultados con ${describeFilters(filters)}. Prueba con otro nombre o quita algún filtro.`
            : 'La Digi-API no ha devuelto ningún Digimon en esta página.'
        }
      />
    );
  }

  // Todo esto se deriva de la respuesta y de la página: nada de esto es estado
  const from = page * PAGE_SIZE + 1;
  const to = from + digimons.length - 1;
  const filtersText = hasFilters(filters) ? ` con ${describeFilters(filters)}` : '';
  const failed = digimons.filter((digimon) => !digimon.complete).length;

  let failedText = '';
  if (failed === 1) failedText = ' Una ficha no se ha podido cargar y se muestra con datos básicos.';
  if (failed > 1) failedText = ` ${failed} fichas no se han podido cargar y se muestran con datos básicos.`;

  return (
    <>
      <p className="status" role="status">
        Digimon {from}–{to} de {total}
        {filtersText}.{failedText}
      </p>
      <AttributeStats digimons={digimons} />
      <DigimonGrid digimons={digimons} onSelect={onSelect} />
      <Pagination page={page} isLastPage={to >= total} onChange={onPageChange} />
    </>
  );
}
