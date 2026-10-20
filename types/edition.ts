export interface CulturalEdition {
  id: string;
  label: string;
  city?: string;
  music: {
    title: string;
    artist: string;
    cover: string;
    audioSrc?: string;
    duration?: number;
    credits?: string;
    demo?: boolean;
  };
  literature: {
    title: string;
    author: string;
    cover: string;
    excerpt?: string;
    body?: string;
    credits?: string;
    demo?: boolean;
  };
  film: {
    title: string;
    director: string;
    poster: string;
    videoSrc?: string;
    captionsSrc?: string;
    provider?: "html5" | "youtube" | "vimeo";
    credits?: string;
    demo?: boolean;
  };
}
