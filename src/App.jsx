import { useState, useEffect } from "react";
import { obtenerPersonajes } from "./api.js";
import { filtrarPorCasa, listarCasas } from "./logica.js";
import FiltroCasa from "./componentes/FiltroCasa.jsx";
import ListaPersonajes from "./componentes/ListaPersonajes.jsx";
import Estado from "./componentes/Estado.jsx";

export default function App() {
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState(null);
  const [casa, setCasa] = useState("");

  useEffect(() => {
    const controlador = new AbortController();

    obtenerPersonajes(controlador.signal)
      .then(setDatos)
      .catch((e) => {
        if (e.name !== "AbortError") setError(e.message);
      });

    return () => controlador.abort();
  }, []);

  const cargando = datos === null && error === null;
  const personajes = datos ?? [];
  const casas = listarCasas(personajes);
  const visibles = filtrarPorCasa(personajes, casa);

  return (
    <>
      <header className="cabecera">
        <h1>El mundo de Harry Potter</h1>
        {datos && (
          <>
            <FiltroCasa casas={casas} valor={casa} onCambio={setCasa} />
            <p className="contador">
              Mostrando {visibles.length} de {personajes.length} personajes
            </p>
          </>
        )}
      </header>

      <main>
        {cargando && <Estado>⏳ Cargando personajes…</Estado>}
        {error && <Estado tipo="error">⚠ {error}</Estado>}
        {datos && <ListaPersonajes personajes={visibles} />}
      </main>
    </>
  );
}