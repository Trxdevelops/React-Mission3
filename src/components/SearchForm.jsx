import { useState } from 'react';
import SelectField from './SelectField.jsx';
import { ATTRIBUTES, EMPTY_FILTERS, LEVELS } from '../config.js';
import { hasFilters } from '../logic/digimon.js';

// Buscador. Los filtros que de verdad se aplican viven en App (los necesita el listado);
// aquí solo vive el texto que se va escribiendo, que no cuenta hasta pulsar "Buscar".
export default function SearchForm({ filters, onSearch }) {
  const [name, setName] = useState(filters.name);

  function handleSubmit(event) {
    event.preventDefault(); // sin esto el formulario recargaría la página
    onSearch({ ...filters, name: name.trim() });
  }

  // Los desplegables buscan en cuanto cambian, sin tener que pulsar "Buscar"
  function changeLevel(event) {
    onSearch({ ...filters, name: name.trim(), level: event.target.value });
  }

  function changeAttribute(event) {
    onSearch({ ...filters, name: name.trim(), attribute: event.target.value });
  }

  function clear() {
    setName('');
    onSearch(EMPTY_FILTERS);
  }

  return (
    <form className="toolbar" role="search" onSubmit={handleSubmit}>
      <div className="field field-name">
        <label htmlFor="search-name">Nombre</label>
        <input
          id="search-name"
          type="search"
          placeholder="Agumon, Gabumon…"
          autoComplete="off"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <SelectField
        id="filter-level"
        label="Nivel"
        allLabel="Todos los niveles"
        options={LEVELS}
        value={filters.level}
        onChange={changeLevel}
      />
      <SelectField
        id="filter-attribute"
        label="Atributo"
        allLabel="Todos los atributos"
        options={ATTRIBUTES}
        value={filters.attribute}
        onChange={changeAttribute}
      />

      <div className="toolbar-actions">
        <button className="button" type="submit">
          Buscar
        </button>
        {hasFilters(filters) && (
          <button className="button button-ghost" type="button" onClick={clear}>
            Limpiar filtros
          </button>
        )}
      </div>
    </form>
  );
}
