import React from 'react';
import styled from 'styled-components';
import { SearchResult } from '../../types';
import SearchResultCard from './SearchResultCard';

const ResultsContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const ResultsInfo = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

const ViewToggle = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const ViewButton = styled.button<{ active?: boolean }>`
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  background: ${({ theme, active }) =>
    active ? theme.colors.primary[500] : theme.colors.background.secondary};
  color: ${({ theme, active }) =>
    active ? 'white' : theme.colors.text.secondary};
  border: 1px solid
    ${({ theme, active }) =>
      active ? theme.colors.primary[500] : theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  transition: all ${({ theme }) => theme.durations.fast}
    ${({ theme }) => theme.easings.easeInOut};

  &:hover {
    background: ${({ theme, active }) =>
      active ? theme.colors.primary[600] : theme.colors.background.tertiary};
  }
`;

const ResultsGrid = styled.div<{ viewMode: 'grid' | 'list' }>`
  display: grid;
  gap: ${({ theme }) => theme.spacing[6]};

  ${({ viewMode, theme }) =>
    viewMode === 'grid'
      ? `
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

        ${theme.mediaQueries.mobile} {
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        }
      `
      : `
        grid-template-columns: 1fr;
      `}
`;

// Removed unused styled components for list view - will implement in future update

const NoResults = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing[12]}
    ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const NoResultsIcon = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['6xl']};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const NoResultsTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const NoResultsText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  max-width: 500px;
  margin: 0 auto;
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[12]}
    ${({ theme }) => theme.spacing[4]};
`;

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  totalResults: number;
  query: string;
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
  showViewToggle?: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  isLoading,
  isError,
  error,
  totalResults,
  query,
  viewMode = 'grid',
  onViewModeChange,
  showViewToggle = true,
}) => {
  const handleViewModeChange = (mode: 'grid' | 'list') => {
    if (onViewModeChange) {
      onViewModeChange(mode);
    }
  };

  if (isLoading) {
    return (
      <LoadingContainer>
        <div className="loading-spinner" />
      </LoadingContainer>
    );
  }

  if (isError) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#ef4444' }}>
        <h3>Search Error</h3>
        <p>{error || 'Failed to search for content. Please try again.'}</p>
      </div>
    );
  }

  if (!results.length && query) {
    return (
      <NoResults>
        <NoResultsIcon>🔍</NoResultsIcon>
        <NoResultsTitle>No Results Found</NoResultsTitle>
        <NoResultsText>
          We couldn't find any results for "{query}". Try searching with
          different keywords or check your spelling.
        </NoResultsText>
      </NoResults>
    );
  }

  if (!results.length) {
    return null;
  }

  return (
    <ResultsContainer>
      <ResultsHeader>
        <ResultsInfo>
          {totalResults > 0 && (
            <>
              Found {totalResults.toLocaleString()} result
              {totalResults !== 1 ? 's' : ''} for "{query}"
            </>
          )}
        </ResultsInfo>

        {showViewToggle && (
          <ViewToggle>
            <ViewButton
              active={viewMode === 'grid'}
              onClick={() => handleViewModeChange('grid')}
              title="Grid view"
            >
              ⊞
            </ViewButton>
            <ViewButton
              active={viewMode === 'list'}
              onClick={() => handleViewModeChange('list')}
              title="List view"
            >
              ☰
            </ViewButton>
          </ViewToggle>
        )}
      </ResultsHeader>

      <ResultsGrid viewMode={viewMode}>
        {results.map(result => (
          <SearchResultCard
            key={`${result.media_type}-${result.id}`}
            result={result}
            showAddToWatchlist={result.media_type !== 'person'}
          />
        ))}
      </ResultsGrid>
    </ResultsContainer>
  );
};

export default SearchResults;
