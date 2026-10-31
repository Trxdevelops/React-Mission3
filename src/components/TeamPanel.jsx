import DigimonImage from './DigimonImage.jsx';
import TeamCoverage from './TeamCoverage.jsx';
import { TEAM_SIZE } from '../config.js';

// Panel del Digi-Equipo dentro de la carcasa: miembros, huecos libres y análisis del triángulo.
export default function TeamPanel({ members, onOpen, onRemove }) {
  // Huecos vacíos hasta llegar a TEAM_SIZE. Son decorativos y todos iguales: el índice vale como key.
  const emptySlots = Array.from({ length: TEAM_SIZE - members.length }, (_, index) => index);

  return (
    <section className="team" aria-labelledby="team-title">
      <div className="team-head">
        <h2 id="team-title" className="team-title">
          Digi-Equipo
        </h2>
        <span className="team-count">
          {members.length}/{TEAM_SIZE}
        </span>
      </div>

      <ul className="team-slots">
        {members.map((member) => (
          <li key={member.id} className="team-slot">
            <button className="team-member" type="button" onClick={() => onOpen(member)}>
              <DigimonImage src={member.image} alt="" size={72} />
              <span className="team-name">{member.name}</span>
            </button>
            <button
              className="team-remove"
              type="button"
              aria-label={`Quitar a ${member.name} del equipo`}
              onClick={() => onRemove(member.id)}
            >
              ×
            </button>
          </li>
        ))}
        {emptySlots.map((slot) => (
          <li key={`empty-${slot}`} className="team-slot team-slot-empty" aria-hidden="true"></li>
        ))}
      </ul>

      {members.length === 0 ? (
        <p className="team-hint">Abre la ficha de un Digimon y pulsa «Añadir al Digi-Equipo».</p>
      ) : (
        <TeamCoverage members={members} />
      )}
    </section>
  );
}
