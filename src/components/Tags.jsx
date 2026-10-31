import { attributeColor, translateAttribute, translateLevel } from '../logic/digimon.js';

// Etiquetas de nivel y atributo. Se usan en las tarjetas y en la ficha.
// Sin título al lado, "Desconocido" a secas sería ambiguo: por eso "Sin nivel" / "Sin atributo".
export default function Tags({ levels, attributes }) {
  const levelList = levels.length > 0 ? levels : ['Unknown'];
  const attributeList = attributes.length > 0 ? attributes : ['Unknown'];

  return (
    <span className="tags">
      {levelList.map((level) => (
        <span key={level} className="tag">
          {level === 'Unknown' ? 'Sin nivel' : translateLevel(level)}
        </span>
      ))}
      {attributeList.map((attribute) => (
        <span key={attribute} className="tag">
          <span className={`swatch attr-${attributeColor(attribute)}`} aria-hidden="true"></span>
          {attribute === 'Unknown' ? 'Sin atributo' : translateAttribute(attribute)}
        </span>
      ))}
    </span>
  );
}
