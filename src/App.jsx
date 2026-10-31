import AppHeader from './components/AppHeader.jsx';
import AppFooter from './components/AppFooter.jsx';

export default function App() {
  return (
    <>
      <AppHeader />
      <main className="page">
        <p className="status">Aquí irá el listado de Digimon.</p>
      </main>
      <AppFooter />
    </>
  );
}
