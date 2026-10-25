
export default function Estado({ tipo = "info", children }) {
  return <p className={`estado ${tipo}`}>{children}</p>;
}
