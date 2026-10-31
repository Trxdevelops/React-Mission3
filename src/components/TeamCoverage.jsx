import { getTeamCoverage, translateAttribute } from '../logic/digimon.js';

// Análisis del equipo con el triángulo de atributos (Vacuna > Virus > Datos > Vacuna).
// Todo se calcula a partir de los miembros: no hay ningún estado aquí.
export default function TeamCoverage({ members }) {
  const coverage = getTeamCoverage(members);
  const missing = coverage.find((item) => !item.covered);

  return (
    <div className="coverage">
      <ul className="coverage-list">
        {coverage.map((item) => (
          <li key={item.rival} className={item.covered ? 'coverage-item is-covered' : 'coverage-item'}>
            <span className={`swatch attr-${item.rival}`} aria-hidden="true"></span>
            Contra {translateAttribute(item.rival)}: <strong>{item.covered ? 'ventaja' : 'sin ventaja'}</strong>
          </li>
        ))}
      </ul>
      <p className="coverage-tip">
        {missing
          ? `Un Digimon ${translateAttribute(missing.counter)} te daría ventaja contra ${translateAttribute(missing.rival)}.`
          : '¡Equipo equilibrado! Tienes ventaja contra los tres atributos del triángulo.'}
      </p>
    </div>
  );
}
