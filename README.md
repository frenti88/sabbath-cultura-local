# SABBATH — CULTURAL EXPERIENCE · VOL. 001

Landing page interactiva, accesible y de alta fidelidad visual (pixel-perfect) para la experiencia cultural de **Sabbath**, marca colombiana que conecta música, literatura y cine local a través de una postal incluida en una caja de refrigerio.

---

## 01. Vista Previa de la Experiencia

El visitante accede directamente tras escanear el código QR de su postal y encuentra:
1. **Header corporativo:** Logo Sabbath con asterisco amarillo (`#FFC501`), menú de navegación accesible y botón cápsula `TU BREAK AQUÍ ↗` en rojo Sabbath (`#B5152B`).
2. **Hero cinematográfico:**
   - Columna izquierda: Titular de impacto en Archivo Black / Inter Tight 900 (`HOY TU BREAK / SUENA, SE LEE / Y SE SIENTE LOCAL.`), subtítulo editorial y CTA `EXPLORAR ↗`.
   - Columna derecha: Composición del tocadiscos interactivo con vinilo negro de surcos concéntricos, etiqueta central roja Sabbath (`VOL. 001`), reflejo cónico dinámico, brazo de tocadiscos con aguja e indicador LED rojo, badge de estrella amarilla y notas editoriales sobre Medellín.
3. **Grid Cultural (Tres Cards):**
   - **01 / MÚSICA (`#040A56` / `#162B99`):** Mateo Torres — *Brilla la Ciudad*. Reproductor HTML5 real con barra de progreso interactiva, scrubber, marcas de tiempo, controles accesibles por teclado y botón `ESCUCHAR ↗` sincronizado con el giro del tocadiscos.
   - **02 / LECTURA (`#92278F`):** Valentina Rojas — *Territorio que habita*. Extracto y botón `LEER ↗` que despliega un modal editorial con lectura inmersiva, gestión de foco y tecla Escape.
   - **03 / VIDEO (`#D05800`):** Laura Méndez — *La otra ciudad*. Fotograma cinematográfico con perforaciones de 35mm, botón Play translúcido y botón `VER ↗` que abre el reproductor inmersivo 16:9 con controles nativos y pausa automática al cerrar.
4. **Footer minimalista:** Identidad corporativa, leyenda `CULTURA LOCAL · MEDELLÍN, COLOMBIA`, navegación y botón de acción.

---

## 02. Stack Tecnológico

- **Framework:** [Next.js](https://nextjs.org/) 15 (App Router)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Animaciones:** [Framer Motion](https://www.framer.com/motion/)
- **Iconografía:** [Lucide React](https://lucide.dev/)
- **Multimedia:** HTML5 Audio & Video nativos
- **Testing & QA Visual:** [Puppeteer Core](https://pptr.dev/) con Google Chrome headless

---

## 03. Design Tokens (Paleta Oficial Sabbath)

| Token | Hexadecimal | Aplicación |
|---|---|---|
| **Sabbath Red** | `#B5152B` | Headlines, botones CTA primarios y etiqueta central del vinilo |
| **Sabbath Black** | `#2B2B2B` | Superficies oscuras secundarias |
| **Sabbath White** | `#F1F1F1` | Tipografía principal y elementos de lectura |
| **Sabbath Blue** | `#040A56` / `#162B99` | Identidad Card 01 (Música) y reproductor de audio |
| **Sabbath Purple** | `#92278F` | Identidad Card 02 (Lectura) y experiencia editorial |
| **Sabbath Orange** | `#D05800` | Identidad Card 03 (Video) y cine club |
| **Sabbath Yellow** | `#FFC501` | Asterisco de 8 puntas corporativo y badge del vinilo |
| **Sabbath Background** | `#0A0A0C` | Fondo general carbón permanente (dark mode) |

---

## 04. Estructura de Componentes

```
├── app/
│   ├── globals.css           # Tokens CSS, scrollbar y directivas de accesibilidad
│   ├── layout.tsx            # Fuentes Archivo Black e Inter, metadatos y viewport
│   └── page.tsx              # Ensamblado de las 4 secciones principales y estado global
├── components/
│   ├── SabbathLogo.tsx       # Logo vectorial SVG con asterisco de 8 puntas (#FFC501)
│   ├── SabbathHeader.tsx     # Barra superior con navegación responsive y botón CTA
│   ├── HeroSection.tsx       # Sección principal con titular a dos columnas
│   ├── VinylExperience.tsx   # Tocadiscos interactivo, vinilo giratorio y brazo
│   ├── CulturalGrid.tsx      # Grid equilibrado de 3 columnas
│   ├── MusicCard.tsx         # Tarjeta de Música con bordes azules y AudioPlayer
│   ├── AudioPlayer.tsx       # Reproductor HTML5 con scrub bar, tiempo y teclado
│   ├── LiteratureCard.tsx    # Tarjeta de Lectura con bordes morados
│   ├── ReadingExperience.tsx # Modal accesible de lectura editorial (Esc / Focus trap)
│   ├── VideoCard.tsx         # Tarjeta de Video con bordes naranjas y marco de 35mm
│   ├── VideoExperience.tsx   # Modal inmersivo 16:9 con controles HTML5 de video
│   └── SabbathFooter.tsx     # Pie de página minimalista con enlaces y créditos
├── content/
│   └── editions/
│       └── vol-001.ts        # Contenidos configurables de la edición cultural Vol. 001
├── types/
│   └── content.ts            # Interfaces TypeScript de Music, Literature, Video y Edition
├── public/
│   ├── assets/               # Portadas de alta resolución, vinilo y texturas
│   ├── audio/                # Archivo de audio para Mateo Torres
│   └── video/                # Video MP4 para Laura Méndez
└── scripts/
    └── take-screenshots.mjs  # Suite automatizada de capturas en todas las resoluciones
```

---

## 05. Cómo Cambiar o Renovar el Contenido Cultural

Para publicar una nueva edición (por ejemplo, **Vol. 002**):

1. Crea o edita el archivo en `content/editions/vol-002.ts` implementando la interfaz `CulturalEdition`:
   ```typescript
   export const editionVol002: CulturalEdition = {
     volNumber: "VOL. 002",
     volLabel: "CULTURA LOCAL",
     tagline: "COLOMBIA SUENA DIFERENTE AQUÍ.",
     editorialNote: "...",
     music: {
       id: "vol-002-music",
       categoryNumber: "01",
       categoryName: "MÚSICA",
       title: "Nombre Canción",
       artist: "Artista Colombiano",
       cover: "/assets/portada-musica.webp",
       audioSrc: "/audio/cancion.wav",
       duration: "03:45",
       description: "...",
       credits: { ... }
     },
     literature: {
       id: "vol-002-literature",
       categoryNumber: "02",
       categoryName: "LECTURA",
       title: "Título de la Obra",
       author: "Autor(a)",
       cover: "/assets/portada-libro.webp",
       excerpt: "...",
       body: { paragraphs: [...] },
       credits: { ... }
     },
     video: {
       id: "vol-002-video",
       categoryNumber: "03",
       categoryName: "VIDEO",
       title: "Título del Cortometraje",
       director: "Director(a)",
       poster: "/assets/poster-video.webp",
       videoSrc: "/video/cortometraje.mp4",
       duration: "05:12",
       description: "...",
       credits: { ... }
     }
   };
   ```
2. En `app/page.tsx`, importa la nueva edición:
   ```typescript
   import { editionVol002 } from "@/content/editions/vol-002";
   ```
3. El diseño, la maquetación y las interacciones se adaptarán automáticamente sin requerir cambios en el código de los componentes.

---

## 06. Instrucciones de Ejecución

### Requisitos previos
- Node.js >= 18
- npm o pnpm

### Instalación de dependencias
```bash
npm install
```

### Ejecución en entorno de desarrollo
```bash
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Compilación y ejecución de producción
```bash
npm run build
npm start
```

### Generación de capturas de validación visual (QA)
Con el servidor corriendo en `http://localhost:3000`:
```bash
node scripts/take-screenshots.mjs
```
Las capturas se guardarán en la carpeta `screenshots/`:
- `desktop-1440.png` y `desktop-1440-fullpage.png`
- `reference-match-934.png` y `reference-match-934-fullpage.png`
- `tablet-1024.png` y `tablet-1024-fullpage.png`
- `mobile-390.png` y `mobile-390-fullpage.png`
- `mobile-360.png` y `mobile-360-fullpage.png`
- `interaction-modal-reading.png` (Modal de lectura en acción)
- `interaction-modal-video.png` (Modal de video en acción)
- `interaction-audio-playing.png` (Audio reproduciéndose con vinilo girando)

---

## 07. Cumplimiento de Accesibilidad y Performance

- **WCAG 2.2 AA:** Contraste de colores verificado, HTML semántico con etiquetas `header`, `main`, `section`, `article`, `footer`, y `h1`/`h2`.
- **Navegación por teclado:** Enlaces, botones, scrubber de audio y modales son totalmente operables mediante teclado con anillos `focus-visible:ring-sabbath-yellow`.
- **Escape Key & Focus Trap:** Los modales de lectura y video capturan el foco al abrirse y se cierran de forma instantánea al pulsar la tecla Escape.
- **Prefers-reduced-motion:** Detectado automáticamente vía CSS y Framer Motion (`useReducedMotion`), deshabilitando las animaciones continuas para usuarios sensibles al movimiento.
- **Optimización de recursos:** Imágenes en formato WebP con compresión de alta calidad y lazy loading en secciones inferiores.
