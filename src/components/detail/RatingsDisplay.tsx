import React from 'react';
import styled from 'styled-components';
import { OMDBResponse } from '../../types';

interface Rating {
  source: string;
  value: string;
  maxValue?: string;
  color?: string;
}

interface RatingsDisplayProps {
  tmdbRating?: number;
  tmdbVoteCount?: number;
  omdbData?: OMDBResponse;
  showLabels?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const RatingsContainer = styled.div<{ size: 'small' | 'medium' | 'large' }>`
  display: flex;
  gap: ${({ theme, size }) =>
    size === 'small' ? theme.spacing[3] :
    size === 'medium' ? theme.spacing[4] :
    theme.spacing[6]
  };
  flex-wrap: wrap;
  align-items: center;
`;

const RatingItem = styled.div<{ size: 'small' | 'medium' | 'large' }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: ${({ size }) =>
    size === 'small' ? '60px' :
    size === 'medium' ? '80px' :
    '100px'
  };
`;

const RatingValue = styled.div<{
  color?: string;
  size: 'small' | 'medium' | 'large'
}>`
  font-size: ${({ theme, size }) =>
    size === 'small' ? theme.fontSizes.lg :
    size === 'medium' ? theme.fontSizes.xl :
    theme.fontSizes['2xl']
  };
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme, color }) => {
    if (color) return color;
    return theme.colors.rating?.good || theme.colors.success[500];
  }};
  line-height: ${({ theme }) => theme.lineHeights.tight};
`;

const RatingLabel = styled.div<{ size: 'small' | 'medium' | 'large' }>`
  font-size: ${({ theme, size }) =>
    size === 'small' ? theme.fontSizes.xs :
    size === 'medium' ? theme.fontSizes.sm :
    theme.fontSizes.base
  };
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: ${({ theme }) => theme.spacing[1]};
  text-align: center;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const RatingIcon = styled.span<{ size: 'small' | 'medium' | 'large' }>`
  font-size: ${({ theme, size }) =>
    size === 'small' ? theme.fontSizes.sm :
    size === 'medium' ? theme.fontSizes.base :
    theme.fontSizes.lg
  };
  margin-right: ${({ theme }) => theme.spacing[1]};
`;

const VoteCount = styled.div<{ size: 'small' | 'medium' | 'large' }>`
  font-size: ${({ theme, size }) =>
    size === 'small' ? theme.fontSizes.xs :
    theme.fontSizes.sm
  };
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: ${({ theme }) => theme.spacing[1]};
`;

const EmptyState = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-style: italic;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export const RatingsDisplay: React.FC<RatingsDisplayProps> = ({
  tmdbRating,
  tmdbVoteCount,
  omdbData,
  showLabels = true,
  size = 'medium'
}) => {
  const ratings: Rating[] = [];

  // Add TMDB rating
  if (tmdbRating && tmdbRating > 0) {
    ratings.push({
      source: 'TMDB',
      value: tmdbRating.toFixed(1),
      maxValue: '10',
      color: getRatingColor(tmdbRating, 10)
    });
  }

  // Add OMDB ratings
  if (omdbData) {
    // IMDB Rating
    if (omdbData.imdbRating && omdbData.imdbRating !== 'N/A') {
      const imdbRating = parseFloat(omdbData.imdbRating);
      ratings.push({
        source: 'IMDb',
        value: omdbData.imdbRating,
        maxValue: '10',
        color: getRatingColor(imdbRating, 10)
      });
    }

    // Process other ratings from OMDB
    if (omdbData.Ratings && Array.isArray(omdbData.Ratings)) {
      omdbData.Ratings.forEach(rating => {
        switch (rating.Source) {
          case 'Rotten Tomatoes':
            const rtValue = parseInt(rating.Value.replace('%', ''));
            ratings.push({
              source: 'RT',
              value: rating.Value,
              color: getRatingColor(rtValue, 100)
            });
            break;
          case 'Metacritic':
            const mcValue = parseInt(rating.Value.split('/')[0]);
            ratings.push({
              source: 'Metacritic',
              value: rating.Value,
              color: getRatingColor(mcValue, 100)
            });
            break;
        }
      });
    }
  }

  function getRatingColor(value: number, maxValue: number): string {
    const percentage = (value / maxValue) * 100;

    if (percentage >= 75) return '#22c55e'; // Green
    if (percentage >= 60) return '#eab308'; // Yellow
    if (percentage >= 40) return '#f97316'; // Orange
    return '#ef4444'; // Red
  }

  function formatVoteCount(count: number): string {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M votes`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K votes`;
    }
    return `${count} votes`;
  }

  function getRatingIcon(source: string): string {
    switch (source) {
      case 'TMDB': return '🎬';
      case 'IMDb': return '⭐';
      case 'RT': return '🍅';
      case 'Metacritic': return '📊';
      default: return '⭐';
    }
  }

  if (ratings.length === 0) {
    return <EmptyState>No ratings available</EmptyState>;
  }

  return (
    <RatingsContainer size={size}>
      {ratings.map((rating, index) => (
        <RatingItem key={index} size={size}>
          <RatingValue color={rating.color} size={size}>
            <RatingIcon size={size}>
              {getRatingIcon(rating.source)}
            </RatingIcon>
            {rating.value}
            {rating.maxValue && rating.source !== 'RT' && `/${rating.maxValue}`}
          </RatingValue>
          {showLabels && (
            <RatingLabel size={size}>{rating.source}</RatingLabel>
          )}
        </RatingItem>
      ))}
      {tmdbVoteCount && tmdbVoteCount > 0 && size !== 'small' && (
        <VoteCount size={size}>
          {formatVoteCount(tmdbVoteCount)}
        </VoteCount>
      )}
    </RatingsContainer>
  );
};

export default RatingsDisplay;
