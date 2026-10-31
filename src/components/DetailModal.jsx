import { useCallback, useEffect, useRef } from 'react';
import DigimonDetail from './DigimonDetail.jsx';
import EvolutionTrail from './EvolutionTrail.jsx';
import LoadingMessage from './LoadingMessage.jsx';
import StateMessage from './StateMessage.jsx';
import TeamButton from './TeamButton.jsx';
import { getDigimon, getErrorMessage } from '../api/digimonApi.js';
import { useFetch } from '../hooks/useFetch.js';

// Ventana con la ficha del último Digimon del rastro.
// Solo existe mientras hay una ficha abierta: App la monta y la desmonta.
// El equipo vive en App; aquí solo llega si este Digimon está dentro, si está lleno y qué hacer al pulsar.
export default function DetailModal({ trail, onJump, onEvolution, onClose, inTeam, teamFull, onToggleTeam }) {
  const current = trail.at(-1);
  const closeButtonRef = useRef(null);
  const titleRef = useRef(null);

  const loadDigimon = useCallback((signal) => getDigimon(current.id, signal), [current.id]);
  const { data: digimon, error, loading, retry } = useFetch(loadDigimon);

  // La tecla Escape cierra la ficha. El teclado es algo externo a React (document),
  // así que nos suscribimos en un efecto y quitamos el listener en la limpieza.
  // Depende de onClose: si App le pasa otra función, se cambia el listener por el nuevo.
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Al abrir: el foco pasa al botón "Cerrar" y la página de detrás deja de hacer scroll.
  // Al cerrar (desmontar), la limpieza devuelve el scroll. [] = solo al montar y desmontar.
  useEffect(() => {
    closeButtonRef.current.focus();
    document.body.classList.add('modal-open');
    return () => document.body.classList.remove('modal-open');
  }, []);

  // Cada vez que se termina de cargar un Digimon (por ejemplo, al saltar a una evolución
  // desde abajo del todo), el foco va a su nombre: la ventana sube hasta él y el lector de
  // pantalla anuncia el Digimon nuevo. Es un efecto porque los datos llegan solos, sin que
  // haya un evento del usuario en ese momento.
  useEffect(() => {
    if (!loading && digimon) titleRef.current.focus();
  }, [loading, digimon]);

  return (
    // Clic en el fondo oscuro = cerrar. Dentro de la ficha se corta la propagación
    // para que un clic en su contenido no llegue al fondo.
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={`Ficha de ${current.name}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-bar">
          {trail.length > 1 && <EvolutionTrail trail={trail} onJump={onJump} />}
          <button ref={closeButtonRef} className="button button-ghost modal-close" type="button" onClick={onClose}>
            Cerrar
          </button>
        </div>

        <div className="modal-body">
          {loading && <LoadingMessage text="Analizando los datos del Digimon…" />}
          {!loading && error && (
            <StateMessage
              isError
              title="No se ha podido cargar la ficha"
              text={getErrorMessage(error)}
              actionLabel="Reintentar"
              onAction={retry}
            />
          )}
          {!loading && digimon && (
            <DigimonDetail
              digimon={digimon}
              evolving={trail.length > 1}
              onEvolution={onEvolution}
              titleRef={titleRef}
            >
              <TeamButton inTeam={inTeam} teamFull={teamFull} onToggle={() => onToggleTeam(digimon)} />
            </DigimonDetail>
          )}
        </div>
      </div>
    </div>
  );
}
