import Tarjeta from "./Tarjeta.jsx";
import Estado from "./Estado.jsx";

export default function ListaPersonajes({ personajes }) {
  if (personajes.length === 0) {
    return <Estado>No hay resultados para esta casa.</Estado>;
  }

  return (
    <section className="lista">
      {personajes.map((personaje) => (
        <Tarjeta key={personaje.id} personaje={personaje} />
      ))}
    </section>
  );
}
