import { use, useState } from "react";
import Cabecera from "./componentes/Cabecera.jsx";
import { filtrarPorCasa, listarCasas } from "./logica.js";
import FiltroCasa from "./componentes/FiltroCasa.jsx";
import ListaPersonajes from "./componentes/ListaPersonajes.jsx";
import Estado from "./componentes/Estado.jsx";

export default function App({ promesa }) {
  const { datos, error } = use(promesa);
  const [casa, setCasa] = useState("");

  const personajes = datos ?? [];
  const casas = listarCasas(personajes);
  const visibles = filtrarPorCasa(personajes, casa);

  return (
    <>
      <Cabecera
        titulo="El mundo de Harry Potter"
        mostrados={visibles.length}
        total={personajes.length}
      >
        {datos && <FiltroCasa casas={casas} valor={casa} onCambio={setCasa} />}
      </Cabecera>

      <main>
        {error && <Estado tipo="error">⚠ {error}</Estado>}
        {datos && <ListaPersonajes personajes={visibles} />}
      </main>
    </>
  );
}