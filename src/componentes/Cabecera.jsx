export default function Cabecera({ titulo, mostrados, total, children }) {
  return (
    <header className="cabecera">
      <h1>{titulo}</h1>
      {children}
      {total > 0 && (
        <p className="contador">
          Mostrando {mostrados} de {total} personajes
        </p>
      )}
    </header>
  );
}