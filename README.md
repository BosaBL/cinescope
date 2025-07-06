# CineScope 🎬

¡Bienvenido a CineScope! Este proyecto es una aplicación web moderna que te permite descubrir, buscar y guardar tus películas favoritas en una lista personal. 🍿

## 🚀 Resumen del Proyecto

CineScope es una aplicación web interactiva diseñada para los amantes del cine. Con una interfaz de usuario limpia y fácil de usar, puedes explorar una vasta colección de películas, ver detalles como la sinopsis, el reparto y la calificación, y añadirlas a tu propia lista de seguimiento.

### ✨ Rutas de la Aplicación

La aplicación cuenta con las siguientes rutas principales, gestionadas con **TanStack Router**:

- **`/` (Inicio)**: La página principal que muestra las películas populares. Permite a los usuarios descubrir y buscar películas.
- **`/details/$movieId`**: Muestra los detalles completos de una película específica, incluyendo su sinopsis, reparto y calificación.
- **`/watchList`**: Una lista personal donde los usuarios pueden ver las películas que han guardado.

### 🎬 Uso de The Movie Database (TMDb)

CineScope utiliza la **API de The Movie Database (TMDb)** como fuente principal para obtener toda la información relacionada con las películas. La interacción con la API está centralizada en el servicio `src/services/tmdb/index.ts`, que se encarga de realizar las siguientes operaciones:

- **Descubrir Películas**: Obtiene una lista de películas populares y tendencias.
- **Buscar Películas**: Permite a los usuarios buscar películas por título.
- **Detalles de la Película**: Recupera información detallada de una película específica.
- **Obtener Géneros**: Carga la lista de géneros disponibles para filtrar las películas.

### ✨ Características Principales

- **Explora Películas**: Descubre películas populares y tendencias.
- **Búsqueda Avanzada**: Encuentra películas por título, año de lanzamiento y más.
- **Detalles de la Película**: Obtén información completa sobre cada película.
- **Lista de Seguimiento**: Guarda tus películas favoritas para verlas más tarde.
- **Diseño Responsivo**: Disfruta de una experiencia perfecta en cualquier dispositivo.

## 🛠️ Cómo Instalar

Para empezar a usar CineScope, sigue estos sencillos pasos:

1. **Clona el Repositorio**:

   ```bash
   git clone https://github.com/BosaBL/cinescope.git
   cd cinescope
   ```

2. **Instala las Dependencias**:
   Asegúrate de tener [Node.js](https://nodejs.org/) y [pnpm](https://pnpm.io/) instalados.

   ```bash
   pnpm install
   ```

3. **Configura las Variables de Entorno**:
   Crea un archivo `.env` en la raíz del proyecto y añade tu clave de API de [The Movie Database (TMDb)](https://www.themoviedb.org/):

   ```
   VITE_API_KEY=tu_clave_de_api_de_tmdb
   ```

4. **Inicia la Aplicación**:

   ```bash
   pnpm dev
   ```

   ¡Y listo! La aplicación estará disponible en `http://localhost:3000`.

## 🚀 Probando el Build de Producción

Para probar la versión de producción de la aplicación, puedes seguir estos pasos:

1. **Genera el Build**:
   Este comando compilará y optimizará los archivos de la aplicación para producción en el directorio `dist/`.

   ```bash
   pnpm build
   ```

2. **Sirve el Build Localmente**:
   Este comando iniciará un servidor local para servir los archivos estáticos generados en el paso anterior.

   ```bash
   pnpm serve
   ```

   La aplicación estará disponible en la URL que se muestre en la terminal (generalmente `http://localhost:4173`).

## 🔧 Detalles Técnicos

### 🏗️ Arquitectura

CineScope está construido con una arquitectura de componentes moderna, utilizando **React** y **Vite** para un desarrollo rápido y eficiente. La gestión del estado se maneja a través de hooks de React y el enrutamiento se gestiona con **TanStack Router**, lo que permite una navegación fluida y optimizada.

### 💻 Tecnologías Principales

- **Frontend**:
  - [React](https://reactjs.org/)
  - [Vite](https://vitejs.dev/)
  - [TypeScript](https://www.typescriptlang.org/)
- **Enrutamiento**:
  - [TanStack Router](https://tanstack.com/router/)
- **Estilos**:
  - [Tailwind CSS](https://tailwindcss.com/)
- **Llamadas a la API**:
  - [Axios](https://axios-http.com/)
- **Linting y Formateo**:
  - [ESLint](https://eslint.org/)
  - [Prettier](https://prettier.io/)

### 🌐 Gestión de Estado de Filtros en la URL

CineScope aprovecha la URL para gestionar el estado de los filtros de búsqueda y descubrimiento de películas. En lugar de manejar este estado internamente en los componentes, los parámetros de filtrado (como el término de búsqueda, la página de resultados o el año de lanzamiento) se codifican directamente en los parámetros de búsqueda de la URL.

Este enfoque, facilitado por **TanStack Router**, ofrece varias ventajas clave:

- **Compartir y Marcar como Favorito**: Las URLs se vuelven una representación directa del estado de la vista actual. Esto permite a los usuarios compartir enlaces a resultados de búsqueda específicos o guardar vistas filtradas en sus marcadores.
- **Navegación del Historial**: El estado se integra con el historial del navegador, permitiendo a los usuarios usar los botones de "atrás" y "adelante" de forma intuitiva para navegar entre diferentes estados de filtro.
- **Fuente Única de Verdad**: La URL se convierte en la única fuente de verdad para el estado de los filtros, simplificando la lógica de la aplicación y evitando problemas de sincronización entre el estado de los componentes y la URL.
- **Re-renderizado predecible**: Cuando la URL cambia, TanStack Router vuelve a cargar los datos necesarios, lo que garantiza que la interfaz de usuario siempre refleje el estado actual de la URL.

### 💡 Uso de `localStorage`

Una característica clave de CineScope es la capacidad de guardar películas en una "lista de seguimiento" personal. Esta funcionalidad se implementa utilizando `localStorage` del navegador, lo que permite que los datos persistan entre sesiones sin necesidad de una base de datos o autenticación de usuario.

- **Persistencia de Datos**: Las películas que un usuario agrega a su lista se guardan directamente en su navegador.
- **Sincronización de Componentes**: Para asegurar que la interfaz de usuario se actualice en tiempo real cuando se modifica la lista (por ejemplo, al agregar o eliminar una película), se despacha un evento personalizado (`localStorageUpdate`). Varios componentes escuchan este evento y se vuelven a renderizar para reflejar el estado más reciente de la lista de seguimiento.
- **Servicio Centralizado**: La lógica para interactuar con `localStorage` está encapsulada en el servicio `src/services/watchlist.ts`, lo que proporciona un único punto de verdad para la gestión de la lista de seguimiento.

### 📂 Estructura de Archivos

El proyecto sigue una estructura organizada para facilitar el mantenimiento y la escalabilidad:

```
/
├── public/              # Archivos estáticos (íconos, manifiesto)
├── src/
│   ├── components/      # Componentes reutilizables de React
│   ├── hooks/           # Hooks personalizados (ej. useTitle)
│   ├── routes/          # Componentes de página y layouts de ruta
│   ├── services/        # Lógica para APIs externas (TMDb)
│   ├── main.tsx         # Punto de entrada principal de la aplicación
│   └── styles.css       # Estilos globales
├── package.json         # Dependencias y scripts del proyecto
├── vite.config.ts       # Configuración de Vite
├── tailwind.config.ts   # Configuración de Tailwind CSS
└── tsconfig.json        # Configuración de TypeScript
```

---
