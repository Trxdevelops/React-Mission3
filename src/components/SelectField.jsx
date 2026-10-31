// Desplegable con su etiqueta. `options` es un objeto { valorApi: 'Texto en pantalla' }.
// La primera opción (valor vacío) significa "sin filtro".
export default function SelectField({ id, label, allLabel, options, value, onChange }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={onChange}>
        <option value="">{allLabel}</option>
        {Object.entries(options).map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </div>
  );
}
