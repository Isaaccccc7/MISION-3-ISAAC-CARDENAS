export const filtrarPorCasa = (lista, casa) =>
  casa === "" ? lista : lista.filter((p) => p.casa === casa);

export const listarCasas = (lista) =>
  [...new Set(lista.map((p) => p.casa))].sort();
