import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Movie, TVShow } from '../types';
import { TMDBService } from '../services/tmdb';
import MediaCarousel from '../components/trending/MediaCarousel';
import TrendingFilters from '../components/trending/TrendingFilters';
import LoadingSpinner from '../components/common/LoadingSpinner';

const TrendingContainer = styled.div`
  min-height: calc(100vh - ${({ theme }) => theme.layout.headerHeight});
  padding: ${({ theme }) => theme.spacing[6]} 0;
`;

const TrendingHeader = styled.div`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary[500]} 0%,
    ${({ theme }) => theme.colors.primary[700]} 100%
  );
  color: white;
  padding: ${({ theme }) => theme.spacing[12]} 0
    ${({ theme }) => theme.spacing[8]};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  text-align: center;
`;

const HeaderTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing[4]};

  ${({ theme }) => theme.mediaQueries.mobile} {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  }
`;

const HeaderSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  line-height: ${({ theme }) => theme.lineHeights.relaxed};

  ${({ theme }) => theme.mediaQueries.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.base};
    padding: 0 ${({ theme }) => theme.spacing[4]};
  }
`;

const ContentContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const SectionContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[12]};
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing[12]}
    ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ErrorIcon = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['6xl']};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const ErrorTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ErrorText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
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

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[8]};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  flex-wrap: wrap;
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[6]};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  text-align: center;
  min-width: 150px;
`;

const StatNumber = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary[500]};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const Trending: React.FC = () => {
  const [timeWindow, setTimeWindow] = useState<'day' | 'week'>('week');
  const [mediaType, setMediaType] = useState<'all' | 'movie' | 'tv'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Content state
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [trendingTVShows, setTrendingTVShows] = useState<TVShow[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [popularTVShows, setPopularTVShows] = useState<TVShow[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [topRatedTVShows, setTopRatedTVShows] = useState<TVShow[]>([]);

  const fetchTrendingContent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const promises = [];

      // Always fetch movie and TV content separately for better type safety
      promises.push(
        TMDBService.getTrendingMovies(timeWindow, 1).then(response =>
          setTrendingMovies(response.results.slice(0, 20))
        ),
        TMDBService.getTrendingTVShows(timeWindow, 1).then(response =>
          setTrendingTVShows(response.results.slice(0, 20))
        )
      );

      if (mediaType === 'movie' || mediaType === 'all') {
        promises.push(
          TMDBService.getPopularMovies(1).then(response =>
            setPopularMovies(response.results.slice(0, 20))
          ),
          TMDBService.getTopRatedMovies(1).then(response =>
            setTopRatedMovies(response.results.slice(0, 20))
          )
        );
      }

      if (mediaType === 'tv' || mediaType === 'all') {
        promises.push(
          TMDBService.getPopularTVShows(1).then(response =>
            setPopularTVShows(response.results.slice(0, 20))
          ),
          TMDBService.getTopRatedTVShows(1).then(response =>
            setTopRatedTVShows(response.results.slice(0, 20))
          )
        );
      }

      await Promise.all(promises);
    } catch (err) {
      console.error('Error fetching trending content:', err);
      setError('Failed to load trending content. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [timeWindow, mediaType]);

  useEffect(() => {
    fetchTrendingContent();
  }, [fetchTrendingContent]);

  const handleRetry = () => {
    fetchTrendingContent();
  };

  const getTimeWindowText = (): string => {
    return timeWindow === 'day' ? 'Today' : 'This Week';
  };

  const getMediaTypeText = (): string => {
    switch (mediaType) {
      case 'movie':
        return 'Movies';
      case 'tv':
        return 'TV Shows';
      default:
        return 'All Content';
    }
  };

  const getTotalCount = (): number => {
    let count = 0;
    if (mediaType === 'movie' || mediaType === 'all')
      count += trendingMovies.length;
    if (mediaType === 'tv' || mediaType === 'all')
      count += trendingTVShows.length;
    return count;
  };

  const getPopularCount = (): number => {
    if (mediaType === 'movie') return popularMovies.length;
    if (mediaType === 'tv') return popularTVShows.length;
    return popularMovies.length + popularTVShows.length;
  };

  const getTopRatedCount = (): number => {
    if (mediaType === 'movie') return topRatedMovies.length;
    if (mediaType === 'tv') return topRatedTVShows.length;
    return topRatedMovies.length + topRatedTVShows.length;
  };

  if (loading) {
    return (
      <TrendingContainer>
        <TrendingHeader>
          <HeaderTitle>Trending Content</HeaderTitle>
          <HeaderSubtitle>
            Discover what's popular and trending right now
          </HeaderSubtitle>
        </TrendingHeader>
        <LoadingContainer>
          <LoadingSpinner size="large" />
        </LoadingContainer>
      </TrendingContainer>
    );
  }

  if (error) {
    return (
      <TrendingContainer>
        <TrendingHeader>
          <HeaderTitle>Trending Content</HeaderTitle>
          <HeaderSubtitle>
            Discover what's popular and trending right now
          </HeaderSubtitle>
        </TrendingHeader>
        <ErrorContainer>
          <ErrorIcon>😞</ErrorIcon>
          <ErrorTitle>Oops! Something went wrong</ErrorTitle>
          <ErrorText>{error}</ErrorText>
          <RetryButton onClick={handleRetry}>Try Again</RetryButton>
        </ErrorContainer>
      </TrendingContainer>
    );
  }

  return (
    <TrendingContainer>
      <TrendingHeader>
        <HeaderTitle>Trending {getMediaTypeText()}</HeaderTitle>
        <HeaderSubtitle>
          Discover what's popular and trending{' '}
          {getTimeWindowText().toLowerCase()}
        </HeaderSubtitle>
      </TrendingHeader>

      <ContentContainer>
        <TrendingFilters
          timeWindow={timeWindow}
          mediaType={mediaType}
          onTimeWindowChange={setTimeWindow}
          onMediaTypeChange={setMediaType}
        />

        <StatsContainer>
          <StatCard>
            <StatNumber>{getTotalCount()}</StatNumber>
            <StatLabel>Trending {getTimeWindowText()}</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{getPopularCount()}</StatNumber>
            <StatLabel>Popular Items</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{getTopRatedCount()}</StatNumber>
            <StatLabel>Top Rated</StatLabel>
          </StatCard>
        </StatsContainer>

        {/* Trending Movies */}
        {(mediaType === 'movie' || mediaType === 'all') &&
          trendingMovies.length > 0 && (
            <SectionContainer>
              <MediaCarousel
                items={trendingMovies}
                title={`🎬 Trending Movies ${getTimeWindowText()}`}
                mediaType="movie"
                showWatchlistButton={true}
              />
            </SectionContainer>
          )}

        {/* Trending TV Shows */}
        {(mediaType === 'tv' || mediaType === 'all') &&
          trendingTVShows.length > 0 && (
            <SectionContainer>
              <MediaCarousel
                items={trendingTVShows}
                title={`📺 Trending TV Shows ${getTimeWindowText()}`}
                mediaType="tv"
                showWatchlistButton={true}
              />
            </SectionContainer>
          )}

        {/* Popular Movies */}
        {(mediaType === 'movie' || mediaType === 'all') &&
          popularMovies.length > 0 && (
            <SectionContainer>
              <MediaCarousel
                items={popularMovies}
                title="⭐ Popular Movies"
                mediaType="movie"
                showWatchlistButton={true}
              />
            </SectionContainer>
          )}

        {/* Popular TV Shows */}
        {(mediaType === 'tv' || mediaType === 'all') &&
          popularTVShows.length > 0 && (
            <SectionContainer>
              <MediaCarousel
                items={popularTVShows}
                title="⭐ Popular TV Shows"
                mediaType="tv"
                showWatchlistButton={true}
              />
            </SectionContainer>
          )}

        {/* Top Rated Movies */}
        {(mediaType === 'movie' || mediaType === 'all') &&
          topRatedMovies.length > 0 && (
            <SectionContainer>
              <MediaCarousel
                items={topRatedMovies}
                title="🏆 Top Rated Movies"
                mediaType="movie"
                showWatchlistButton={true}
              />
            </SectionContainer>
          )}

        {/* Top Rated TV Shows */}
        {(mediaType === 'tv' || mediaType === 'all') &&
          topRatedTVShows.length > 0 && (
            <SectionContainer>
              <MediaCarousel
                items={topRatedTVShows}
                title="🏆 Top Rated TV Shows"
                mediaType="tv"
                showWatchlistButton={true}
              />
            </SectionContainer>
          )}
      </ContentContainer>
    </TrendingContainer>
  );
};

export default Trending;
