const DATOS = [
  ["Nacimiento", "nacimiento"],
  ["Fallecimiento", "fallecimiento"],
  ["Género", "genero"],
  ["Especie", "especie"],
  ["Altura", "altura"],
  ["Peso", "peso"],
  ["Pelo", "pelo"],
  ["Ojos", "ojos"],
  ["Piel", "piel"],
  ["Estatus de sangre", "sangre"],
  ["Estado civil", "estadoCivil"],
  ["Nacionalidad", "nacionalidad"],
  ["Animago", "animago"],
  ["Boggart", "boggart"],
  ["Casa", "casa"],
  ["Patronus", "patronus"],
];

export default function Tarjeta({ personaje }) {
  return (
    // data-casa permite al CSS colorear el borde según la casa.
    <article className="tarjeta" data-casa={personaje.casa}>
      {personaje.imagen && (
        <img src={personaje.imagen} alt={personaje.nombre} loading="lazy" />
      )}
      <h2>{personaje.nombre}</h2>
      <dl>
        {DATOS.map(([etiqueta, clave]) => (
          <div key={clave}>
            <dt>{etiqueta}</dt>
            <dd>{personaje[clave]}</dd>
          </div>
        ))}
      </dl>
      {personaje.wiki && (
        <a href={personaje.wiki} target="_blank" rel="noopener noreferrer">
          Ver en la wiki
        </a>
      )}
    </article>
  );
}
