import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { WatchlistItem, WatchlistContextType, Movie, TVShow, MediaType } from '../types';

// Local storage key
const WATCHLIST_STORAGE_KEY = 'movie-tv-hub-watchlist';

// Action types
type WatchlistAction =
  | { type: 'ADD_TO_WATCHLIST'; payload: { item: Movie | TVShow; mediaType: MediaType } }
  | { type: 'REMOVE_FROM_WATCHLIST'; payload: { id: number } }
  | { type: 'MARK_AS_WATCHED'; payload: { id: number } }
  | { type: 'UPDATE_USER_RATING'; payload: { id: number; rating: number } }
  | { type: 'UPDATE_NOTES'; payload: { id: number; notes: string } }
  | { type: 'CLEAR_WATCHLIST' }
  | { type: 'LOAD_WATCHLIST'; payload: { watchlist: WatchlistItem[] } };

// Initial state
interface WatchlistState {
  watchlist: WatchlistItem[];
}

const initialState: WatchlistState = {
  watchlist: [],
};

// Reducer function
const watchlistReducer = (state: WatchlistState, action: WatchlistAction): WatchlistState => {
  switch (action.type) {
    case 'ADD_TO_WATCHLIST': {
      const { item, mediaType } = action.payload;

      // Check if item already exists
      const existingIndex = state.watchlist.findIndex(w => w.id === item.id && w.media_type === mediaType);
      if (existingIndex !== -1) {
        return state; // Item already in watchlist
      }

      const newWatchlistItem: WatchlistItem = {
        id: item.id,
        media_type: mediaType,
        title: mediaType === 'movie' ? (item as Movie).title : (item as TVShow).name,
        poster_path: item.poster_path,
        vote_average: item.vote_average,
        release_date: mediaType === 'movie'
          ? (item as Movie).release_date
          : (item as TVShow).first_air_date,
        added_date: new Date().toISOString(),
        watched: false,
      };

      return {
        ...state,
        watchlist: [...state.watchlist, newWatchlistItem],
      };
    }

    case 'REMOVE_FROM_WATCHLIST': {
      return {
        ...state,
        watchlist: state.watchlist.filter(item => item.id !== action.payload.id),
      };
    }

    case 'MARK_AS_WATCHED': {
      return {
        ...state,
        watchlist: state.watchlist.map(item =>
          item.id === action.payload.id
            ? { ...item, watched: !item.watched }
            : item
        ),
      };
    }

    case 'UPDATE_USER_RATING': {
      return {
        ...state,
        watchlist: state.watchlist.map(item =>
          item.id === action.payload.id
            ? { ...item, user_rating: action.payload.rating }
            : item
        ),
      };
    }

    case 'UPDATE_NOTES': {
      return {
        ...state,
        watchlist: state.watchlist.map(item =>
          item.id === action.payload.id
            ? { ...item, notes: action.payload.notes }
            : item
        ),
      };
    }

    case 'CLEAR_WATCHLIST': {
      return {
        ...state,
        watchlist: [],
      };
    }

    case 'LOAD_WATCHLIST': {
      return {
        ...state,
        watchlist: action.payload.watchlist,
      };
    }

    default:
      return state;
  }
};

// Create context
const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

// Provider component
interface WatchlistProviderProps {
  children: ReactNode;
}

export const WatchlistProvider: React.FC<WatchlistProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(watchlistReducer, initialState);

  // Load watchlist from localStorage on mount
  useEffect(() => {
    try {
      const savedWatchlist = localStorage.getItem(WATCHLIST_STORAGE_KEY);
      if (savedWatchlist) {
        const parsedWatchlist: WatchlistItem[] = JSON.parse(savedWatchlist);
        dispatch({ type: 'LOAD_WATCHLIST', payload: { watchlist: parsedWatchlist } });
      }
    } catch (error) {
      console.error('Error loading watchlist from localStorage:', error);
    }
  }, []);

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(state.watchlist));
    } catch (error) {
      console.error('Error saving watchlist to localStorage:', error);
    }
  }, [state.watchlist]);

  // Context value
  const contextValue: WatchlistContextType = {
    watchlist: state.watchlist,

    addToWatchlist: (item: Movie | TVShow, mediaType: MediaType) => {
      dispatch({ type: 'ADD_TO_WATCHLIST', payload: { item, mediaType } });
    },

    removeFromWatchlist: (id: number) => {
      dispatch({ type: 'REMOVE_FROM_WATCHLIST', payload: { id } });
    },

    markAsWatched: (id: number) => {
      dispatch({ type: 'MARK_AS_WATCHED', payload: { id } });
    },

    updateUserRating: (id: number, rating: number) => {
      dispatch({ type: 'UPDATE_USER_RATING', payload: { id, rating } });
    },

    updateNotes: (id: number, notes: string) => {
      dispatch({ type: 'UPDATE_NOTES', payload: { id, notes } });
    },

    clearWatchlist: () => {
      dispatch({ type: 'CLEAR_WATCHLIST' });
    },

    isInWatchlist: (id: number) => {
      return state.watchlist.some(item => item.id === id);
    },
  };

  return (
    <WatchlistContext.Provider value={contextValue}>
      {children}
    </WatchlistContext.Provider>
  );
};

// Custom hook to use the watchlist context
export const useWatchlist = (): WatchlistContextType => {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
};

// Utility functions for watchlist operations
export const getWatchlistStats = (watchlist: WatchlistItem[]) => {
  const total = watchlist.length;
  const watched = watchlist.filter(item => item.watched).length;
  const unwatched = total - watched;
  const movies = watchlist.filter(item => item.media_type === 'movie').length;
  const tvShows = watchlist.filter(item => item.media_type === 'tv').length;

  return {
    total,
    watched,
    unwatched,
    movies,
    tvShows,
  };
};

export const getWatchlistByStatus = (watchlist: WatchlistItem[], watched: boolean) => {
  return watchlist.filter(item => item.watched === watched);
};

export const getWatchlistByType = (watchlist: WatchlistItem[], mediaType: MediaType) => {
  return watchlist.filter(item => item.media_type === mediaType);
};

export const sortWatchlist = (
  watchlist: WatchlistItem[],
  sortBy: 'added_date' | 'title' | 'release_date' | 'vote_average' | 'user_rating',
  order: 'asc' | 'desc' = 'desc'
) => {
  return [...watchlist].sort((a, b) => {
    let valueA: string | number | undefined;
    let valueB: string | number | undefined;

    switch (sortBy) {
      case 'added_date':
        valueA = new Date(a.added_date).getTime();
        valueB = new Date(b.added_date).getTime();
        break;
      case 'title':
        valueA = a.title.toLowerCase();
        valueB = b.title.toLowerCase();
        break;
      case 'release_date':
        valueA = new Date(a.release_date || '1900-01-01').getTime();
        valueB = new Date(b.release_date || '1900-01-01').getTime();
        break;
      case 'vote_average':
        valueA = a.vote_average;
        valueB = b.vote_average;
        break;
      case 'user_rating':
        valueA = a.user_rating || 0;
        valueB = b.user_rating || 0;
        break;
      default:
        return 0;
    }

    if (valueA < valueB) {
      return order === 'asc' ? -1 : 1;
    }
    if (valueA > valueB) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });
};

// Export default context for direct usage if needed
export default WatchlistContext;
