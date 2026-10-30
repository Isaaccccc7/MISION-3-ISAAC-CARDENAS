// src/misiones/quiz/Resultado.jsx
function mensajePorPorcentaje(pct) {
  if (pct === 100) return "¡Perfecto! Dominas los fundamentos.";

}























export default function Resultado({ puntos, total, onReiniciar }) {
  const pct = Math.round((puntos / total) * 100);

  return (
    <section className="resultado" aria-live="polite">
      <h2>
        {puntos} de {total} aciertos
      </h2>
      <p className="resultado__pct">{pct}%</p>
      <p>{mensajePorPorcentaje(pct)}</p>
      <button className="btn" onClick={onReiniciar}>
        Jugar otra vez
      </button>
    </section>
  );
}
