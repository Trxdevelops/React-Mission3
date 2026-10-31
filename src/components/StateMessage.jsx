// Mensaje para los estados de error y de "no hay resultados".
// El botón solo aparece si se le pasa un texto (Reintentar, Limpiar filtros...).
// Los errores llevan role="alert" para que el lector de pantalla los anuncie al aparecer.
export default function StateMessage({ title, text, isError = false, actionLabel, onAction }) {
  return (
    <div className={isError ? 'state state-error' : 'state'} role={isError ? 'alert' : undefined}>
      <h3 className="state-title">{title}</h3>
      <p>{text}</p>
      {actionLabel && (
        <button className="button" type="button" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
