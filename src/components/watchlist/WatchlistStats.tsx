import React from 'react';
import styled from 'styled-components';
import { WatchlistItem } from '../../types';

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};

  ${({ theme }) => theme.mediaQueries.mobile} {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: ${({ theme }) => theme.spacing[3]};
  }
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[4]};
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: transform ${({ theme }) => theme.durations.fast}
    ${({ theme }) => theme.easings.easeInOut};

  &:hover {
    transform: translateY(-2px);
  }

  ${({ theme }) => theme.mediaQueries.mobile} {
    padding: ${({ theme }) => theme.spacing[3]};
  }
`;

const StatValue = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary[600]};
  margin-bottom: ${({ theme }) => theme.spacing[1]};

  ${({ theme }) => theme.mediaQueries.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;

const StatLabel = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatDescription = styled.div`
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  margin-top: ${({ theme }) => theme.spacing[1]};
  font-style: italic;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: ${({ theme }) => theme.colors.neutral[200]};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin-top: ${({ theme }) => theme.spacing[2]};
  overflow: hidden;
`;

const ProgressFill = styled.div<{ percentage: number }>`
  height: 100%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primary[500]},
    ${({ theme }) => theme.colors.primary[400]}
  );
  width: ${({ percentage }) => percentage}%;
  transition: width ${({ theme }) => theme.durations.normal}
    ${({ theme }) => theme.easings.easeInOut};
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[1]};
  margin-top: ${({ theme }) => theme.spacing[2]};
`;

const StarIcon = styled.span`
  color: ${({ theme }) => theme.colors.warning[400]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

interface WatchlistStatsProps {
  items: WatchlistItem[];
}

const WatchlistStats: React.FC<WatchlistStatsProps> = ({ items }) => {
  const totalItems = items.length;
  const watchedItems = items.filter(item => item.watched).length;
  const unwatchedItems = totalItems - watchedItems;
  const movies = items.filter(item => item.media_type === 'movie').length;
  const tvShows = items.filter(item => item.media_type === 'tv').length;

  // Calculate average rating for items with user ratings
  const itemsWithRatings = items.filter(
    item => item.user_rating && item.user_rating > 0
  );
  const averageRating =
    itemsWithRatings.length > 0
      ? itemsWithRatings.reduce(
          (acc, item) => acc + (item.user_rating || 0),
          0
        ) / itemsWithRatings.length
      : 0;

  // Calculate completion percentage
  const completionPercentage =
    totalItems > 0 ? (watchedItems / totalItems) * 100 : 0;

  // Calculate average TMDB rating
  const averageTMDBRating =
    totalItems > 0
      ? items.reduce((acc, item) => acc + item.vote_average, 0) / totalItems
      : 0;

  return (
    <StatsContainer>
      <StatCard>
        <StatValue>{totalItems}</StatValue>
        <StatLabel>Total Items</StatLabel>
        <StatDescription>
          {movies} movies • {tvShows} TV shows
        </StatDescription>
      </StatCard>

      <StatCard>
        <StatValue>{watchedItems}</StatValue>
        <StatLabel>Watched</StatLabel>
        <ProgressBar>
          <ProgressFill percentage={completionPercentage} />
        </ProgressBar>
        <StatDescription>
          {completionPercentage.toFixed(0)}% completed
        </StatDescription>
      </StatCard>

      <StatCard>
        <StatValue>{unwatchedItems}</StatValue>
        <StatLabel>To Watch</StatLabel>
        <StatDescription>
          {unwatchedItems === 0
            ? 'All caught up!'
            : `${unwatchedItems} item${unwatchedItems > 1 ? 's' : ''} remaining`}
        </StatDescription>
      </StatCard>

      <StatCard>
        <StatValue>
          {averageRating > 0 ? averageRating.toFixed(1) : '—'}
        </StatValue>
        <StatLabel>Your Rating</StatLabel>
        {averageRating > 0 && (
          <RatingContainer>
            <StarIcon>★</StarIcon>
            <StatDescription>
              Based on {itemsWithRatings.length} rating
              {itemsWithRatings.length > 1 ? 's' : ''}
            </StatDescription>
          </RatingContainer>
        )}
        {averageRating === 0 && (
          <StatDescription>No ratings yet</StatDescription>
        )}
      </StatCard>

      <StatCard>
        <StatValue>{averageTMDBRating.toFixed(1)}</StatValue>
        <StatLabel>TMDB Rating</StatLabel>
        <RatingContainer>
          <StarIcon>⭐</StarIcon>
          <StatDescription>Average across all items</StatDescription>
        </RatingContainer>
      </StatCard>
    </StatsContainer>
  );
};

export default WatchlistStats;
