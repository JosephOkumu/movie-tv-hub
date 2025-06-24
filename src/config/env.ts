// Environment configuration for API keys and settings
export const env = {
  // API Keys
  TMDB_API_KEY: process.env.REACT_APP_TMDB_API_KEY || 'b40f084852653e8b9d2538ebc89e2d6e',
  OMDB_API_KEY: process.env.REACT_APP_OMDB_API_KEY || '8fc40313',
  YOUTUBE_API_KEY: process.env.REACT_APP_YOUTUBE_API_KEY || '',

  // API Base URLs
  TMDB_BASE_URL: process.env.REACT_APP_TMDB_BASE_URL || 'https://api.themoviedb.org/3',
  TMDB_IMAGE_BASE_URL: process.env.REACT_APP_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p',
  OMDB_BASE_URL: process.env.REACT_APP_OMDB_BASE_URL || 'https://www.omdbapi.com',
  YOUTUBE_BASE_URL: 'https://www.googleapis.com/youtube/v3',

  // Application Settings
  DEFAULT_LANGUAGE: process.env.REACT_APP_DEFAULT_LANGUAGE || 'en-US',
  DEFAULT_REGION: process.env.REACT_APP_DEFAULT_REGION || 'US',
  ITEMS_PER_PAGE: parseInt(process.env.REACT_APP_ITEMS_PER_PAGE || '20'),

  // Performance Settings
  API_RATE_LIMIT_DELAY: parseInt(process.env.REACT_APP_API_RATE_LIMIT_DELAY || '1000'),
  CACHE_DURATION: parseInt(process.env.REACT_APP_CACHE_DURATION || '300000'), // 5 minutes

  // Development Settings
  DEBUG_MODE: process.env.REACT_APP_DEBUG_MODE === 'true',
  MOCK_API_RESPONSES: process.env.REACT_APP_MOCK_API_RESPONSES === 'true',

  // Image sizes for TMDB
  IMAGE_SIZES: {
    poster: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'],
    backdrop: ['w300', 'w780', 'w1280', 'original'],
    profile: ['w45', 'w185', 'h632', 'original'],
    logo: ['w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original'],
  },

  // Default image sizes
  DEFAULT_IMAGE_SIZES: {
    poster: 'w500',
    backdrop: 'w1280',
    profile: 'w185',
    logo: 'w185',
  },
} as const;

// Validation function to check if required environment variables are set
export const validateEnv = (): boolean => {
  const requiredKeys = [env.TMDB_API_KEY, env.OMDB_API_KEY];

  for (const key of requiredKeys) {
    if (!key || key === 'your_api_key_here') {
      console.error('Missing required API key in environment configuration');
      return false;
    }
  }

  return true;
};

// Helper function to build TMDB image URLs
export const buildImageUrl = (
  path: string | null,
  type: keyof typeof env.IMAGE_SIZES,
  size?: string
): string => {
  if (!path) return '/placeholder-image.jpg';

  const imageSize = size || env.DEFAULT_IMAGE_SIZES[type];
  return `${env.TMDB_IMAGE_BASE_URL}/${imageSize}${path}`;
};

// Helper function to build TMDB API URLs
export const buildTMDBUrl = (endpoint: string, params?: Record<string, string | number>): string => {
  const url = new URL(`${env.TMDB_BASE_URL}${endpoint}`);
  url.searchParams.append('api_key', env.TMDB_API_KEY);
  url.searchParams.append('language', env.DEFAULT_LANGUAGE);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value.toString());
    });
  }

  return url.toString();
};

// Helper function to build OMDB API URLs
export const buildOMDBUrl = (params: Record<string, string | number>): string => {
  const url = new URL(env.OMDB_BASE_URL);
  url.searchParams.append('apikey', env.OMDB_API_KEY);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value.toString());
  });

  return url.toString();
};

export default env;
