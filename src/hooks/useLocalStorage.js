import { useEffect, useState } from 'react';

// Lee un valor de localStorage. Si no hay nada guardado, o lo guardado no es JSON válido
// (o el navegador no deja usar localStorage), devuelve el valor inicial.
function readStorage(key, initialValue) {
  try {
    const saved = localStorage.getItem(key);
    return saved === null ? initialValue : JSON.parse(saved);
  } catch {
    return initialValue;
  }
}

// Igual que useState, pero el valor se guarda en localStorage y sobrevive a recargar la página.
export function useLocalStorage(key, initialValue) {
  // useState solo usa el valor inicial en el primer render; en los demás lo ignora.
  // readStorage se llama en cada render, pero es una lectura pequeña (un equipo de 6 como mucho).
  const [value, setValue] = useState(readStorage(key, initialValue));

  // localStorage es un sistema externo a React: guardarlo cuando cambia el valor es un efecto.
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Sin espacio o en modo privado: la app sigue funcionando, solo que sin guardar
    }
  }, [key, value]);

  return [value, setValue];
}
