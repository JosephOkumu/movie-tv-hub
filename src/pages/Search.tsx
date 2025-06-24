import React from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  padding: ${({ theme }) => theme.spacing[6]} 0;
  min-height: calc(100vh - ${({ theme }) => theme.layout.headerHeight});
`;

const SearchHeader = styled.div`
  background: ${({ theme }) => theme.colors.background.secondary};
  padding: ${({ theme }) => theme.spacing[8]} 0;
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const SearchTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.text.primary};

  ${({ theme }) => theme.mediaQueries.mobile} {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  }
`;

const SearchSubtitle = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  max-width: 600px;
  margin: 0 auto;
`;

const SearchFormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[4]};
`;

const SearchForm = styled.form`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};

  ${({ theme }) => theme.mediaQueries.mobile} {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[4]};
  border: 2px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  transition: border-color ${({ theme }) => theme.durations.fast} ${({ theme }) => theme.easings.easeInOut};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary[100]};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }
`;

const SearchButton = styled.button`
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[6]};
  background: ${({ theme }) => theme.colors.primary[500]};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.durations.fast} ${({ theme }) => theme.easings.easeInOut};

  &:hover {
    background: ${({ theme }) => theme.colors.primary[600]};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.neutral[400]};
    cursor: not-allowed;
  }
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

const ResultsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[4]};
`;

const PlaceholderMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing[12]} ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const PlaceholderIcon = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['6xl']};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const PlaceholderTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const PlaceholderText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  max-width: 500px;
  margin: 0 auto;
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeFilter, setActiveFilter] = React.useState<'all' | 'movie' | 'tv'>('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality will be implemented here
    console.log('Search query:', searchQuery, 'Filter:', activeFilter);
  };

  return (
    <SearchContainer>
      <SearchHeader>
        <div className="container">
          <SearchTitle>Search Movies & TV Shows</SearchTitle>
          <SearchSubtitle>
            Discover your favorite movies and TV shows from our vast collection
          </SearchSubtitle>
        </div>
      </SearchHeader>

      <div className="container">
        <SearchFormContainer>
          <SearchForm onSubmit={handleSubmit}>
            <SearchInput
              type="text"
              placeholder="Search for movies, TV shows, or people..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchButton type="submit" disabled={!searchQuery.trim()}>
              Search
            </SearchButton>
          </SearchForm>

          <FilterContainer>
            <FilterChip
              active={activeFilter === 'all'}
              onClick={() => setActiveFilter('all')}
            >
              All
            </FilterChip>
            <FilterChip
              active={activeFilter === 'movie'}
              onClick={() => setActiveFilter('movie')}
            >
              Movies
            </FilterChip>
            <FilterChip
              active={activeFilter === 'tv'}
              onClick={() => setActiveFilter('tv')}
            >
              TV Shows
            </FilterChip>
          </FilterContainer>
        </SearchFormContainer>

        <ResultsContainer>
          <PlaceholderMessage>
            <PlaceholderIcon>🔍</PlaceholderIcon>
            <PlaceholderTitle>Ready to Search</PlaceholderTitle>
            <PlaceholderText>
              Enter a movie or TV show title above to start discovering amazing content.
              Use filters to narrow down your search results.
            </PlaceholderText>
          </PlaceholderMessage>
        </ResultsContainer>
      </div>
    </SearchContainer>
  );
};

export default Search;
