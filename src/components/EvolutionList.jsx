import DigimonImage from './DigimonImage.jsx';
import ShowMoreButton from './ShowMoreButton.jsx';
import { useShowMore } from '../hooks/useShowMore.js';

const VISIBLE_EVOLUTIONS = 12;

// Evoluciones anteriores o siguientes. Al pulsar una se abre su ficha (y se añade al rastro).
export default function EvolutionList({ evolutions, emptyText, onSelect }) {
  const { visible, expanded, canExpand, hiddenCount, toggle } = useShowMore(evolutions, VISIBLE_EVOLUTIONS);

  if (evolutions.length === 0) {
    return <p className="muted">{emptyText}</p>;
  }

  return (
    <>
      <ul className="evo-list">
        {/* Las evoluciones repetidas ya se juntaron en logic/digimon.js, así que el id no se repite */}
        {visible.map((evolution) => (
          <li key={evolution.id}>
            <button className="evo" type="button" onClick={() => onSelect(evolution)}>
              <DigimonImage src={evolution.image} alt="" size={64} />
              <span className="evo-name">{evolution.name}</span>
              {evolution.conditions.length > 0 && (
                <span className="evo-condition" lang="en">
                  {evolution.conditions.join(' / ')}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
      {canExpand && <ShowMoreButton expanded={expanded} hiddenCount={hiddenCount} onToggle={toggle} />}
    </>
  );
}
