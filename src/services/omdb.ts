import axios, { AxiosResponse } from 'axios';
import { OMDBResponse, APIError } from '../types';
import { buildOMDBUrl, env } from '../config/env';

// Create axios instance for OMDB API
const omdbApi = axios.create({
  baseURL: env.OMDB_BASE_URL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
omdbApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data) {
      const apiError: APIError = {
        status_code: error.response.status,
        status_message: error.response.data.Error || error.message,
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
      console.error('OMDB API Error:', error);
    }
    throw error;
  }
};

// Rate limiting utility for OMDB API
const rateLimiter = (() => {
  let lastCall = 0;
  const OMDB_RATE_LIMIT = 1000; // 1 second between calls for free tier

  return async () => {
    const now = Date.now();
    const timeSinceLastCall = now - lastCall;
    if (timeSinceLastCall < OMDB_RATE_LIMIT) {
      await new Promise(resolve =>
        setTimeout(resolve, OMDB_RATE_LIMIT - timeSinceLastCall)
      );
    }
    lastCall = Date.now();
  };
})();

export class OMDBService {
  // Search by title
  static async searchByTitle(title: string, year?: number, type?: 'movie' | 'series' | 'episode'): Promise<OMDBResponse> {
    await rateLimiter();

    const params: Record<string, string | number> = { t: title };
    if (year) params.y = year;
    if (type) params.type = type;

    const response = await handleApiCall(
      omdbApi.get('', {
        params: {
          ...params,
          apikey: env.OMDB_API_KEY,
          plot: 'full'
        }
      })
    );

    // Check if OMDB returned an error
    if (response.Response === 'False') {
      throw new Error(response.Error || 'Movie not found');
    }

    return response;
  }

  // Search by IMDB ID
  static async searchByIMDBId(imdbId: string, plot: 'short' | 'full' = 'full'): Promise<OMDBResponse> {
    await rateLimiter();

    const response = await handleApiCall(
      omdbApi.get('', {
        params: {
          i: imdbId,
          apikey: env.OMDB_API_KEY,
          plot
        }
      })
    );

    // Check if OMDB returned an error
    if (response.Response === 'False') {
      throw new Error(response.Error || 'Movie not found');
    }

    return response;
  }

  // Search multiple results
  static async search(
    query: string,
    page: number = 1,
    type?: 'movie' | 'series' | 'episode',
    year?: number
  ): Promise<{
    Search: OMDBResponse[];
    totalResults: string;
    Response: string;
    Error?: string;
  }> {
    await rateLimiter();

    const params: Record<string, string | number> = {
      s: query,
      page
    };
    if (type) params.type = type;
    if (year) params.y = year;

    const response = await handleApiCall(
      omdbApi.get('', {
        params: {
          ...params,
          apikey: env.OMDB_API_KEY
        }
      })
    );

    // Check if OMDB returned an error
    if (response.Response === 'False') {
      throw new Error(response.Error || 'No results found');
    }

    return response;
  }

  // Get additional details for a movie/show by title and year
  static async getDetailsByTitle(title: string, year?: number): Promise<OMDBResponse | null> {
    try {
      return await this.searchByTitle(title, year);
    } catch (error) {
      if (env.DEBUG_MODE) {
        console.warn(`OMDB: Could not find details for "${title}" (${year}):`, error);
      }
      return null;
    }
  }

  // Get additional details for a movie/show by IMDB ID
  static async getDetailsByIMDBId(imdbId: string): Promise<OMDBResponse | null> {
    try {
      return await this.searchByIMDBId(imdbId);
    } catch (error) {
      if (env.DEBUG_MODE) {
        console.warn(`OMDB: Could not find details for IMDB ID "${imdbId}":`, error);
      }
      return null;
    }
  }

  // Extract ratings from OMDB response
  static extractRatings(omdbData: OMDBResponse): {
    imdb?: string;
    rottenTomatoes?: string;
    metacritic?: string;
    [key: string]: string | undefined;
  } {
    const ratings: { [key: string]: string | undefined } = {};

    // Add IMDB rating
    if (omdbData.imdbRating && omdbData.imdbRating !== 'N/A') {
      ratings.imdb = omdbData.imdbRating;
    }

    // Process other ratings from the Ratings array
    if (omdbData.Ratings && Array.isArray(omdbData.Ratings)) {
      omdbData.Ratings.forEach(rating => {
        switch (rating.Source) {
          case 'Rotten Tomatoes':
            ratings.rottenTomatoes = rating.Value;
            break;
          case 'Metacritic':
            ratings.metacritic = rating.Value;
            break;
          default:
            // Store other ratings with source name as key
            const key = rating.Source.toLowerCase().replace(/\s+/g, '');
            ratings[key] = rating.Value;
        }
      });
    }

    return ratings;
  }

  // Get comprehensive movie/show data combining OMDB fields
  static getComprehensiveData(omdbData: OMDBResponse): {
    plot: string;
    director: string;
    writer: string;
    actors: string[];
    awards: string;
    ratings: { [key: string]: string | undefined };
    runtime: string;
    genre: string[];
    language: string;
    country: string;
    boxOffice?: string;
    production?: string;
    website?: string;
    metascore: string;
    imdbVotes: string;
  } {
    return {
      plot: omdbData.Plot || '',
      director: omdbData.Director || '',
      writer: omdbData.Writer || '',
      actors: omdbData.Actors ? omdbData.Actors.split(', ') : [],
      awards: omdbData.Awards || '',
      ratings: this.extractRatings(omdbData),
      runtime: omdbData.Runtime || '',
      genre: omdbData.Genre ? omdbData.Genre.split(', ') : [],
      language: omdbData.Language || '',
      country: omdbData.Country || '',
      boxOffice: omdbData.BoxOffice,
      production: omdbData.Production,
      website: omdbData.Website,
      metascore: omdbData.Metascore || '',
      imdbVotes: omdbData.imdbVotes || '',
    };
  }

  // Helper to format box office numbers
  static formatBoxOffice(boxOffice: string): string {
    if (!boxOffice || boxOffice === 'N/A') return 'Unknown';
    return boxOffice;
  }

  // Helper to format runtime
  static formatRuntime(runtime: string): string {
    if (!runtime || runtime === 'N/A') return 'Unknown';
    return runtime;
  }

  // Helper to parse and format ratings
  static formatRating(rating: string, source: string): string {
    if (!rating || rating === 'N/A') return 'N/A';

    switch (source) {
      case 'imdb':
        return `${rating}/10`;
      case 'rottenTomatoes':
        return rating; // Already includes %
      case 'metacritic':
        return rating.includes('/') ? rating : `${rating}/100`;
      default:
        return rating;
    }
  }

  // Check if title matches (fuzzy matching for better accuracy)
  static titleMatches(title1: string, title2: string): boolean {
    const normalize = (str: string) =>
      str.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, ' ')
        .trim();

    const normalized1 = normalize(title1);
    const normalized2 = normalize(title2);

    return normalized1 === normalized2 ||
           normalized1.includes(normalized2) ||
           normalized2.includes(normalized1);
  }

  // Validate OMDB response data
  static validateResponse(data: any): data is OMDBResponse {
    return data &&
           typeof data === 'object' &&
           data.Response === 'True' &&
           (data.Title || data.Error);
  }
}

export default OMDBService;
