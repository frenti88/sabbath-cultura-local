export interface MusicContent {
  id: string;
  categoryNumber: string;
  categoryName: string;
  title: string;
  artist: string;
  cover: string;
  audioSrc: string;
  duration: string; // e.g., "03:52"
  description: string;
  credits: {
    producer?: string;
    mixMaster?: string;
    recordingStudio?: string;
    city?: string;
    year?: string;
  };
}

export interface LiteratureContent {
  id: string;
  categoryNumber: string;
  categoryName: string;
  title: string;
  author: string;
  cover: string;
  excerpt: string;
  body: {
    chapters?: {
      title?: string;
      paragraphs: string[];
    }[];
    paragraphs: string[];
  };
  credits: {
    editorial?: string;
    edition?: string;
    year?: string;
    city?: string;
  };
}

export interface VideoContent {
  id: string;
  categoryNumber: string;
  categoryName: string;
  title: string;
  director: string;
  poster: string;
  videoSrc: string;
  description: string;
  duration?: string;
  credits: {
    cinematography?: string;
    production?: string;
    cast?: string[];
    city?: string;
    year?: string;
  };
}

export interface CulturalEdition {
  volNumber: string;
  volLabel: string;
  tagline: string;
  editorialNote: string;
  music: MusicContent;
  literature: LiteratureContent;
  video: VideoContent;
}
