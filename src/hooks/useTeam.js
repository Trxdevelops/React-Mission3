import { useLocalStorage } from './useLocalStorage.js';
import { TEAM_SIZE, TEAM_STORAGE_KEY } from '../config.js';

// Lógica del Digi-Equipo. Se apoya en useLocalStorage para que el equipo no se pierda al recargar.
// Solo se guarda la lista de miembros; "lleno" y "¿está en el equipo?" se calculan a partir de ella.
export function useTeam() {
  const [members, setMembers] = useLocalStorage(TEAM_STORAGE_KEY, []);

  const isFull = members.length >= TEAM_SIZE;

  function isInTeam(id) {
    return members.some((member) => member.id === id);
  }

  function remove(id) {
    setMembers(members.filter((member) => member.id !== id));
  }

  // Del Digimon solo se guarda lo que necesitan el panel y el triángulo de atributos
  function toggle(digimon) {
    if (isInTeam(digimon.id)) {
      remove(digimon.id);
    } else if (!isFull) {
      const member = { id: digimon.id, name: digimon.name, image: digimon.image, attributes: digimon.attributes };
      setMembers([...members, member]);
    }
  }

  return { members, isFull, isInTeam, toggle, remove };
}
