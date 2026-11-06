# Clase 12: React useContext (Estado Global)

Implementación del estado global transversal en la Librería React utilizando el hook `useContext` según los conceptos de la Clase 12.

## Características implementadas

- **`BusquedaContext` (`src/context/BusquedaContext.tsx`)**:
  - `createContext` para el estado global del filtro de búsqueda.
  - `BusquedaProvider` que encapsula el estado `filtro` y `setFiltro`.
  - Custom hook `useBusqueda()` con validación dentro del Provider.
- **`Header` (`src/components/Layout/Header.tsx`)**:
  - Escribe el término de búsqueda en el contexto global en tiempo real.
  - Navega programáticamente hacia el catálogo (`useNavigate`) al enviar la búsqueda.
- **`Catalogo` (`src/pages/Catalogo.tsx`)**:
  - Consume el término `filtro` desde `useBusqueda()`.
  - Filtro reactivo en memoria por título y autor sobre los datos de `useFetch`.
  - Contador dinámico de resultados y alerta ante búsquedas sin coincidencias.
