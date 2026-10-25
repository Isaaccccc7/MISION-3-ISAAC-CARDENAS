const API = "https://api.potterdb.com/v1";
const CLAVE_CACHE = "PERSONAJES-HARRY-POTTER";
const UN_DIA = 24 * 60 * 60 * 1000;

function leerCache() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_CACHE));
    const vigente = guardado && Date.now() - guardado.fecha < UN_DIA;
    return vigente ? guardado.personajes : null;
  } catch {
    return null;
  }
}

function guardarCache(personajes) {
  try {
    localStorage.setItem(
      CLAVE_CACHE,
      JSON.stringify({ fecha: Date.now(), personajes })
    );
  } catch {
  }
}

const transformar = ({ id, attributes: a }) => ({
  id,
  nombre: a.name,
  nacimiento: a.born ?? "Desconocido",
  fallecimiento: a.died ?? "Desconocido",
  genero: a.gender ?? "Desconocido",
  especie: a.species ?? "Desconocida",
  altura: a.height ?? "Desconocida",
  peso: a.weight ?? "Desconocido",
  pelo: a.hair_color ?? "Desconocido",
  ojos: a.eye_color ?? "Desconocido",
  piel: a.skin_color ?? "Desconocido",
  sangre: a.blood_status ?? "Desconocido",
  estadoCivil: a.marital_status ?? "Desconocido",
  nacionalidad: a.nationality ?? "Desconocida",
  animago: a.animagus ?? "Desconocido",
  boggart: a.boggart ?? "Desconocido",
  casa: a.house ?? "Sin casa",
  patronus: a.patronus ?? "Desconocido",
  imagen: a.image,
  wiki: a.wiki,
});


export async function obtenerPersonajes(signal) {
  const enCache = leerCache();
  if (enCache) return enCache;

  const personajes = [];
  let hayMas = true;
  let pagina = 1;

  while (hayMas) {
    const respuesta = await fetch(
      `${API}/characters?page[number]=${pagina}&page[size]=100`,
      { signal }
    );
    if (!respuesta.ok) {
      throw new Error(`HTTP ${respuesta.status}: ${respuesta.statusText}`);
    }

    const json = await respuesta.json();
    const datos = json.data ?? [];
    personajes.push(...datos.map(transformar));

    hayMas = Boolean(json.links?.next) && datos.length > 0;
    pagina++;
  }

  guardarCache(personajes);
  return personajes;
}
