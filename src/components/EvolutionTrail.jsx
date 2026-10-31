// Rastro de digievoluciones: Agumon › Greymon › MetalGreymon.
// Cada paso anterior es un botón para volver a él; el último es el Digimon que se está viendo.
export default function EvolutionTrail({ trail, onJump }) {
  return (
    <nav className="trail" aria-label="Rastro de digievoluciones">
      <ol>
        {/* App no deja que un Digimon se repita en el rastro, así que su id sirve de key */}
        {trail.map((step, index) => (
          <li key={step.id}>
            {index === trail.length - 1 ? (
              <span aria-current="step">{step.name}</span>
            ) : (
              <button className="trail-step" type="button" onClick={() => onJump(index)}>
                {step.name}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
