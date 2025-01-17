export interface BlogData {
  id: string;
  title: string;
  author: string;
  content: string;
}

export interface FilmData {
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  content: string;
  type: string;
  status: string;
  poster_url: string;
  thumb_url: string;
  is_copyright: boolean;
  sub_docquyen: boolean;
  chieurap: boolean;
  trailer_url: string;
  time: string;
  episode_current: string;
  episode_total: string;
  quality: string;
  lang: string;
  notify: string;
  showtimes: string;
  year: number;
  view: number;
  actor: string[]; // Array of actor names
  director: string[]; // Array of director names
  category: Array<{
    id: string;
    name: string;
    slug: string;
  }>; // Array of category objects
  country: Array<{
    id: string;
    name: string;
    slug: string;
  }>; // Array of country objects
  tmdb: {
    type: string;
    id: string;
    season: string | null;
    vote_average: number;
    vote_count: number;
  }; // TMDb data
  imdb: {
    id: string | null;
  }; // IMDb data
  created: {
    time: string;
  }; // Creation time
  modified: {
    time: string;
  }; // Modification time
}

interface ServerData {
  name: string;
  slug: string;
  filename: string;
  link_embed: string;
  link_m3u8: string;
}

interface Episode {
  server_name: string;
  server_data: ServerData[];
}

interface EpisodesResponse {
  episodes: Episode[];
}
