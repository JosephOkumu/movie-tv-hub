import React from 'react';
import styled from 'styled-components';

interface TrendingFiltersProps {
  timeWindow: 'day' | 'week';
  mediaType: 'all' | 'movie' | 'tv';
  onTimeWindowChange: (timeWindow: 'day' | 'week') => void;
  onMediaTypeChange: (mediaType: 'all' | 'movie' | 'tv') => void;
}

const FiltersContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[6]};
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  padding: 0 ${({ theme }) => theme.spacing[4]};

  ${({ theme }) => theme.mediaQueries.mobile} {
    gap: ${({ theme }) => theme.spacing[4]};
    flex-direction: column;
    align-items: stretch;
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
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const FilterButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.durations.fast} ${({ theme }) => theme.easings.easeInOut};
  white-space: nowrap;
  border: 2px solid;

  ${({ theme, active }) =>
    active
      ? `
        background: ${theme.colors.primary[500]};
        color: white;
        border-color: ${theme.colors.primary[500]};
        transform: translateY(-1px);
        box-shadow: ${theme.shadows.sm};
      `
      : `
        background: ${theme.colors.background.card};
        color: ${theme.colors.text.secondary};
        border-color: ${theme.colors.neutral[300]};

        &:hover {
          background: ${theme.colors.primary[50]};
          border-color: ${theme.colors.primary[300]};
          color: ${theme.colors.primary[600]};
          transform: translateY(-1px);
        }
      `}
`;

const FilterStats = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-left: auto;

  ${({ theme }) => theme.mediaQueries.mobile} {
    margin-left: 0;
    justify-content: center;
  }
`;

const StatsBadge = styled.span`
  background: ${({ theme }) => theme.colors.primary[100]};
  color: ${({ theme }) => theme.colors.primary[700]};
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const TrendingIcon = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.base};
  animation: pulse 2s infinite;

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }
`;

export const TrendingFilters: React.FC<TrendingFiltersProps> = ({
  timeWindow,
  mediaType,
  onTimeWindowChange,
  onMediaTypeChange,
}) => {
  const timeWindowOptions = [
    { value: 'day' as const, label: 'Today', icon: '🔥' },
    { value: 'week' as const, label: 'This Week', icon: '⭐' },
  ];

  const mediaTypeOptions = [
    { value: 'all' as const, label: 'All', icon: '🎭' },
    { value: 'movie' as const, label: 'Movies', icon: '🎬' },
    { value: 'tv' as const, label: 'TV Shows', icon: '📺' },
  ];

  const getTimeWindowDescription = (): string => {
    return timeWindow === 'day'
      ? 'Trending today'
      : 'Popular this week';
  };

  const getMediaTypeDescription = (): string => {
    switch (mediaType) {
      case 'movie':
        return 'Movies only';
      case 'tv':
        return 'TV shows only';
      default:
        return 'All content';
    }
  };

  return (
    <FiltersContainer>
      <FilterGroup>
        <FilterLabel>Time Period</FilterLabel>
        <FilterButtonGroup>
          {timeWindowOptions.map((option) => (
            <FilterButton
              key={option.value}
              active={timeWindow === option.value}
              onClick={() => onTimeWindowChange(option.value)}
            >
              <span style={{ marginRight: '6px' }}>{option.icon}</span>
              {option.label}
            </FilterButton>
          ))}
        </FilterButtonGroup>
      </FilterGroup>

      <FilterGroup>
        <FilterLabel>Content Type</FilterLabel>
        <FilterButtonGroup>
          {mediaTypeOptions.map((option) => (
            <FilterButton
              key={option.value}
              active={mediaType === option.value}
              onClick={() => onMediaTypeChange(option.value)}
            >
              <span style={{ marginRight: '6px' }}>{option.icon}</span>
              {option.label}
            </FilterButton>
          ))}
        </FilterButtonGroup>
      </FilterGroup>

      <FilterStats>
        <TrendingIcon>📈</TrendingIcon>
        <div>
          <StatsBadge>{getTimeWindowDescription()}</StatsBadge>
          <span style={{ margin: '0 8px', color: '#ccc' }}>•</span>
          <StatsBadge>{getMediaTypeDescription()}</StatsBadge>
        </div>
      </FilterStats>
    </FiltersContainer>
  );
};

export default TrendingFilters;
