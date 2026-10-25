// Desplegable controlado: su valor lo manda el estado del padre.
export default function FiltroCasa({ casas, valor, onCambio }) {
  return (
    <label className="filtro">
      Casa
      <select value={valor} onChange={(e) => onCambio(e.target.value)}>
        <option value="">Todas las casas</option>
        {casas.map((casa) => (
          <option key={casa} value={casa}>
            {casa}
          </option>
        ))}
      </select>
    </label>
  );
}
