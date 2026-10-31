import { TEAM_SIZE } from '../config.js';

// Botón de la ficha para meter o sacar al Digimon del equipo.
// Si el equipo está lleno se desactiva, pero se explica por qué justo debajo.
export default function TeamButton({ inTeam, teamFull, onToggle }) {
  const blocked = !inTeam && teamFull;

  return (
    <div className="team-action">
      <button className={inTeam ? 'button button-ghost' : 'button'} type="button" disabled={blocked} onClick={onToggle}>
        {inTeam ? 'Quitar del Digi-Equipo' : 'Añadir al Digi-Equipo'}
      </button>
      {blocked && <p className="muted">Tu equipo ya está completo ({TEAM_SIZE} Digimon). Quita uno para hacer sitio.</p>}
    </div>
  );
}
