import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { obtenerPersonajes } from "./api.js";
import Estado from "./componentes/Estado.jsx";
import "./style.css";

const promesa = obtenerPersonajes().then(
  (datos) => ({ datos, error: null }),
  (e) => ({ datos: null, error: e.message })
);


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Suspense fallback={<Estado>Cargando personajes…</Estado>}>
    <App promesa={promesa} />
    </Suspense>
  </StrictMode>
);
