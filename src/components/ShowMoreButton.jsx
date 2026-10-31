// Botón de "Ver N más / Ver menos" que acompaña a useShowMore
export default function ShowMoreButton({ expanded, hiddenCount, onToggle }) {
  return (
    <button className="show-more" type="button" aria-expanded={expanded} onClick={onToggle}>
      {expanded ? 'Ver menos' : `Ver ${hiddenCount} más`}
    </button>
  );
}
