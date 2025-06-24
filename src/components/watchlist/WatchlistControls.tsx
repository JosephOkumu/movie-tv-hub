import React from 'react';
import styled from 'styled-components';

const ControlsContainer = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const ControlsRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing[4]};

  &:last-child {
    margin-bottom: 0;
  }

  ${({ theme }) => theme.mediaQueries.mobile} {
    flex-direction: column;
    align-items: stretch;
    gap: ${({ theme }) => theme.spacing[3]};
  }
`;

const ControlGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  flex: 1;
  min-width: 200px;

  ${({ theme }) => theme.mediaQueries.mobile} {
    min-width: auto;
  }
`;

const ControlLabel = styled.label`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  white-space: nowrap;
`;

const Select = styled.select`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  transition: border-color ${({ theme }) => theme.durations.fast} ${({ theme }) => theme.easings.easeInOut};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[500]};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.border.medium};
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  transition: border-color ${({ theme }) => theme.durations.fast} ${({ theme }) => theme.easings.easeInOut};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[500]};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.border.medium};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }
`;

const FilterChipsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
  flex-wrap: wrap;
`;

const FilterChip = styled.button<{ active: boolean }>`
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border: 1px solid
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
  transition: all ${({ theme }) => theme.durations.fast} ${({ theme }) => theme.easings.easeInOut};
  white-space: nowrap;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary[400]};
    background: ${({ theme }) => theme.colors.primary[50]};
    color: ${({ theme }) => theme.colors.primary[700]};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary[200]};
  }
`;

const ClearButton = styled.button`
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  transition: all ${({ theme }) => theme.durations.fast} ${({ theme }) => theme.easings.easeInOut};

  &:hover {
    border-color: ${({ theme }) => theme.colors.border.medium};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

const ResultsCount = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-left: auto;

  ${({ theme }) => theme.mediaQueries.mobile} {
    margin-left: 0;
    text-align: center;
  }
`;

export type SortOption = 'added_date' | 'title' | 'release_date' | 'vote_average' | 'user_rating';
export type FilterOption = 'all' | 'watched' | 'unwatched' | 'movies' | 'tv';
export type SortOrder = 'asc' | 'desc';

interface WatchlistControlsProps {
  sortBy: SortOption;
  sortOrder: SortOrder;
  filter: FilterOption;
  searchQuery: string;
  resultsCount: number;
  totalCount: number;
  onSortChange: (sortBy: SortOption) => void;
  onSortOrderChange: (order: SortOrder) => void;
  onFilterChange: (filter: FilterOption) => void;
  onSearchChange: (query: string) => void;
  onClearFilters: () => void;
}

const WatchlistControls: React.FC<WatchlistControlsProps> = ({
  sortBy,
  sortOrder,
  filter,
  searchQuery,
  resultsCount,
  totalCount,
  onSortChange,
  onSortOrderChange,
  onFilterChange,
  onSearchChange,
  onClearFilters,
}) => {
  const filterOptions: { value: FilterOption; label: string; count?: number }[] = [
    { value: 'all', label: 'All Items' },
    { value: 'unwatched', label: 'To Watch' },
    { value: 'watched', label: 'Watched' },
    { value: 'movies', label: 'Movies' },
    { value: 'tv', label: 'TV Shows' },
  ];

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'added_date', label: 'Date Added' },
    { value: 'title', label: 'Title' },
    { value: 'release_date', label: 'Release Date' },
    { value: 'vote_average', label: 'TMDB Rating' },
    { value: 'user_rating', label: 'Your Rating' },
  ];

  const hasActiveFilters = filter !== 'all' || searchQuery.trim() !== '';

  return (
    <ControlsContainer>
      <ControlsRow>
        <ControlGroup>
          <ControlLabel htmlFor="search-input">Search:</ControlLabel>
          <SearchInput
            id="search-input"
            type="text"
            placeholder="Search your watchlist..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </ControlGroup>

        <ControlGroup>
          <ControlLabel htmlFor="sort-select">Sort by:</ControlLabel>
          <Select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </ControlGroup>

        <ControlGroup>
          <ControlLabel htmlFor="order-select">Order:</ControlLabel>
          <Select
            id="order-select"
            value={sortOrder}
            onChange={(e) => onSortOrderChange(e.target.value as SortOrder)}
          >
            <option value="desc">
              {sortBy === 'title' ? 'Z to A' : 'High to Low'}
            </option>
            <option value="asc">
              {sortBy === 'title' ? 'A to Z' : 'Low to High'}
            </option>
          </Select>
        </ControlGroup>
      </ControlsRow>

      <ControlsRow>
        <FilterChipsContainer>
          {filterOptions.map((option) => (
            <FilterChip
              key={option.value}
              active={filter === option.value}
              onClick={() => onFilterChange(option.value)}
            >
              {option.label}
            </FilterChip>
          ))}
        </FilterChipsContainer>

        {hasActiveFilters && (
          <ClearButton onClick={onClearFilters}>
            Clear Filters
          </ClearButton>
        )}

        <ResultsCount>
          Showing {resultsCount} of {totalCount} items
        </ResultsCount>
      </ControlsRow>
    </ControlsContainer>
  );
};

export default WatchlistControls;
