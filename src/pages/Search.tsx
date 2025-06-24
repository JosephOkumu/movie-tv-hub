import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { useSearch, useSearchSuggestions } from '../hooks/useSearch';
import SearchResults from '../components/search/SearchResults';
import Pagination from '../components/common/Pagination';
import LoadingSpinner from '../components/common/LoadingSpinner';

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
  transition: border-color ${({ theme }) => theme.durations.fast}
    ${({ theme }) => theme.easings.easeInOut};

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
  transition: background-color ${({ theme }) => theme.durations.fast}
    ${({ theme }) => theme.easings.easeInOut};

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

const ResultsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[4]};
`;

const PlaceholderMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing[12]}
    ${({ theme }) => theme.spacing[4]};
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [activeFilter, setActiveFilter] = useState<'all' | 'movie' | 'tv'>(
    (searchParams.get('type') as 'all' | 'movie' | 'tv') || 'all'
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get('page') || '1', 10)
  );
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Get search results
  const {
    results,
    isLoading,
    isError,
    error,
    totalResults,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  } = useSearch(searchQuery, activeFilter, currentPage);

  // Get popular suggestions for empty state
  const { suggestions, isLoading: suggestionsLoading } = useSearchSuggestions();

  // Update URL when search parameters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (activeFilter !== 'all') params.set('type', activeFilter);
    if (currentPage > 1) params.set('page', currentPage.toString());

    setSearchParams(params);
  }, [searchQuery, activeFilter, currentPage, setSearchParams]);

  // Reset page when query or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeFilter]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentPage(1);
    }
  };

  const handleFilterChange = (filter: 'all' | 'movie' | 'tv') => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
              onChange={e => setSearchQuery(e.target.value)}
              autoFocus
            />
            <SearchButton type="submit" disabled={!searchQuery.trim()}>
              {isLoading ? (
                <LoadingSpinner size="small" showText={false} />
              ) : (
                'Search'
              )}
            </SearchButton>
          </SearchForm>

          <FilterContainer>
            <FilterChip
              active={activeFilter === 'all'}
              onClick={() => handleFilterChange('all')}
            >
              All
            </FilterChip>
            <FilterChip
              active={activeFilter === 'movie'}
              onClick={() => handleFilterChange('movie')}
            >
              Movies
            </FilterChip>
            <FilterChip
              active={activeFilter === 'tv'}
              onClick={() => handleFilterChange('tv')}
            >
              TV Shows
            </FilterChip>
          </FilterContainer>
        </SearchFormContainer>

        <ResultsContainer>
          {/* Show search results if we have a query */}
          {searchQuery && (
            <>
              <SearchResults
                results={results}
                isLoading={isLoading}
                isError={isError}
                error={error}
                totalResults={totalResults}
                query={searchQuery}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
              />

              {/* Pagination */}
              {results.length > 0 && totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}

          {/* Show suggestions when no search query */}
          {!searchQuery && (
            <PlaceholderMessage>
              <PlaceholderIcon>🔍</PlaceholderIcon>
              <PlaceholderTitle>Ready to Search</PlaceholderTitle>
              <PlaceholderText>
                Enter a movie or TV show title above to start discovering
                amazing content. Use filters to narrow down your search results.
              </PlaceholderText>

              {/* Popular suggestions */}
              {suggestions.length > 0 && (
                <>
                  <PlaceholderTitle
                    style={{ marginTop: '2rem', fontSize: '1.5rem' }}
                  >
                    Popular Right Now
                  </PlaceholderTitle>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns:
                        'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '1.5rem',
                      marginTop: '2rem',
                      maxWidth: '800px',
                      margin: '2rem auto 0',
                    }}
                  >
                    {suggestions.slice(0, 6).map(item => (
                      <div
                        key={`${item.media_type}-${item.id}`}
                        style={{
                          cursor: 'pointer',
                          textAlign: 'center',
                        }}
                        onClick={() => setSearchQuery(item.title)}
                      >
                        <div
                          style={{
                            width: '100%',
                            height: '250px',
                            backgroundColor: '#e5e7eb',
                            borderRadius: '8px',
                            marginBottom: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '3rem',
                          }}
                        >
                          {item.media_type === 'movie' ? '🎬' : '📺'}
                        </div>
                        <h4
                          style={{
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            color: '#374151',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {item.title}
                        </h4>
                        <p
                          style={{
                            fontSize: '0.8rem',
                            color: '#6b7280',
                            marginTop: '0.25rem',
                          }}
                        >
                          ⭐ {item.vote_average?.toFixed(1)}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </PlaceholderMessage>
          )}
        </ResultsContainer>
      </div>
    </SearchContainer>
  );
};

export default Search;
