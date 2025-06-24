import axios, { AxiosResponse } from 'axios';
import {
  Movie,
  TVShow,
  MovieDetails,
  TVShowDetails,
  APIResponse,
  SearchResult,
  Genre,
  Credits,
  VideoResponse,
  ImageResponse,
  Person,
  TrendingOptions,
  APIError
} from '../types';
import { buildTMDBUrl, env } from '../config/env';

// Create axios instance with default config
const tmdbApi = axios.create({
  baseURL: env.TMDB_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add API key and default params
tmdbApi.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    api_key: env.TMDB_API_KEY,
    language: env.DEFAULT_LANGUAGE,
  };
  return config;
});

// Response interceptor for error handling
tmdbApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data) {
      const apiError: APIError = {
        status_code: error.response.status,
        status_message: error.response.data.status_message || error.message,
        success: false,
      };
      return Promise.reject(apiError);
    }
    return Promise.reject(error);
  }
);

// Utility function to handle API calls with error handling
const handleApiCall = async <T>(apiCall: Promise<AxiosResponse<T>>): Promise<T> => {
  try {
    const response = await apiCall;
    return response.data;
  } catch (error) {
    if (env.DEBUG_MODE) {
      console.error('TMDB API Error:', error);
    }
    throw error;
  }
};

// Rate limiting utility
const rateLimiter = (() => {
  let lastCall = 0;
  return async () => {
    const now = Date.now();
    const timeSinceLastCall = now - lastCall;
    if (timeSinceLastCall < env.API_RATE_LIMIT_DELAY) {
      await new Promise(resolve =>
        setTimeout(resolve, env.API_RATE_LIMIT_DELAY - timeSinceLastCall)
      );
    }
    lastCall = Date.now();
  };
})();

export class TMDBService {
  // Search methods
  static async searchMulti(query: string, page: number = 1): Promise<APIResponse<SearchResult>> {
    await rateLimiter();
    return handleApiCall(
      tmdbApi.get('/search/multi', {
        params: { query, page, include_adult: false }
      })
    );
  }

  static async searchMovies(query: string, page: number = 1, year?: number): Promise<APIResponse<Movie>> {
    await rateLimiter();
    return handleApiCall(
      tmdbApi.get('/search/movie', {
        params: {
          query,
          page,
          include_adult: false,
          ...(year && { year })
        }
      })
    );
  }

  static async searchTVShows(query: string, page: number = 1, year?: number): Promise<APIResponse<TVShow>> {
    await rateLimiter();
    return handleApiCall(
      tmdbApi.get('/search/tv', {
        params: {
          query,
          page,
          include_adult: false,
          ...(year && { first_air_date_year: year })
        }
      })
    );
  }

  static async searchPeople(query: string, page: number = 1): Promise<APIResponse<Person>> {
    await rateLimiter();
    return handleApiCall(
      tmdbApi.get('/search/person', {
        params: { query, page, include_adult: false }
      })
    );
  }

  // Movie methods
  static async getMovie(id: number): Promise<MovieDetails> {
    await rateLimiter();
    return handleApiCall(
      tmdbApi.get(`/movie/${id}`, {
        params: {
          append_to_response: 'credits,videos,similar,recommendations,reviews,images,keywords,watch/providers'
        }
      })
    );
  }

  static async getMovieCredits(id: number): Promise<Credits> {
    await rateLimiter();
    return handleApiCall(tmdbApi.get(`/movie/${id}/credits`));
  }

  static async getMovieVideos(id: number): Promise<VideoResponse> {
    await rateLimiter();
    return handleApiCall(tmdbApi.get(`/movie/${id}/videos`));
  }

  static async getMovieImages(id: number): Promise<ImageResponse> {
    await rateLimiter();
    return handleApiCall(
      tmdbApi.get(`/movie/${id}/images`, {
        params: { include_image_language: 'en,null' }
      })
    );
  }

  static async getSimilarMovies(id: number, page: number = 1): Promise<APIResponse<Movie>> {
    await rateLimiter();
    return handleApiCall(tmdbApi.get(`/movie/${id}/similar`, { params: { page } }));
  }

  static async getMovieRecommendations(id: number, page: number = 1): Promise<APIResponse<Movie>> {
    await rateLimiter();
    return handleApiCall(tmdbApi.get(`/movie/${id}/recommendations`, { params: { page } }));
  }

  // TV Show methods
  static async getTVShow(id: number): Promise<TVShowDetails> {
    await rateLimiter();
    return handleApiCall(
      tmdbApi.get(`/tv/${id}`, {
        params: {
          append_to_response: 'credits,videos,similar,recommendations,reviews,images,keywords,watch/providers'
        }
      })
    );
  }

  static async getTVShowCredits(id: number): Promise<Credits> {
    await rateLimiter();
    return handleApiCall(tmdbApi.get(`/tv/${id}/credits`));
  }

  static async getTVShowVideos(id: number): Promise<VideoResponse> {
    await rateLimiter();
    return handleApiCall(tmdbApi.get(`/tv/${id}/videos`));
  }

  static async getTVShowImages(id: number): Promise<ImageResponse> {
    await rateLimiter();
    return handleApiCall(
      tmdbApi.get(`/tv/${id}/images`, {
        params: { include_image_language: 'en,null' }
      })
    );
  }

  static async getSimilarTVShows(id: number, page: number = 1): Promise<APIResponse<TVShow>> {
    await rateLimiter();
    return handleApiCall(tmdbApi.get(`/tv/${id}/similar`, { params: { page } }));
  }

  static async getTVShowRecommendations(id: number, page: number = 1): Promise<APIResponse<TVShow>> {
    await rateLimiter();
    return handleApiCall(tmdbApi.get(`/tv/${id}/recommendations`, { params: { page } }));
  }

  // Trending methods
  static async getTrending(options: TrendingOptions, page: number = 1): Promise<APIResponse<Movie | TVShow>> {
    await rateLimiter();
    return handleApiCall(
      tmdbApi.get(`/trending/${options.media_type}/${options.time_window}`, {
        params: { page }
      })
    );
  }

  static async getTrendingMovies(timeWindow: 'day' | 'week' = 'week', page: number = 1): Promise<APIResponse<Movie>> {
    await rateLimiter();
    return handleApiCall(tmdbApi.get(`/trending/movie/${timeWindow}`, { params: { page } }));
  }

  static async getTrendingTVShows(timeWindow: 'day' | 'week' = 'week', page: number = 1): Promise<APIResponse<TVShow>> {
    await rateLimiter();
    return handleApiCall(tmdbApi.get(`/trending/tv/${timeWindow}`, { params: { page } }));
  }

  // Popular content methods
  static async getPopularMovies(page: number = 1): Promise<APIResponse<Movie>> {
    await rateLimiter();
    return handleApiCall(tmdbApi.get('/movie/popular', { params: { page } }));
  }

  static async getPopularTVShows(page: number = 1): Promise<APIResponse<TVShow>> {
    await rateLimiter();
    return handleApiCall(tmdbApi.get('/tv/popular', { params: { page } }));
  }

  static async getTopRatedMovies(page: number = 1): Promise<APIResponse<Movie>> {
    await rateLimiter();
    return handleApiCall(tmdbApi.get('/movie/top_rated', { params: { page } }));
  }

  static async getTopRatedTVShows(page: number = 1): Promise<APIResponse<TVShow>> {
    await rateLimiter();
    return handleApiCall(tmdbApi.get('/tv/top_rated', { params: { page } }));
  }

  static async getUpcomingMovies(page: number = 1): Promise<APIResponse<Movie>> {
    await rateLimiter();
    return handleApiCall(tmdbApi.get('/movie/upcoming', { params: { page } }));
  }

  static async getNowPlayingMovies(page: number = 1): Promise<APIResponse<Movie>> {
    await rateLimiter();
    return handleApiCall(tmdbApi.get('/movie/now_playing', { params: { page } }));
  }

  // Discovery methods
  static async discoverMovies(params: Record<string, any> = {}): Promise<APIResponse<Movie>> {
    await rateLimiter();
    return handleApiCall(
      tmdbApi.get('/discover/movie', {
        params: {
          sort_by: 'popularity.desc',
          include_adult: false,
          include_video: false,
          page: 1,
          ...params
        }
      })
    );
  }

  static async discoverTVShows(params: Record<string, any> = {}): Promise<APIResponse<TVShow>> {
    await rateLimiter();
    return handleApiCall(
      tmdbApi.get('/discover/tv', {
        params: {
          sort_by: 'popularity.desc',
          include_adult: false,
          page: 1,
          ...params
        }
      })
    );
  }

  // Genre methods
  static async getMovieGenres(): Promise<{ genres: Genre[] }> {
    await rateLimiter();
    return handleApiCall(tmdbApi.get('/genre/movie/list'));
  }

  static async getTVGenres(): Promise<{ genres: Genre[] }> {
    await rateLimiter();
    return handleApiCall(tmdbApi.get('/genre/tv/list'));
  }

  // Person methods
  static async getPerson(id: number): Promise<Person> {
    await rateLimiter();
    return handleApiCall(
      tmdbApi.get(`/person/${id}`, {
        params: {
          append_to_response: 'movie_credits,tv_credits,images'
        }
      })
    );
  }

  // Configuration methods
  static async getConfiguration(): Promise<any> {
    await rateLimiter();
    return handleApiCall(tmdbApi.get('/configuration'));
  }

  // Utility methods
  static buildImageUrl(path: string | null, size: string = 'w500'): string {
    if (!path) return '/placeholder-image.jpg';
    return `${env.TMDB_IMAGE_BASE_URL}/${size}${path}`;
  }

  static buildBackdropUrl(path: string | null, size: string = 'w1280'): string {
    if (!path) return '/placeholder-backdrop.jpg';
    return `${env.TMDB_IMAGE_BASE_URL}/${size}${path}`;
  }

  static buildProfileUrl(path: string | null, size: string = 'w185'): string {
    if (!path) return '/placeholder-profile.jpg';
    return `${env.TMDB_IMAGE_BASE_URL}/${size}${path}`;
  }

  // Helper method to format runtime
  static formatRuntime(minutes: number): string {
    if (!minutes) return 'Unknown';
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
      return `${remainingMinutes}m`;
    } else if (remainingMinutes === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${remainingMinutes}m`;
    }
  }

  // Helper method to format release date
  static formatReleaseDate(dateString: string): string {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Helper method to get year from date string
  static getYearFromDate(dateString: string): string {
    if (!dateString) return 'Unknown';
    return new Date(dateString).getFullYear().toString();
  }
}

export default TMDBService;
