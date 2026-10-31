import ShowMoreButton from './ShowMoreButton.jsx';
import { useShowMore } from '../hooks/useShowMore.js';

const VISIBLE_SKILLS = 4;

export default function SkillList({ skills }) {
  // Los hooks van siempre antes de cualquier return (reglas de los hooks)
  const { visible, expanded, canExpand, hiddenCount, toggle } = useShowMore(skills, VISIBLE_SKILLS);

  if (skills.length === 0) {
    return <p className="muted">No hay técnicas registradas.</p>;
  }

  return (
    <>
      <ul className="skills">
        {visible.map((skill) => (
          <li key={skill.id}>
            <strong>{skill.name}</strong>
            {skill.translation && <span className="muted"> ({skill.translation})</span>}
            <span className="skill-text" lang="en">
              {skill.description}
            </span>
          </li>
        ))}
      </ul>
      {canExpand && <ShowMoreButton expanded={expanded} hiddenCount={hiddenCount} onToggle={toggle} />}
    </>
  );
}
