import { getAttributeStats } from '../logic/digimon.js';

// Reparto de atributos de la página actual, pintado como una fila de "píxeles" de LCD:
// un cuadradito por Digimon, del color de su atributo.
export default function AttributeStats({ digimons }) {
  // Valores derivados: se calculan en cada render a partir de la lista que llega por props.
  // No se guardan en el estado porque se pueden sacar siempre de `digimons`.
  const stats = getAttributeStats(digimons);
  const pixels = stats.flatMap((stat) =>
    Array.from({ length: stat.count }, (_, index) => ({ key: `${stat.key}-${index}`, color: stat.key })),
  );

  return (
    <section className="stats" aria-label="Resumen de atributos">
      <h3 className="stats-title">Atributos en esta página</h3>
      <div className="pixel-bar" aria-hidden="true">
        {pixels.map((pixel) => (
          <span key={pixel.key} className={`pixel attr-${pixel.color}`}></span>
        ))}
      </div>
      <ul className="legend">
        {stats.map((stat) => (
          <li key={stat.key}>
            <span className={`swatch attr-${stat.key}`} aria-hidden="true"></span>
            {stat.label} <strong>{stat.count}</strong>
          </li>
        ))}
      </ul>
    </section>
  );
}
