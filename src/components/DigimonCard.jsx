import DigimonImage from './DigimonImage.jsx';
import Tags from './Tags.jsx';

// Tarjeta del listado. Es un <button> entero para que se pueda abrir también con el teclado.
export default function DigimonCard({ digimon, onSelect }) {
  return (
    <button className="card" type="button" onClick={() => onSelect(digimon)}>
      <span className="card-number">Nº {digimon.id}</span>
      <DigimonImage className="card-img" src={digimon.image} alt="" />
      <span className="card-name">{digimon.name}</span>
      <Tags levels={digimon.levels} attributes={digimon.attributes} />
    </button>
  );
}
