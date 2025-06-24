import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { useWatchlist } from '../context/WatchlistContext';
import WatchlistItem from '../components/watchlist/WatchlistItem';
import WatchlistStats from '../components/watchlist/WatchlistStats';
import WatchlistControls, {
  SortOption,
  FilterOption,
  SortOrder,
} from '../components/watchlist/WatchlistControls';
import WatchlistExport from '../components/watchlist/WatchlistExport';
import WatchlistShare from '../components/watchlist/WatchlistShare';

const WatchlistContainer = styled.div`
  padding: ${({ theme }) => theme.spacing[6]} 0;
  min-height: calc(100vh - ${({ theme }) => theme.layout.headerHeight});
`;

const WatchlistHeader = styled.div`
  background: ${({ theme }) => theme.colors.background.secondary};
  padding: ${({ theme }) => theme.spacing[8]} 0;
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[4]};
  text-align: center;
`;

const WatchlistTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.text.primary};

  ${({ theme }) => theme.mediaQueries.mobile} {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  }
`;

const WatchlistSubtitle = styled.p`
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

const ToolbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  gap: ${({ theme }) => theme.spacing[4]};

  ${({ theme }) => theme.mediaQueries.mobile} {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ToolbarActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
  align-items: center;

  ${({ theme }) => theme.mediaQueries.mobile} {
    justify-content: center;
  }
`;

const WatchlistItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
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
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.durations.fast}
    ${({ theme }) => theme.easings.easeInOut};

  &:hover {
    background: ${({ theme }) => theme.colors.primary[600]};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary[200]};
  }
`;

const NoResultsContainer = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const NoResultsIcon = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const NoResultsTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const NoResultsText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  max-width: 400px;
  margin: 0 auto;
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

const BulkActionsContainer = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
  align-items: center;
  flex-wrap: wrap;
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const BulkActionButton = styled.button<{
  variant?: 'primary' | 'secondary' | 'danger';
}>`
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.durations.fast}
    ${({ theme }) => theme.easings.easeInOut};
  border: none;

  ${({ theme, variant = 'secondary' }) => {
    switch (variant) {
      case 'primary':
        return `
          background: ${theme.colors.primary[500]};
          color: white;
          &:hover { background: ${theme.colors.primary[600]}; }
        `;
      case 'danger':
        return `
          background: ${theme.colors.error[500]};
          color: white;
          &:hover { background: ${theme.colors.error[600]}; }
        `;
      default:
        return `
          background: ${theme.colors.neutral[200]};
          color: ${theme.colors.text.primary};
          &:hover { background: ${theme.colors.neutral[300]}; }
        `;
    }
  }}
`;

const Watchlist: React.FC = () => {
  const {
    watchlist,
    removeFromWatchlist,
    markAsWatched,
    updateUserRating,
    updateNotes,
    clearWatchlist,
  } = useWatchlist();

  const [sortBy, setSortBy] = useState<SortOption>('added_date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [filter, setFilter] = useState<FilterOption>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleExploreClick = () => {
    window.location.href = '/search';
  };

  const handleRemove = (id: number) => {
    removeFromWatchlist(id);
  };

  const handleToggleWatched = (id: number) => {
    markAsWatched(id);
  };

  const handleRatingChange = (id: number, rating: number) => {
    updateUserRating(id, rating);
  };

  const handleNotesChange = (id: number, notes: string) => {
    updateNotes(id, notes);
  };

  const handleClearFilters = () => {
    setFilter('all');
    setSearchQuery('');
    setSortBy('added_date');
    setSortOrder('desc');
  };

  const handleMarkAllWatched = () => {
    const unwatchedItems = filteredAndSortedItems.filter(item => !item.watched);
    unwatchedItems.forEach(item => markAsWatched(item.id));
  };

  const handleMarkAllUnwatched = () => {
    const watchedItems = filteredAndSortedItems.filter(item => item.watched);
    watchedItems.forEach(item => markAsWatched(item.id));
  };

  const handleClearAllFiltered = () => {
    if (
      window.confirm(
        `Are you sure you want to remove all ${filteredAndSortedItems.length} filtered items from your watchlist?`
      )
    ) {
      filteredAndSortedItems.forEach(item => removeFromWatchlist(item.id));
    }
  };

  const filteredAndSortedItems = useMemo(() => {
    let items = [...watchlist];

    // Apply filters
    switch (filter) {
      case 'watched':
        items = items.filter(item => item.watched);
        break;
      case 'unwatched':
        items = items.filter(item => !item.watched);
        break;
      case 'movies':
        items = items.filter(item => item.media_type === 'movie');
        break;
      case 'tv':
        items = items.filter(item => item.media_type === 'tv');
        break;
      default:
        break;
    }

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      items = items.filter(
        item =>
          item.title.toLowerCase().includes(query) ||
          (item.notes && item.notes.toLowerCase().includes(query))
      );
    }

    // Apply sorting
    items.sort((a, b) => {
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
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return items;
  }, [watchlist, filter, searchQuery, sortBy, sortOrder]);

  const showBulkActions = filteredAndSortedItems.length > 1;
  const hasUnwatchedItems = filteredAndSortedItems.some(item => !item.watched);
  const hasWatchedItems = filteredAndSortedItems.some(item => item.watched);

  return (
    <WatchlistContainer>
      <WatchlistHeader>
        <HeaderContent>
          <WatchlistTitle>My Watchlist</WatchlistTitle>
          <WatchlistSubtitle>
            Keep track of movies and TV shows you want to watch
          </WatchlistSubtitle>
        </HeaderContent>
      </WatchlistHeader>

      <ContentContainer>
        {watchlist.length === 0 ? (
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
            <WatchlistStats items={watchlist} />

            <ToolbarContainer>
              <div style={{ flex: 1 }}>
                <WatchlistControls
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  filter={filter}
                  searchQuery={searchQuery}
                  resultsCount={filteredAndSortedItems.length}
                  totalCount={watchlist.length}
                  onSortChange={setSortBy}
                  onSortOrderChange={setSortOrder}
                  onFilterChange={setFilter}
                  onSearchChange={setSearchQuery}
                  onClearFilters={handleClearFilters}
                />
              </div>
              <ToolbarActions>
                <WatchlistShare
                  watchlist={watchlist}
                  filteredItems={filteredAndSortedItems}
                />
                <WatchlistExport
                  watchlist={watchlist}
                  filteredItems={filteredAndSortedItems}
                />
              </ToolbarActions>
            </ToolbarContainer>

            {showBulkActions && (
              <BulkActionsContainer>
                <span style={{ fontWeight: 'medium', fontSize: '14px' }}>
                  Bulk Actions:
                </span>
                {hasUnwatchedItems && (
                  <BulkActionButton
                    variant="primary"
                    onClick={handleMarkAllWatched}
                  >
                    Mark All as Watched
                  </BulkActionButton>
                )}
                {hasWatchedItems && (
                  <BulkActionButton
                    variant="secondary"
                    onClick={handleMarkAllUnwatched}
                  >
                    Mark All as Unwatched
                  </BulkActionButton>
                )}
                <BulkActionButton
                  variant="danger"
                  onClick={handleClearAllFiltered}
                >
                  Remove All Filtered Items
                </BulkActionButton>
                {watchlist.length > filteredAndSortedItems.length && (
                  <BulkActionButton
                    variant="danger"
                    onClick={() => {
                      if (
                        window.confirm(
                          'Are you sure you want to clear your entire watchlist? This action cannot be undone.'
                        )
                      ) {
                        clearWatchlist();
                      }
                    }}
                  >
                    Clear Entire Watchlist
                  </BulkActionButton>
                )}
              </BulkActionsContainer>
            )}

            {filteredAndSortedItems.length === 0 ? (
              <NoResultsContainer>
                <NoResultsIcon>🔍</NoResultsIcon>
                <NoResultsTitle>No items match your filters</NoResultsTitle>
                <NoResultsText>
                  Try adjusting your search terms or filters to find what you're
                  looking for.
                </NoResultsText>
              </NoResultsContainer>
            ) : (
              <WatchlistItems>
                {filteredAndSortedItems.map(item => (
                  <WatchlistItem
                    key={`${item.id}-${item.media_type}`}
                    item={item}
                    onRemove={handleRemove}
                    onToggleWatched={handleToggleWatched}
                    onRatingChange={handleRatingChange}
                    onNotesChange={handleNotesChange}
                  />
                ))}
              </WatchlistItems>
            )}
          </>
        )}
      </ContentContainer>
    </WatchlistContainer>
  );
};

export default Watchlist;
