import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Movie, TVShow } from '../types';
import { TMDBService } from '../services/tmdb';
import MediaCarousel from '../components/trending/MediaCarousel';
import LoadingSpinner from '../components/common/LoadingSpinner';

const HomeContainer = styled.div`
  min-height: calc(100vh - ${({ theme }) => theme.layout.headerHeight});
`;

const Hero = styled.section`
  position: relative;
  text-align: center;
  padding: ${({ theme }) => theme.spacing[20]} 0
    ${({ theme }) => theme.spacing[12]};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary[500]} 0%,
    ${({ theme }) => theme.colors.primary[700]} 30%,
    ${({ theme }) => theme.colors.secondary[600]} 70%,
    ${({ theme }) => theme.colors.accent[500]} 100%
  );
  color: white;
  margin-bottom: ${({ theme }) => theme.spacing[12]};
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(
      to bottom,
      transparent,
      ${({ theme }) => theme.colors.background.primary}
    );
    z-index: 2;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 3;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[4]};
`;

const HeroTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['6xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  line-height: ${({ theme }) => theme.lineHeights.tight};

  ${({ theme }) => theme.mediaQueries.tablet} {
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
  }

  ${({ theme }) => theme.mediaQueries.mobile} {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
  }
`;

const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  color: rgba(255, 255, 255, 0.95);
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);

  ${({ theme }) => theme.mediaQueries.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

const CTAContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  justify-content: center;
  flex-wrap: wrap;
`;

const CTAButton = styled(Link)<{ variant?: 'primary' | 'secondary' }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[8]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-decoration: none;
  transition: all ${({ theme }) => theme.durations.normal}
    ${({ theme }) => theme.easings.easeInOut};
  box-shadow: ${({ theme }) => theme.shadows.lg};

  ${({ theme, variant = 'primary' }) =>
    variant === 'primary'
      ? `
        background: ${theme.colors.accent[500]};
        color: white;
        border: 2px solid ${theme.colors.accent[500]};

        &:hover {
          background: ${theme.colors.accent[600]};
          border-color: ${theme.colors.accent[600]};
          transform: translateY(-3px);
          box-shadow: ${theme.shadows.xl};
        }
      `
      : `
        background: rgba(255, 255, 255, 0.2);
        color: white;
        border: 2px solid rgba(255, 255, 255, 0.3);
        backdrop-filter: blur(10px);

        &:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-3px);
        }
      `}

  ${({ theme }) => theme.mediaQueries.mobile} {
    padding: ${({ theme }) => theme.spacing[3]}
      ${({ theme }) => theme.spacing[6]};
    font-size: ${({ theme }) => theme.fontSizes.base};
  }
`;

const ContentContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const SectionContainer = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing[12]};
`;

const FeaturesSection = styled.section`
  padding: ${({ theme }) => theme.spacing[12]}
    ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.colors.background.secondary};
  margin-bottom: ${({ theme }) => theme.spacing[12]};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  color: ${({ theme }) => theme.colors.text.primary};

  ${({ theme }) => theme.mediaQueries.mobile} {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing[6]};
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[6]};
  box-shadow: ${({ theme }) => theme.shadows.md};
  text-align: center;
  transition: all ${({ theme }) => theme.durations.normal}
    ${({ theme }) => theme.easings.easeInOut};

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary[500]},
    ${({ theme }) => theme.colors.primary[600]}
  );
  border-radius: ${({ theme }) => theme.borderRadius.full};
  margin: 0 auto ${({ theme }) => theme.spacing[4]};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  color: white;
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const FeatureTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing[12]}
    ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ErrorText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const RetryButton = styled.button`
  background: ${({ theme }) => theme.colors.primary[500]};
  color: white;
  border: none;
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.durations.fast}
    ${({ theme }) => theme.easings.easeInOut};

  &:hover {
    background: ${({ theme }) => theme.colors.primary[600]};
    transform: translateY(-2px);
  }
`;

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Content state
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [trendingTVShows, setTrendingTVShows] = useState<TVShow[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [popularTVShows, setPopularTVShows] = useState<TVShow[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [topRatedTVShows, setTopRatedTVShows] = useState<TVShow[]>([]);

  const fetchHomeContent = async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        trendingMoviesResponse,
        trendingTVResponse,
        popularMoviesResponse,
        popularTVResponse,
        nowPlayingResponse,
        topRatedMoviesResponse,
        topRatedTVResponse,
      ] = await Promise.all([
        TMDBService.getTrendingMovies('week', 1),
        TMDBService.getTrendingTVShows('week', 1),
        TMDBService.getPopularMovies(1),
        TMDBService.getPopularTVShows(1),
        TMDBService.getNowPlayingMovies(1),
        TMDBService.getTopRatedMovies(1),
        TMDBService.getTopRatedTVShows(1),
      ]);

      setTrendingMovies(trendingMoviesResponse.results.slice(0, 15));
      setTrendingTVShows(trendingTVResponse.results.slice(0, 15));
      setPopularMovies(popularMoviesResponse.results.slice(0, 15));
      setPopularTVShows(popularTVResponse.results.slice(0, 15));
      setNowPlayingMovies(nowPlayingResponse.results.slice(0, 15));
      setTopRatedMovies(topRatedMoviesResponse.results.slice(0, 15));
      setTopRatedTVShows(topRatedTVResponse.results.slice(0, 15));
    } catch (err) {
      console.error('Error fetching home content:', err);
      setError('Failed to load content. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeContent();
  }, []);

  const handleRetry = () => {
    fetchHomeContent();
  };

  const features = [
    {
      icon: '🔍',
      title: 'Smart Search',
      description:
        'Find movies and TV shows with our intelligent search featuring real-time results and advanced filtering options.',
    },
    {
      icon: '📝',
      title: 'Personal Watchlist',
      description:
        'Create and manage your personal watchlist, mark items as watched, and add your own ratings and notes.',
    },
    {
      icon: '🔥',
      title: 'Trending Content',
      description:
        'Stay up-to-date with the latest trending movies and TV shows from around the world.',
    },
    {
      icon: '⭐',
      title: 'Multiple Ratings',
      description:
        'View ratings from IMDB, Rotten Tomatoes, and TMDB all in one place to make informed viewing decisions.',
    },
  ];

  return (
    <HomeContainer>
      <Hero>
        <HeroContent>
          <HeroTitle>Discover Your Next Favorite</HeroTitle>
          <HeroSubtitle>
            Explore thousands of movies and TV shows, manage your watchlist, and
            discover trending content all in one place.
          </HeroSubtitle>
          <CTAContainer>
            <CTAButton to="/search" variant="primary">
              🔍 Start Exploring
            </CTAButton>
            <CTAButton to="/trending" variant="secondary">
              🔥 View Trending
            </CTAButton>
          </CTAContainer>
        </HeroContent>
      </Hero>

      <ContentContainer>
        {loading ? (
          <LoadingContainer>
            <LoadingSpinner size="large" />
          </LoadingContainer>
        ) : error ? (
          <ErrorContainer>
            <ErrorText>{error}</ErrorText>
            <RetryButton onClick={handleRetry}>Try Again</RetryButton>
          </ErrorContainer>
        ) : (
          <>
            {/* Trending This Week */}
            {trendingMovies.length > 0 && (
              <SectionContainer>
                <MediaCarousel
                  items={trendingMovies}
                  title="🔥 Trending Movies This Week"
                  mediaType="movie"
                  showWatchlistButton={true}
                  loading={false}
                />
              </SectionContainer>
            )}

            {/* Popular This Week TV Shows */}
            {trendingTVShows.length > 0 && (
              <SectionContainer>
                <MediaCarousel
                  items={trendingTVShows}
                  title="📺 Trending TV Shows This Week"
                  mediaType="tv"
                  showWatchlistButton={true}
                  loading={false}
                />
              </SectionContainer>
            )}

            {/* Now Playing Movies */}
            {nowPlayingMovies.length > 0 && (
              <SectionContainer>
                <MediaCarousel
                  items={nowPlayingMovies}
                  title="🎬 Now Playing in Theaters"
                  mediaType="movie"
                  showWatchlistButton={true}
                  loading={false}
                />
              </SectionContainer>
            )}

            {/* Popular Movies */}
            {popularMovies.length > 0 && (
              <SectionContainer>
                <MediaCarousel
                  items={popularMovies}
                  title="⭐ Popular Movies"
                  mediaType="movie"
                  showWatchlistButton={true}
                  loading={false}
                />
              </SectionContainer>
            )}

            {/* Popular TV Shows */}
            {popularTVShows.length > 0 && (
              <SectionContainer>
                <MediaCarousel
                  items={popularTVShows}
                  title="📻 Popular TV Shows"
                  mediaType="tv"
                  showWatchlistButton={true}
                  loading={false}
                />
              </SectionContainer>
            )}

            {/* Top Rated Movies */}
            {topRatedMovies.length > 0 && (
              <SectionContainer>
                <MediaCarousel
                  items={topRatedMovies}
                  title="🏆 Top Rated Movies"
                  mediaType="movie"
                  showWatchlistButton={true}
                  loading={false}
                />
              </SectionContainer>
            )}

            {/* Top Rated TV Shows */}
            {topRatedTVShows.length > 0 && (
              <SectionContainer>
                <MediaCarousel
                  items={topRatedTVShows}
                  title="🏅 Top Rated TV Shows"
                  mediaType="tv"
                  showWatchlistButton={true}
                  loading={false}
                />
              </SectionContainer>
            )}
          </>
        )}
      </ContentContainer>

      {/* Features Section */}
      <FeaturesSection>
        <SectionTitle>Why Choose Movie & TV Hub?</SectionTitle>
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </FeaturesSection>
    </HomeContainer>
  );
};

export default Home;
