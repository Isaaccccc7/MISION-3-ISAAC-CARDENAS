// Mensaje de carga, error o vacío. El texto llega como children.
export default function Estado({ tipo = "info", children }) {
  return <p className={`estado ${tipo}`}>{children}</p>;
}
