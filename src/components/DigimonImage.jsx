import { useState } from 'react';
import placeholder from '../assets/digiegg.svg';

// Imagen de un Digimon con huevo de reserva si no hay imagen o si la URL falla.
// Se guarda QUÉ URL ha fallado y no un simple true/false: si el componente recibe otra
// imagen distinta, se vuelve a intentar sola sin tener que reiniciar ningún estado.
export default function DigimonImage({ src, alt, size = 320, className }) {
  const [brokenSrc, setBrokenSrc] = useState(null);
  const showPlaceholder = !src || src === brokenSrc;

  return (
    <img
      className={className}
      src={showPlaceholder ? placeholder : src}
      alt={alt}
      width={size}
      height={size}
      loading="lazy"
      onError={() => setBrokenSrc(src)}
    />
  );
}
