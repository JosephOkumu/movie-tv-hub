import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Movie, TVShow } from '../../types';
import { TMDBService } from '../../services/tmdb';

interface SimilarContentProps {
  content: (Movie | TVShow)[];
  mediaType: 'movie' | 'tv';
  title?: string;
}

const SimilarSection = styled.section`
  margin: ${({ theme }) => theme.spacing[8]} 0;
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const ContentContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => theme.spacing[2]} 0;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.primary[300]} transparent;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary[300]};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.primary[400]};
  }
`;

const ContentCard = styled(Link)`
  min-width: 160px;
  max-width: 160px;
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  overflow: hidden;
  transition: all ${({ theme }) => theme.durations.fast}
    ${({ theme }) => theme.easings.easeInOut};
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const PosterContainer = styled.div`
  position: relative;
  width: 100%;
  height: 240px;
  overflow: hidden;
`;

const PosterImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${({ theme }) => theme.durations.normal}
    ${({ theme }) => theme.easings.easeInOut};

  ${ContentCard}:hover & {
    transform: scale(1.05);
  }
`;

const PlaceholderPoster = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.neutral[200]};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  color: ${({ theme }) => theme.colors.neutral[400]};
`;

const RatingOverlay = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing[2]};
  right: ${({ theme }) => theme.spacing[2]};
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
`;

const RatingIcon = styled.span`
  color: #fbbf24;
`;

const ContentInfo = styled.div`
  padding: ${({ theme }) => theme.spacing[3]};
`;

const ContentTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ContentMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
`;

const ReleaseDate = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing[12]}
    ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const EmptyStateIcon = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const EmptyStateText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

export const SimilarContent: React.FC<SimilarContentProps> = ({
  content,
  mediaType,
  title,
}) => {
  if (!content || content.length === 0) {
    return (
      <SimilarSection>
        <SectionTitle>
          {title || `Similar ${mediaType === 'movie' ? 'Movies' : 'TV Shows'}`}
        </SectionTitle>
        <EmptyState>
          <EmptyStateIcon>{mediaType === 'movie' ? '🎬' : '📺'}</EmptyStateIcon>
          <EmptyStateText>No similar content available</EmptyStateText>
        </EmptyState>
      </SimilarSection>
    );
  }

  const isMovie = (item: Movie | TVShow): item is Movie => {
    return 'title' in item;
  };

  const getTitle = (item: Movie | TVShow): string => {
    return isMovie(item) ? item.title : item.name;
  };

  const getReleaseDate = (item: Movie | TVShow): string => {
    const date = isMovie(item) ? item.release_date : item.first_air_date;
    if (!date) return 'Unknown';
    return TMDBService.getYearFromDate(date);
  };

  const getDetailPath = (item: Movie | TVShow): string => {
    return `/${mediaType}/${item.id}`;
  };

  const formatRating = (rating: number): string => {
    return rating.toFixed(1);
  };

  const getRatingColor = (rating: number): string => {
    if (rating >= 7) return '#22c55e'; // Green
    if (rating >= 6) return '#eab308'; // Yellow
    if (rating >= 4) return '#f97316'; // Orange
    return '#ef4444'; // Red
  };

  return (
    <SimilarSection>
      <SectionTitle>
        {title || `Similar ${mediaType === 'movie' ? 'Movies' : 'TV Shows'}`}
      </SectionTitle>
      <ContentContainer>
        {content.slice(0, 20).map(item => {
          const itemTitle = getTitle(item);
          const releaseYear = getReleaseDate(item);
          const rating = item.vote_average;

          return (
            <ContentCard key={item.id} to={getDetailPath(item)}>
              <PosterContainer>
                {item.poster_path ? (
                  <PosterImage
                    src={TMDBService.buildImageUrl(item.poster_path, 'w342')}
                    alt={itemTitle}
                    loading="lazy"
                  />
                ) : (
                  <PlaceholderPoster>
                    {mediaType === 'movie' ? '🎬' : '📺'}
                  </PlaceholderPoster>
                )}
                {rating > 0 && (
                  <RatingOverlay>
                    <RatingIcon>⭐</RatingIcon>
                    <span style={{ color: getRatingColor(rating) }}>
                      {formatRating(rating)}
                    </span>
                  </RatingOverlay>
                )}
              </PosterContainer>
              <ContentInfo>
                <ContentTitle>{itemTitle}</ContentTitle>
                <ContentMeta>
                  <ReleaseDate>{releaseYear}</ReleaseDate>
                </ContentMeta>
              </ContentInfo>
            </ContentCard>
          );
        })}
      </ContentContainer>
    </SimilarSection>
  );
};

export default SimilarContent;
