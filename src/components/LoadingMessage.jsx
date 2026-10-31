// Mensaje de carga con tres "píxeles" que parpadean.
// role="status" hace que el lector de pantalla lo anuncie sin interrumpir.
export default function LoadingMessage({ text }) {
  return (
    <div className="state" role="status">
      <span className="pixel-loader" aria-hidden="true">
        <i></i>
        <i></i>
        <i></i>
      </span>
      <p>{text}</p>
    </div>
  );
}
