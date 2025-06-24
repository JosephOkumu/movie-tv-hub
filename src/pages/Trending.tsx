import React from 'react';
import styled from 'styled-components';

const TrendingContainer = styled.div`
  padding: ${({ theme }) => theme.spacing[6]} 0;
  min-height: calc(100vh - ${({ theme }) => theme.layout.headerHeight});
`;

const TrendingHeader = styled.div`
  background: ${({ theme }) => theme.colors.background.secondary};
  padding: ${({ theme }) => theme.spacing[8]} 0;
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const TrendingTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.text.primary};

  ${({ theme }) => theme.mediaQueries.mobile} {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  }
`;

const TrendingSubtitle = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  max-width: 600px;
  margin: 0 auto;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[4]};
`;

const FilterContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const FilterChip = styled.button<{ active?: boolean }>`
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
  border: 2px solid ${({ theme, active }) =>
    active ? theme.colors.primary[500] : theme.colors.border.light};
  background: ${({ theme, active }) =>
    active ? theme.colors.primary[50] : theme.colors.background.primary};
  color: ${({ theme, active }) =>
    active ? theme.colors.primary[700] : theme.colors.text.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.durations.fast} ${({ theme }) => theme.easings.easeInOut};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary[400]};
    background: ${({ theme }) => theme.colors.primary[50]};
  }
`;

const TimeWindowContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const TimeWindowButton = styled.button<{ active?: boolean }>`
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
  background: ${({ theme, active }) =>
    active ? theme.colors.accent[500] : theme.colors.background.secondary};
  color: ${({ theme, active }) =>
    active ? 'white' : theme.colors.text.secondary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.durations.fast} ${({ theme }) => theme.easings.easeInOut};

  &:hover {
    background: ${({ theme, active }) =>
      active ? theme.colors.accent[600] : theme.colors.background.tertiary};
  }
`;

const PlaceholderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing[6]};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const PlaceholderCard = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[4]};
  box-shadow: ${({ theme }) => theme.shadows.md};
  text-align: center;
  transition: transform ${({ theme }) => theme.durations.fast} ${({ theme }) => theme.easings.easeInOut};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const PlaceholderPoster = styled.div`
  width: 100%;
  height: 250px;
  background: ${({ theme }) => theme.colors.neutral[200]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  color: ${({ theme }) => theme.colors.neutral[400]};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

const PlaceholderTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const PlaceholderMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const RatingBadge = styled.span`
  background: ${({ theme }) => theme.colors.rating.good};
  color: white;
  padding: ${({ theme }) => theme.spacing[0.5]} ${({ theme }) => theme.spacing[1.5]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing[12]} ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const LoadingIcon = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['6xl']};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const LoadingTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const LoadingText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  max-width: 500px;
  margin: 0 auto;
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

const Trending: React.FC = () => {
  const [activeFilter, setActiveFilter] = React.useState<'all' | 'movie' | 'tv'>('all');
  const [timeWindow, setTimeWindow] = React.useState<'day' | 'week'>('week');

  // Mock trending data - will be replaced with actual API calls
  const mockTrendingItems = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    title: `Trending ${activeFilter === 'tv' ? 'Show' : 'Movie'} ${index + 1}`,
    rating: (Math.random() * 3 + 7).toFixed(1),
    year: 2024 - Math.floor(Math.random() * 5),
    type: activeFilter === 'tv' ? 'TV Show' : 'Movie',
  }));

  return (
    <TrendingContainer>
      <TrendingHeader>
        <div className="container">
          <TrendingTitle>Trending Now</TrendingTitle>
          <TrendingSubtitle>
            Discover what's popular and trending in movies and TV shows
          </TrendingSubtitle>
        </div>
      </TrendingHeader>

      <ContentContainer>
        <FilterContainer>
          <FilterChip
            active={activeFilter === 'all'}
            onClick={() => setActiveFilter('all')}
          >
            🔥 All Trending
          </FilterChip>
          <FilterChip
            active={activeFilter === 'movie'}
            onClick={() => setActiveFilter('movie')}
          >
            🎬 Movies
          </FilterChip>
          <FilterChip
            active={activeFilter === 'tv'}
            onClick={() => setActiveFilter('tv')}
          >
            📺 TV Shows
          </FilterChip>
        </FilterContainer>

        <TimeWindowContainer>
          <TimeWindowButton
            active={timeWindow === 'day'}
            onClick={() => setTimeWindow('day')}
          >
            Today
          </TimeWindowButton>
          <TimeWindowButton
            active={timeWindow === 'week'}
            onClick={() => setTimeWindow('week')}
          >
            This Week
          </TimeWindowButton>
        </TimeWindowContainer>

        <PlaceholderGrid>
          {mockTrendingItems.map((item) => (
            <PlaceholderCard key={item.id}>
              <PlaceholderPoster>
                {activeFilter === 'tv' ? '📺' : '🎬'}
              </PlaceholderPoster>
              <PlaceholderTitle>{item.title}</PlaceholderTitle>
              <PlaceholderMeta>
                <span>{item.year}</span>
                <RatingBadge>{item.rating}</RatingBadge>
              </PlaceholderMeta>
            </PlaceholderCard>
          ))}
        </PlaceholderGrid>

        <LoadingMessage>
          <LoadingIcon>🚀</LoadingIcon>
          <LoadingTitle>Trending Content Coming Soon</LoadingTitle>
          <LoadingText>
            Real trending data from TMDB API will be displayed here once the
            trending functionality is fully implemented with proper API integration.
          </LoadingText>
        </LoadingMessage>
      </ContentContainer>
    </TrendingContainer>
  );
};

export default Trending;
