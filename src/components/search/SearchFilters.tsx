import React from 'react';
import styled from 'styled-components';

const FiltersContainer = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[6]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const FiltersHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const FiltersTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary[500]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing[1]};

  &:hover {
    color: ${({ theme }) => theme.colors.primary[600]};
  }
`;

const FiltersGrid = styled.div<{ isCollapsed: boolean }>`
  display: ${({ isCollapsed }) => (isCollapsed ? 'none' : 'grid')};
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing[4]};

  ${({ theme }) => theme.mediaQueries.mobile} {
    grid-template-columns: 1fr;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const FilterLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const FilterSelect = styled.select`
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
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary[100]};
  }
`;

const FilterInput = styled.input`
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary[100]};
  }
`;

const RangeContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
  align-items: center;
`;

const RangeInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[2]};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  text-align: center;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary[100]};
  }
`;

const RangeSeparator = styled.span`
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const FilterActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-top: ${({ theme }) => theme.spacing[4]};
  padding-top: ${({ theme }) => theme.spacing[4]};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.durations.fast} ${({ theme }) => theme.easings.easeInOut};

  ${({ theme, variant = 'primary' }) =>
    variant === 'primary'
      ? `
        background: ${theme.colors.primary[500]};
        color: white;
        border: none;

        &:hover {
          background: ${theme.colors.primary[600]};
        }
      `
      : `
        background: transparent;
        color: ${theme.colors.text.secondary};
        border: 1px solid ${theme.colors.border.light};

        &:hover {
          background: ${theme.colors.background.secondary};
        }
      `}
`;

export interface SearchFiltersState {
  genre: string;
  year: {
    min: string;
    max: string;
  };
  rating: {
    min: string;
    max: string;
  };
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

interface SearchFiltersProps {
  filters: SearchFiltersState;
  onFiltersChange: (filters: SearchFiltersState) => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
  mediaType: 'all' | 'movie' | 'tv';
  isLoading?: boolean;
}

const GENRES = [
  { value: '', label: 'All Genres' },
  { value: '28', label: 'Action' },
  { value: '12', label: 'Adventure' },
  { value: '16', label: 'Animation' },
  { value: '35', label: 'Comedy' },
  { value: '80', label: 'Crime' },
  { value: '99', label: 'Documentary' },
  { value: '18', label: 'Drama' },
  { value: '10751', label: 'Family' },
  { value: '14', label: 'Fantasy' },
  { value: '36', label: 'History' },
  { value: '27', label: 'Horror' },
  { value: '10402', label: 'Music' },
  { value: '9648', label: 'Mystery' },
  { value: '10749', label: 'Romance' },
  { value: '878', label: 'Science Fiction' },
  { value: '10770', label: 'TV Movie' },
  { value: '53', label: 'Thriller' },
  { value: '10752', label: 'War' },
  { value: '37', label: 'Western' },
];

const SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Most Popular' },
  { value: 'popularity.asc', label: 'Least Popular' },
  { value: 'vote_average.desc', label: 'Highest Rated' },
  { value: 'vote_average.asc', label: 'Lowest Rated' },
  { value: 'release_date.desc', label: 'Newest First' },
  { value: 'release_date.asc', label: 'Oldest First' },
  { value: 'title.asc', label: 'A-Z' },
  { value: 'title.desc', label: 'Z-A' },
];

const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange,
  onApplyFilters,
  onResetFilters,
  mediaType,
  isLoading = false,
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(true);

  const handleFilterChange = (key: keyof SearchFiltersState, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const handleRangeChange = (
    rangeKey: 'year' | 'rating',
    subKey: 'min' | 'max',
    value: string
  ) => {
    onFiltersChange({
      ...filters,
      [rangeKey]: {
        ...filters[rangeKey],
        [subKey]: value,
      },
    });
  };

  const hasActiveFilters = () => {
    return (
      filters.genre !== '' ||
      filters.year.min !== '' ||
      filters.year.max !== '' ||
      filters.rating.min !== '' ||
      filters.rating.max !== '' ||
      filters.sortBy !== 'popularity.desc'
    );
  };

  const currentYear = new Date().getFullYear();

  return (
    <FiltersContainer>
      <FiltersHeader>
        <FiltersTitle>
          Advanced Filters
          {hasActiveFilters() && (
            <span style={{ color: '#3b82f6', fontSize: '0.875rem', marginLeft: '0.5rem' }}>
              (Active)
            </span>
          )}
        </FiltersTitle>
        <ToggleButton onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? 'Show Filters' : 'Hide Filters'}
        </ToggleButton>
      </FiltersHeader>

      <FiltersGrid isCollapsed={isCollapsed}>
        <FilterGroup>
          <FilterLabel>Genre</FilterLabel>
          <FilterSelect
            value={filters.genre}
            onChange={(e) => handleFilterChange('genre', e.target.value)}
          >
            {GENRES.map((genre) => (
              <option key={genre.value} value={genre.value}>
                {genre.label}
              </option>
            ))}
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Release Year</FilterLabel>
          <RangeContainer>
            <RangeInput
              type="number"
              placeholder="Min"
              min="1900"
              max={currentYear}
              value={filters.year.min}
              onChange={(e) => handleRangeChange('year', 'min', e.target.value)}
            />
            <RangeSeparator>to</RangeSeparator>
            <RangeInput
              type="number"
              placeholder="Max"
              min="1900"
              max={currentYear}
              value={filters.year.max}
              onChange={(e) => handleRangeChange('year', 'max', e.target.value)}
            />
          </RangeContainer>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Rating (1-10)</FilterLabel>
          <RangeContainer>
            <RangeInput
              type="number"
              placeholder="Min"
              min="0"
              max="10"
              step="0.1"
              value={filters.rating.min}
              onChange={(e) => handleRangeChange('rating', 'min', e.target.value)}
            />
            <RangeSeparator>to</RangeSeparator>
            <RangeInput
              type="number"
              placeholder="Max"
              min="0"
              max="10"
              step="0.1"
              value={filters.rating.max}
              onChange={(e) => handleRangeChange('rating', 'max', e.target.value)}
            />
          </RangeContainer>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Sort By</FilterLabel>
          <FilterSelect
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </FilterSelect>
        </FilterGroup>

        <FilterActions>
          <ActionButton
            onClick={onApplyFilters}
            disabled={isLoading}
            variant="primary"
          >
            {isLoading ? 'Applying...' : 'Apply Filters'}
          </ActionButton>
          <ActionButton
            onClick={onResetFilters}
            disabled={isLoading}
            variant="secondary"
          >
            Reset
          </ActionButton>
        </FilterActions>
      </FiltersGrid>
    </FiltersContainer>
  );
};

export default SearchFilters;
