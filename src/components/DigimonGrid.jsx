import DigimonCard from './DigimonCard.jsx';

export default function DigimonGrid({ digimons, onSelect }) {
  return (
    <ul className="grid">
      {/* El id de la API es estable y único: buena key aunque la lista cambie de página o de filtro */}
      {digimons.map((digimon) => (
        <li key={digimon.id}>
          <DigimonCard digimon={digimon} onSelect={onSelect} />
        </li>
      ))}
    </ul>
  );
}
