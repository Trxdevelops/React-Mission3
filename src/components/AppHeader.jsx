// Cabecera con forma de "carcasa" de mascota virtual. Lo que va dentro (children)
// se pinta debajo de la pantalla, así App decide qué meter ahí.
export default function AppHeader({ children }) {
  return (
    <header className="shell">
      <div className="screen">
        <div className="screen-text">
          <h1 className="logo">DigiArchivo</h1>
          <p className="intro">
            Explora los Digimon de la Digi-API: búscalos por nombre, filtra por nivel y atributo, sigue sus
            digievoluciones y arma tu propio Digi-Equipo.
          </p>
        </div>
        <svg className="egg" viewBox="0 0 16 17" shapeRendering="crispEdges" aria-hidden="true">
          <path d="M6 0h4v1h-4zM4 1h2v1h-2zM10 1h2v1h-2zM3 2h1v1h-1zM12 2h1v1h-1zM2 3h1v1h-1zM13 3h1v1h-1zM2 4h1v1h-1zM6 4h2v1h-2zM13 4h1v1h-1zM1 5h1v1h-1zM6 5h2v1h-2zM10 5h2v1h-2zM14 5h1v1h-1zM1 6h1v1h-1zM10 6h2v1h-2zM14 6h1v1h-1zM1 7h1v1h-1zM14 7h1v1h-1zM0 8h1v1h-1zM3 8h1v1h-1zM7 8h1v1h-1zM11 8h1v1h-1zM15 8h1v1h-1zM0 9h1v1h-1zM2 9h1v1h-1zM4 9h1v1h-1zM6 9h1v1h-1zM8 9h1v1h-1zM10 9h1v1h-1zM12 9h1v1h-1zM14 9h2v1h-2zM0 10h2v1h-2zM5 10h1v1h-1zM9 10h1v1h-1zM13 10h1v1h-1zM15 10h1v1h-1zM0 11h1v1h-1zM15 11h1v1h-1zM0 12h1v1h-1zM4 12h2v1h-2zM15 12h1v1h-1zM1 13h1v1h-1zM4 13h2v1h-2zM10 13h2v1h-2zM14 13h1v1h-1zM1 14h1v1h-1zM10 14h2v1h-2zM14 14h1v1h-1zM2 15h2v1h-2zM12 15h2v1h-2zM4 16h8v1h-8z" />
        </svg>
      </div>
      {children}
    </header>
  );
}
