import { useState } from 'react';

// Para listas largas: enseña los primeros `limit` elementos y deja desplegar el resto.
// Lo usan las técnicas y las evoluciones (Agumon tiene más de 80 digievoluciones).
// Solo se guarda si está desplegada o no; la parte visible se calcula en cada render.
export function useShowMore(items, limit) {
  const [expanded, setExpanded] = useState(false);

  const visible = expanded ? items : items.slice(0, limit);

  return {
    visible,
    expanded,
    canExpand: items.length > limit,
    hiddenCount: items.length - limit,
    toggle: () => setExpanded(!expanded),
  };
}
