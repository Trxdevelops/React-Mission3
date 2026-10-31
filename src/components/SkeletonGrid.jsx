import { PAGE_SIZE } from '../config.js';

// Huecos "fantasma" mientras llega una página. Esta lista nunca cambia ni se reordena
// (siempre son PAGE_SIZE huecos iguales), así que aquí el índice sí vale como key.
const SLOTS = Array.from({ length: PAGE_SIZE }, (_, index) => index);

export default function SkeletonGrid() {
  return (
    <ul className="grid" aria-hidden="true">
      {SLOTS.map((slot) => (
        <li key={slot} className="card card-skeleton">
          <span className="skeleton-block skeleton-img"></span>
          <span className="skeleton-block skeleton-line"></span>
          <span className="skeleton-block skeleton-line short"></span>
        </li>
      ))}
    </ul>
  );
}
