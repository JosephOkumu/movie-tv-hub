// Base interfaces for common data structures
export interface BaseMedia {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  genre_ids: number[];
  popularity: number;
  vote_average: number;
  vote_count: number;
  release_date?: string;
  first_air_date?: string;
  adult?: boolean;
}

// Movie-specific interfaces
export interface Movie extends BaseMedia {
  title: string;
  original_title: string;
  release_date: string;
  runtime?: number;
  budget?: number;
  revenue?: number;
  imdb_id?: string;
  tagline?: string;
  status?: string;
  homepage?: string;
  spoken_languages?: SpokenLanguage[];
  production_companies?: ProductionCompany[];
  production_countries?: ProductionCountry[];
}

// TV Show-specific interfaces
export interface TVShow extends BaseMedia {
  name: string;
  original_name: string;
  first_air_date: string;
  last_air_date?: string;
  episode_run_time?: number[];
  number_of_episodes?: number;
  number_of_seasons?: number;
  status?: string;
  type?: string;
  homepage?: string;
  in_production?: boolean;
  languages?: string[];
  last_episode_to_air?: Episode;
  next_episode_to_air?: Episode;
  networks?: Network[];
  production_companies?: ProductionCompany[];
  seasons?: Season[];
  spoken_languages?: SpokenLanguage[];
  origin_country?: string[];
}

// Detailed interfaces
export interface MovieDetails extends Movie {
  belongs_to_collection?: Collection;
  genres: Genre[];
  credits?: Credits;
  videos?: VideoResponse;
  similar?: APIResponse<Movie>;
  recommendations?: APIResponse<Movie>;
  reviews?: APIResponse<Review>;
  images?: ImageResponse;
  keywords?: KeywordsResponse;
  watch_providers?: WatchProvidersResponse;
}

export interface TVShowDetails extends TVShow {
  created_by: CreatedBy[];
  genres: Genre[];
  networks: Network[];
  seasons: Season[];
  credits?: Credits;
  videos?: VideoResponse;
  similar?: APIResponse<TVShow>;
  recommendations?: APIResponse<TVShow>;
  reviews?: APIResponse<Review>;
  images?: ImageResponse;
  keywords?: TVKeywordsResponse;
  watch_providers?: WatchProvidersResponse;
}

// Supporting interfaces
export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Collection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

export interface Network {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string | null;
}

export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
}

export interface Episode {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string | null;
  vote_average: number;
  vote_count: number;
}

// Credits interfaces
export interface Credits {
  cast: CastMember[];
  crew: CrewMember[];
}

export interface Person {
  id: number;
  name: string;
  gender: number;
  profile_path: string | null;
  adult: boolean;
  known_for_department: string;
  popularity: number;
}

export interface CastMember extends Person {
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface CrewMember extends Person {
  credit_id: string;
  department: string;
  job: string;
}

// Video interfaces
export interface VideoResponse {
  results: Video[];
}

export interface Video {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}

// Image interfaces
export interface ImageResponse {
  backdrops: Image[];
  logos: Image[];
  posters: Image[];
}

export interface Image {
  aspect_ratio: number;
  height: number;
  iso_639_1: string | null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

// Review interfaces
export interface Review {
  id: string;
  author: string;
  author_details: ReviewAuthorDetails;
  content: string;
  created_at: string;
  updated_at: string;
  url: string;
}

export interface ReviewAuthorDetails {
  name: string;
  username: string;
  avatar_path: string | null;
  rating: number | null;
}

// Keywords interfaces
export interface KeywordsResponse {
  keywords: Keyword[];
}

export interface TVKeywordsResponse {
  results: Keyword[];
}

export interface Keyword {
  id: number;
  name: string;
}

// Watch Providers interfaces
export interface WatchProvidersResponse {
  results: {
    [countryCode: string]: WatchProviders;
  };
}

export interface WatchProviders {
  link: string;
  buy?: WatchProvider[];
  flatrate?: WatchProvider[];
  rent?: WatchProvider[];
}

export interface WatchProvider {
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

// API Response wrapper
export interface APIResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

// Search interfaces
export interface SearchResult {
  id: number;
  media_type: 'movie' | 'tv' | 'person';
  title?: string;
  name?: string;
  overview?: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  popularity?: number;
  profile_path?: string | null;
  known_for?: (Movie | TVShow)[];
  known_for_department?: string;
}

// OMDB API interfaces
export interface OMDBResponse {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: OMDBRating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response: string;
  Error?: string;
}

export interface OMDBRating {
  Source: string;
  Value: string;
}

// App-specific interfaces
export interface WatchlistItem {
  id: number;
  media_type: 'movie' | 'tv';
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
  added_date: string;
  watched: boolean;
  user_rating?: number;
  notes?: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
  region: string;
  adult_content: boolean;
  notifications: boolean;
  default_view: 'grid' | 'list';
}

export interface FilterOptions {
  genre?: number[];
  year?: number;
  rating?: number;
  runtime?: {
    min: number;
    max: number;
  };
  sort_by?: string;
  order?: 'asc' | 'desc';
}

export interface SearchFilters extends FilterOptions {
  media_type?: 'movie' | 'tv' | 'all';
  include_adult?: boolean;
}

// Error handling
export interface APIError {
  status_code: number;
  status_message: string;
  success: boolean;
}

// Loading states
export interface LoadingState {
  isLoading: boolean;
  isError: boolean;
  error?: string | null;
}

// Cache interfaces
export interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

export interface CacheConfig {
  maxAge: number;
  maxSize: number;
}

// Recommendation interfaces
export interface RecommendationEngine {
  getUserRecommendations: (userId: string) => Promise<(Movie | TVShow)[]>;
  getSimilarContent: (mediaId: number, mediaType: 'movie' | 'tv') => Promise<(Movie | TVShow)[]>;
  getWatchlistRecommendations: (watchlist: WatchlistItem[]) => Promise<(Movie | TVShow)[]>;
}

// Trending interfaces
export interface TrendingTimeWindow {
  day: 'day';
  week: 'week';
}

export interface TrendingOptions {
  media_type: 'movie' | 'tv' | 'all';
  time_window: TrendingTimeWindow[keyof TrendingTimeWindow];
}

// Utility types
export type MediaType = 'movie' | 'tv';
export type MediaItem = Movie | TVShow;
export type MediaDetails = MovieDetails | TVShowDetails;
export type SortOption = 'popularity.desc' | 'popularity.asc' | 'release_date.desc' | 'release_date.asc' | 'vote_average.desc' | 'vote_average.asc' | 'vote_count.desc' | 'vote_count.asc';

// Context types
export interface WatchlistContextType {
  watchlist: WatchlistItem[];
  addToWatchlist: (item: Movie | TVShow, mediaType: MediaType) => void;
  removeFromWatchlist: (id: number) => void;
  markAsWatched: (id: number) => void;
  updateUserRating: (id: number, rating: number) => void;
  updateNotes: (id: number, notes: string) => void;
  clearWatchlist: () => void;
  isInWatchlist: (id: number) => boolean;
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}
