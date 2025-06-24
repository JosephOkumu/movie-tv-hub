import { useState } from 'react';
import { useQuery } from 'react-query';
import { TMDBService } from '../services/tmdb';
import { SearchResult } from '../types';
import { useDebounce } from './useDebounce';

export interface UseSearchOptions {
  enabled?: boolean;
  debounceMs?: number;
}

export interface UseSearchReturn {
  results: SearchResult[];
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  totalResults: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  refetch: () => void;
}

/**
 * Custom hook for search functionality with debouncing and pagination
 */
export const useSearch = (
  query: string,
  mediaType: 'all' | 'movie' | 'tv' = 'all',
  page: number = 1,
  options: UseSearchOptions = {}
): UseSearchReturn => {
  const { enabled = true, debounceMs = 500 } = options;
  const [error, setError] = useState<string | null>(null);

  // Debounce the search query to avoid excessive API calls
  const debouncedQuery = useDebounce(query.trim(), debounceMs);

  // Only search if query is at least 2 characters and enabled
  const shouldSearch = enabled && debouncedQuery.length >= 2;

  const searchQuery = useQuery(
    ['search', debouncedQuery, mediaType, page],
    async () => {
      setError(null);

      try {
        if (mediaType === 'all') {
          return await TMDBService.searchMulti(debouncedQuery, page);
        } else if (mediaType === 'movie') {
          const movieResults = await TMDBService.searchMovies(
            debouncedQuery,
            page
          );
          return {
            ...movieResults,
            results: movieResults.results.map(movie => ({
              ...movie,
              media_type: 'movie' as const,
            })),
          };
        } else {
          const tvResults = await TMDBService.searchTVShows(
            debouncedQuery,
            page
          );
          return {
            ...tvResults,
            results: tvResults.results.map(show => ({
              ...show,
              media_type: 'tv' as const,
            })),
          };
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Search failed';
        setError(errorMessage);
        throw err;
      }
    },
    {
      enabled: shouldSearch,
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 2,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      onError: err => {
        console.error('Search error:', err);
      },
    }
  );

  const results = searchQuery.data?.results || [];
  const totalResults = searchQuery.data?.total_results || 0;
  const totalPages = searchQuery.data?.total_pages || 0;

  return {
    results,
    isLoading: searchQuery.isLoading,
    isError: searchQuery.isError || !!error,
    error: error || (searchQuery.error as string) || null,
    totalResults,
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
    refetch: searchQuery.refetch,
  };
};

/**
 * Hook for getting popular/trending content as search suggestions
 */
export const useSearchSuggestions = () => {
  const popularMovies = useQuery(
    'popular-movies',
    () => TMDBService.getPopularMovies(1),
    {
      staleTime: 10 * 60 * 1000, // 10 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
    }
  );

  const popularTVShows = useQuery(
    'popular-tv',
    () => TMDBService.getPopularTVShows(1),
    {
      staleTime: 10 * 60 * 1000, // 10 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
    }
  );

  const suggestions = [
    ...(popularMovies.data?.results.slice(0, 5) || []).map(movie => ({
      id: movie.id,
      title: movie.title,
      media_type: 'movie' as const,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
    })),
    ...(popularTVShows.data?.results.slice(0, 5) || []).map(show => ({
      id: show.id,
      title: show.name,
      media_type: 'tv' as const,
      poster_path: show.poster_path,
      vote_average: show.vote_average,
    })),
  ];

  return {
    suggestions,
    isLoading: popularMovies.isLoading || popularTVShows.isLoading,
    isError: popularMovies.isError || popularTVShows.isError,
  };
};

export default useSearch;
