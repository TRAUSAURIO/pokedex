
# Pokédex App

Aplicación web tipo Pokédex desarrollada con **React**, **TypeScript**, **Vite** y **Axios**, consumiendo datos reales desde [PokéAPI](https://pokeapi.co/).

## 📋 Funcionalidades Implementadas

### Obligatorias
- ✅ **Búsqueda de Pokémon**: Busca cualquier Pokémon por nombre con validación de campo vacío.
- ✅ **Información detallada**: Muestra imagen oficial, nombre, ID, altura, peso, tipos, experiencia base y habilidades.
- ✅ **Favoritos con useContext**: Agrega, elimina y limpia favoritos usando contexto global.
- ✅ **FavoritesList.tsx**: Componente dedicado que muestra favoritos con imagen, nombre, botón de eliminar y botón "Limpiar favoritos".
- ✅ **Manejo de estados**: Texto de búsqueda, Pokémon encontrado, estado de carga, mensajes de error y lista de favoritos.
- ✅ **Consumo de API con Axios**: Servicio separado en `src/services/pokemonService.ts`.
- ✅ **Uso de TypeScript**: Interfaces y tipos definidos para Pokémon, favoritos, props y contexto.

### Mejora Adicional (Opción D + extras)
- ✅ **Persistencia con localStorage**: Los favoritos se guardan automáticamente y persisten al recargar la página.
- ✅ **Botón Pokémon aleatorio**: Botón 🎲 que obtiene un Pokémon aleatorio (ID entre 1 y 150).
- ✅ **Historial de búsquedas**: Muestra las últimas 5 búsquedas realizadas.
- ✅ **Filtro de favoritos**: Campo de búsqueda para filtrar favoritos por nombre.

### Retos Avanzados
- ✅ **Colores por tipo**: Cada tipo de Pokémon tiene su color distintivo.
- ✅ **Animación de carga**: Pokéball animada y spinner mientras se cargan los datos.
- ✅ **Estadísticas del Pokémon**: Visualización de stats con barras de progreso.
- ✅ **CSS Grid / Flexbox**: Diseño responsivo y moderno.
- ✅ **Modo oscuro**: Tema oscuro nativo.
- ✅ **Componentes reutilizables**: LoadingSpinner, mensajes de error y carga.

## 🚀 Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

La aplicación se ejecuta en:
```
http://localhost:5173
```

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── FavoritesList.tsx      # Lista de Pokémon favoritos
│   ├── LoadingSpinner.tsx      # Componente de carga reutilizable
│   ├── Pagination.tsx          # Paginación del listado
│   ├── PokemonCard.tsx         # Tarjeta individual de Pokémon
│   ├── PokemonDetail.tsx       # Modal con detalle completo
│   ├── PokemonGrid.tsx         # Grid de tarjetas
│   ├── PokemonSearch.tsx       # Búsqueda dedicada con historial
│   ├── SearchBar.tsx           # Barra de búsqueda general
│   └── TypeFilter.tsx          # Filtro por tipo
├── context/
│   └── PokemonContext.tsx      # Contexto global de favoritos + localStorage
├── hooks/
│   ├── useDebounce.ts          # Hook para debounce
│   ├── usePokemonDetail.ts     # Hook para detalle de Pokémon
│   └── usePokemonList.ts       # Hook para listado de Pokémon
├── services/
│   └── pokemonService.ts       # Servicio de API con Axios
├── types/
│   └── pokemon.ts              # Interfaces y tipos de TypeScript
├── App.tsx                     # Componente principal
├── App.css                     # Estilos de la aplicación
├── index.css                   # Estilos globales
└── main.tsx                    # Punto de entrada
```

## 🔧 Tecnologías

- **React 19** con TypeScript
- **Vite** para el build
- **Axios** para peticiones HTTP
- **PokéAPI** como fuente de datos
- **CSS moderno** con variables, grid, flexbox, animaciones y glassmorphism


## 💭 Preguntas de Reflexión

### ¿Para qué sirve useState en este proyecto?
`useState` se utiliza para manejar el estado local de los componentes, como el texto de búsqueda, el Pokémon encontrado, el estado de carga, los mensajes de error, la página actual, el filtro de tipo, y el texto de filtro de favoritos. Permite que los componentes reaccionen a los cambios de estado y se actualicen automáticamente en la interfaz.

### ¿Para qué sirve useContext?
`useContext` se utiliza para manejar el estado global de los favoritos, permitiendo que cualquier componente (PokemonSearch, FavoritesList, App) acceda y modifique la lista de favoritos sin tener que pasar props manualmente a través de múltiples niveles. Esto mantiene el código más limpio y facilita la propagación de cambios.

### ¿Por qué se separó el consumo de la API en un archivo de servicio?
Separar el consumo de la API en `pokemonService.ts` proporciona varias ventajas:
- **Reutilización**: Los mismos métodos pueden ser usados desde cualquier componente o hook.
- **Mantenibilidad**: Si la API cambia, solo se modifica un archivo.
- **Testeabilidad**: Los servicios son más fáciles de mockear y probar.
- **Separación de responsabilidades**: Los componentes visuales no necesitan saber cómo se obtienen los datos.

### ¿Qué ventaja ofrece TypeScript frente a JavaScript en este proyecto?
TypeScript ofrece:
- **Tipado estático**: Detecta errores en tiempo de compilación en lugar de en ejecución.
- **Autocompletado**: Mejor experiencia de desarrollo con sugerencias precisas.
- **Documentación viva**: Las interfaces y tipos sirven como documentación del código.
- **Refactorización segura**: Los cambios en tipos se propagan y generan errores si algo queda inconsistente.
- **Menos bugs**: Previene errores comunes como acceder a propiedades inexistentes o pasar tipos incorrectos.

### ¿Qué mejora adicional implementaste y por qué?
Se implementó la **Opción D: Persistencia con localStorage** como mejora principal, combinada con elementos de las otras opciones:
- **localStorage**: Los favoritos se guardan automáticamente y persisten al recargar la página.
- **Botón de Pokémon aleatorio**: Permite explorar Pokémon al azar de forma divertida.
- **Historial de búsquedas**: Muestra las últimas 5 búsquedas para acceso rápido.
- **Filtro de favoritos**: Permite buscar dentro de la lista de favoritos.

Elegí combinar estas funcionalidades porque ofrecen la mejor experiencia de usuario y demuestran dominio de múltiples conceptos de React y TypeScript.

## 📦 Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Compila el proyecto para producción |
| `npm run preview` | Previsualiza la build de producción |
| `npm run lint` | Ejecuta el linter |

## 📝 Notas

- La PokéAPI tiene datos en inglés, los nombres se muestran en minúsculas por defecto de la API.
- El proyecto usa el tema oscuro como diseño principal.
- Los favoritos se almacenan en `localStorage` con la clave `pokedex-favorites`.
- No incluye la carpeta `node_modules` en la entrega.
-
## Capturas de Pantalla
Agrega aquí las imágenes del funcionamiento de la aplicación.
<img width="1346" height="666" alt="image" src="https://github.com/user-attachments/assets/7f264274-7d08-46a3-9135-8e19facc4ad7" />

<img width="1362" height="670" alt="image" src="https://github.com/user-attachments/assets/bfd3f27c-6ecc-4c6a-8ca1-baf211b744cc" />

<img width="1310" height="618" alt="image" src="https://github.com/user-attachments/assets/3aedbc6d-f099-4687-a66e-755174e5f022" />

=======
# pokedex
