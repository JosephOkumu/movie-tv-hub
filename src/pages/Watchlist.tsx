import React from 'react';
import styled from 'styled-components';

const WatchlistContainer = styled.div`
  padding: ${({ theme }) => theme.spacing[6]} 0;
  min-height: calc(100vh - ${({ theme }) => theme.layout.headerHeight});
`;

const WatchlistHeader = styled.div`
  background: ${({ theme }) => theme.colors.background.secondary};
  padding: ${({ theme }) => theme.spacing[8]} 0;
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const WatchlistTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.text.primary};

  ${({ theme }) => theme.mediaQueries.mobile} {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  }
`;

const WatchlistSubtitle = styled.p`
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
  border: 2px solid
    ${({ theme, active }) =>
      active ? theme.colors.primary[500] : theme.colors.border.light};
  background: ${({ theme, active }) =>
    active ? theme.colors.primary[50] : theme.colors.background.primary};
  color: ${({ theme, active }) =>
    active ? theme.colors.primary[700] : theme.colors.text.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.durations.fast}
    ${({ theme }) => theme.easings.easeInOut};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary[400]};
    background: ${({ theme }) => theme.colors.primary[50]};
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[6]};
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const StatValue = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary[600]};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const StatLabel = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing[12]}
    ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const EmptyIcon = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['6xl']};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const EmptyTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const EmptyText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  max-width: 500px;
  margin: 0 auto ${({ theme }) => theme.spacing[6]};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

const CTAButton = styled.button`
  background: ${({ theme }) => theme.colors.primary[500]};
  color: white;
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.durations.fast}
    ${({ theme }) => theme.easings.easeInOut};

  &:hover {
    background: ${({ theme }) => theme.colors.primary[600]};
  }
`;

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  flex-wrap: wrap;
`;

const SortLabel = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const SortSelect = styled.select`
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

const Watchlist: React.FC = () => {
  const [activeFilter, setActiveFilter] = React.useState<
    'all' | 'watched' | 'unwatched' | 'movies' | 'tv'
  >('all');
  const [sortBy, setSortBy] = React.useState<
    'added_date' | 'title' | 'release_date' | 'rating'
  >('added_date');

  // Mock data - will be replaced with actual watchlist context
  const mockStats = {
    total: 0,
    watched: 0,
    unwatched: 0,
    movies: 0,
    tvShows: 0,
  };

  const handleExploreClick = () => {
    // Navigate to search or trending page
    window.location.href = '/search';
  };

  return (
    <WatchlistContainer>
      <WatchlistHeader>
        <div className="container">
          <WatchlistTitle>My Watchlist</WatchlistTitle>
          <WatchlistSubtitle>
            Keep track of movies and TV shows you want to watch
          </WatchlistSubtitle>
        </div>
      </WatchlistHeader>

      <ContentContainer>
        <StatsContainer>
          <StatCard>
            <StatValue>{mockStats.total}</StatValue>
            <StatLabel>Total Items</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{mockStats.watched}</StatValue>
            <StatLabel>Watched</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{mockStats.unwatched}</StatValue>
            <StatLabel>To Watch</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{mockStats.movies}</StatValue>
            <StatLabel>Movies</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{mockStats.tvShows}</StatValue>
            <StatLabel>TV Shows</StatLabel>
          </StatCard>
        </StatsContainer>

        {mockStats.total === 0 ? (
          <EmptyState>
            <EmptyIcon>📝</EmptyIcon>
            <EmptyTitle>Your watchlist is empty</EmptyTitle>
            <EmptyText>
              Start building your watchlist by searching for movies and TV shows
              you want to watch. You can add items to your watchlist from search
              results or detail pages.
            </EmptyText>
            <CTAButton onClick={handleExploreClick}>Start Exploring</CTAButton>
          </EmptyState>
        ) : (
          <>
            <FilterContainer>
              <FilterChip
                active={activeFilter === 'all'}
                onClick={() => setActiveFilter('all')}
              >
                All ({mockStats.total})
              </FilterChip>
              <FilterChip
                active={activeFilter === 'unwatched'}
                onClick={() => setActiveFilter('unwatched')}
              >
                To Watch ({mockStats.unwatched})
              </FilterChip>
              <FilterChip
                active={activeFilter === 'watched'}
                onClick={() => setActiveFilter('watched')}
              >
                Watched ({mockStats.watched})
              </FilterChip>
              <FilterChip
                active={activeFilter === 'movies'}
                onClick={() => setActiveFilter('movies')}
              >
                Movies ({mockStats.movies})
              </FilterChip>
              <FilterChip
                active={activeFilter === 'tv'}
                onClick={() => setActiveFilter('tv')}
              >
                TV Shows ({mockStats.tvShows})
              </FilterChip>
            </FilterContainer>

            <SortContainer>
              <SortLabel>Sort by:</SortLabel>
              <SortSelect
                value={sortBy}
                onChange={e =>
                  setSortBy(
                    e.target.value as
                      | 'added_date'
                      | 'title'
                      | 'release_date'
                      | 'rating'
                  )
                }
              >
                <option value="added_date">Date Added</option>
                <option value="title">Title</option>
                <option value="release_date">Release Date</option>
                <option value="rating">Rating</option>
              </SortSelect>
            </SortContainer>

            {/* Watchlist items will be rendered here */}
            <EmptyState>
              <EmptyIcon>🔄</EmptyIcon>
              <EmptyTitle>Watchlist functionality coming soon</EmptyTitle>
              <EmptyText>
                The watchlist display and management features will be
                implemented in the next development phase.
              </EmptyText>
            </EmptyState>
          </>
        )}
      </ContentContainer>
    </WatchlistContainer>
  );
};

export default Watchlist;
