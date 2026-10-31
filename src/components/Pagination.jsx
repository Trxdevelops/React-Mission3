// Paginación sencilla. No guarda nada: la página actual la decide quien la usa.
export default function Pagination({ page, isLastPage, onChange }) {
  return (
    <nav className="pagination" aria-label="Paginación">
      <button className="button" type="button" disabled={page === 0} onClick={() => onChange(page - 1)}>
        Anterior
      </button>
      <span className="page-info">Página {page + 1}</span>
      <button className="button" type="button" disabled={isLastPage} onClick={() => onChange(page + 1)}>
        Siguiente
      </button>
    </nav>
  );
}
