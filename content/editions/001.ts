import { CulturalEdition } from "@/types/edition";

export const edition001: CulturalEdition = {
  id: "001",
  label: "EDICIÓN CULTURAL 001",
  city: "Medellín, Colombia",
  music: {
    title: "Brilla la ciudad",
    artist: "Mateo Torres · Música local",
    cover: "/assets/musica.png",
    audioSrc: "/audio/brilla-la-ciudad.wav",
    duration: 232, // 3:52
    credits: "Mateo Torres & Sabbath Records (Medellín, 2026)",
    demo: true,
  },
  literature: {
    title: "Territorio que habita",
    author: "Valentina Rojas · Microhistoria",
    cover: "/assets/lectura.png",
    excerpt: "“Aquí también florecen historias que resisten...”",
    body: `El valle amanece arropado por una niebla espesa que desciende de las laderas y se disuelve en el asfalto tibio. No es un silencio cualquiera: es la pausa previa al crujido de las persianas metálicas, el olor a café recién colado en los zaguanes y el rumor distante de los primeros buses que trepan la montaña.

Aquí, en las calles empinadas donde el ladrillo a la vista dialoga con la hojarasca, la memoria no se archiva en anaqueles: se camina. Cada esquina guarda la impronta de quienes aprendieron a nombrar el abismo con ternura y transformaron la urgencia en verso.

“Aquí también florecen historias que resisten”, escribió alguna vez una mano anónima sobre el muro de un callejón en Buenos Aires. Esa frase resume el pulso de quienes habitamos este territorio: no sobrevivimos a la geografía, la inventamos de nuevo en cada jornada.

Las ciudades latinoamericanas tienen esa rara virtud de parecer simultáneamente infinitas y diminutas. Puedes perderte en su laberinto de avenidas o encontrarte reflejado en la mirada de una anciana que riega begonias en un balcón del tercer piso, ajena al vértigo del mundo exterior.

Al final de la tarde, cuando el sol tiñe los cerros de un violeta encendido (ese color que no pertenece ni al día ni a la noche), la ciudad exhala. Y en ese instante preciso, entre el bocado de un refrigerio y la última luz, comprendemos que el territorio no es el suelo que pisamos, sino la memoria que decidimos sostener juntos.`,
    credits: "Sabbath Cuadernos de Bolsillo · Primera edición especial",
    demo: true,
  },
  film: {
    title: "La otra ciudad",
    director: "Laura Méndez · Cortometraje",
    poster: "/assets/cine.png",
    videoSrc: "/video/la-otra-ciudad.mp4",
    provider: "html5",
    credits: "Colectivo Mirada Local (Medellín, 2026)",
    demo: true,
  },
};
