import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import { WatchlistProvider } from './context/WatchlistContext';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Search from './pages/Search';
import MovieDetail from './pages/MovieDetail';
import TVDetail from './pages/TVDetail';
import Watchlist from './pages/Watchlist';
import Trending from './pages/Trending';
import NotFound from './pages/NotFound';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <WatchlistProvider>
          <Router>
            <GlobalStyles />
            <div className="App">
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/trending" element={<Trending />} />
                  <Route path="/movie/:id" element={<MovieDetail />} />
                  <Route path="/tv/:id" element={<TVDetail />} />
                  <Route path="/watchlist" element={<Watchlist />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </WatchlistProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
