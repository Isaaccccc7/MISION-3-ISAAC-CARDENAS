# El mundo de Harry Potter

Misión M3 · Reactor Core — Web I

He creado en React 19 de mi app de la Misión 2, que consume la api
[PotterDB](https://api.potterdb.com/v1/) y muestra una tarjeta por personaje, con un 
filtro, que filtra por casa.

## Cómo probarlo
```
npm install
npm run dev
```
Abre http://localhost:5173 (claramente después de la ejecución de los dos comandos). La primera vez verás «Cargando personajes…» mientras se piden
todas las páginas de la API. Después los personajes se guardan en localStorage, así que las
siguientes cargas son casi instantáneas(suele tardar un poco, porque aunque esté en localStorage es mucha información). Para volver a ver la pantalla de carga, borra la clave del localStorage que es `PERSONAJES-HARRY-POTTER`

## Uso de IA
Usé Claude como pareja de programación para pasar mi Misión 2 (hecha con JavaScript sin React)
a React 19. Prompts reales que le hice:

1. "¿Cómo dividirías los componentes de mi web en elementos React?". Me propuso separar la interfaz en Tarjeta, ListaPersonajes, FiltroCasa y Estado, y dejar la llamada a la API (api.js) y el filtrado (logica.js) como módulos aparte. Mantuve esa división. Más tarde, saqué por comodidad  saqué el título y el contador a un componente Cabecera.
 
2. "¿Cuál sería la mejor forma de poner que estoy cargando los personajes, ya que con la promesa lo tengo que poner en el main?". Su primera propuesta cargaba los datos con useEffect y useState; decidí quitar el efecto (ya que el profesor dijo en clase que no es bueno el abuso de los hooks) y pedí otra solución, que fue usar el hook use con Suspense. Me explicó que la promesa tiene que crearse fuera del componente (en main.jsx) y que el Suspense debe estar en un componente padre del que llama a use.
 
3. "Ayuda sobre cómo mostrar los elementos HTML con el CSS". Me generó el style.css con la cabecera, el filtro, el contador, los mensajes de estado y una rejilla de tarjetas, muy básico para que yo más adelante lo pudiese adaptar a lo que quería.

## Autopsia
1. Cargo los datos con use y Suspense, y creo la promesa en main.jsx, en vez de cargarlos dentro de App con useEffect y useState. Descarté useEffect con useState porque obliga a guardar varios estados (datos, error y cargando) y a mantenerlos sincronizados entre sí. El precio es que la promesa se crea fuera de los componentes, porque si se creara dentro habría una promesa nueva en cada render, y que mientras carga no se ve ni el título, porque toda App queda suspendida. Además, el error no se lanza: lo convierto en datos (datos y error).

2. La lista filtrada y el contador se calculan en el render, no se guardan en estado. Descarté guardar la lista visible con useState y actualizarla cuando cambia la casa, porque serían dos fuentes de verdad que pueden desincronizarse. El precio es que el filtro se recalcula en cada render, algo que con unos miles de personajes no se nota.
