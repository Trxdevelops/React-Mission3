import DigimonImage from './DigimonImage.jsx';
import EvolutionList from './EvolutionList.jsx';
import SkillList from './SkillList.jsx';
import Tags from './Tags.jsx';

// Contenido de la ficha de un Digimon. Solo pinta: los datos le llegan ya cargados.
// `children` es lo que el padre quiera poner bajo los datos (por ejemplo, el botón del equipo).
// `titleRef` es una ref del padre para poder llevar el foco al nombre cuando cambia de Digimon.
export default function DigimonDetail({ digimon, evolving, onEvolution, titleRef, children }) {
  return (
    <article className="detail">
      <header className="detail-head">
        {/* is-evolving: la imagen aparece como silueta parpadeante, como una digievolución */}
        <div className={evolving ? 'detail-screen is-evolving' : 'detail-screen'}>
          <DigimonImage src={digimon.image} alt={digimon.name} />
        </div>

        <div className="detail-info">
          <p className="detail-number">Nº {digimon.id}</p>
          <h2 className="detail-title" ref={titleRef} tabIndex={-1}>
            {digimon.name}
          </h2>
          <Tags levels={digimon.levels} attributes={digimon.attributes} />
          <dl className="facts">
            <Fact label="Tipo">{digimon.types.join(', ') || 'Desconocido'}</Fact>
            <Fact label="Debut">{digimon.year || 'Desconocido'}</Fact>
            <Fact label="X-Antibody">{digimon.xAntibody ? 'Sí' : 'No'}</Fact>
            {digimon.fields.length > 0 && (
              <Fact label="Familias" wide>
                {digimon.fields.join(', ')}
              </Fact>
            )}
          </dl>
          {children}
        </div>
      </header>

      <DetailSection title="Descripción">
        <Description description={digimon.description} />
      </DetailSection>

      <DetailSection title="Técnicas">
        <SkillList skills={digimon.skills} />
      </DetailSection>

      <DetailSection title="Viene de">
        <EvolutionList
          evolutions={digimon.prior}
          emptyText="No viene de ningún Digimon registrado."
          onSelect={onEvolution}
        />
      </DetailSection>

      <DetailSection title="Digievoluciona a">
        <EvolutionList
          evolutions={digimon.next}
          emptyText="No tiene digievoluciones registradas."
          onSelect={onEvolution}
        />
      </DetailSection>
    </article>
  );
}

// Componentes pequeños que solo usa la ficha: viven en el mismo fichero

function DetailSection({ title, children }) {
  return (
    <section className="detail-section">
      <h3>{title}</h3>
      {children}
    </section>
  );
}

function Fact({ label, wide = false, children }) {
  return (
    <div className={wide ? 'fact fact-wide' : 'fact'}>
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

// El texto llega de la API, pero JSX lo escapa al pintarlo: aunque trajera etiquetas HTML,
// se verían como texto y nunca se ejecutarían (por eso ya no hace falta el escapeHTML de la M2).
function Description({ description }) {
  if (!description) {
    return <p className="muted">La Digi-API no tiene descripción para este Digimon.</p>;
  }

  return (
    <>
      <p lang={description.lang}>{description.text}</p>
      <p className="note">
        {description.lang === 'ja' ? 'Solo está disponible en japonés.' : 'Texto original en inglés.'}
      </p>
    </>
  );
}
