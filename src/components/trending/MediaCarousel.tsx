import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Movie, TVShow } from '../../types';
import { TMDBService } from '../../services/tmdb';
import { useWatchlist } from '../../context/WatchlistContext';

interface MediaCarouselProps {
  items: (Movie | TVShow)[];
  title: string;
  mediaType?: 'movie' | 'tv' | 'mixed';
  showWatchlistButton?: boolean;
  loading?: boolean;
}

const CarouselSection = styled.section`
  margin: ${({ theme }) => theme.spacing[8]} 0;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  padding: 0 ${({ theme }) => theme.spacing[4]};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;

  ${({ theme }) => theme.mediaQueries.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;

const ViewAllLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary[500]};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.base};
  transition: color ${({ theme }) => theme.durations.fast} ${({ theme }) => theme.easings.easeInOut};

  &:hover {
    color: ${({ theme }) => theme.colors.primary[600]};
    text-decoration: underline;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

const CarouselTrack = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  overflow-x: auto;
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
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

const MediaCard = styled(Link)`
  min-width: 200px;
  max-width: 200px;
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  overflow: hidden;
  transition: all ${({ theme }) => theme.durations.fast} ${({ theme }) => theme.easings.easeInOut};
  text-decoration: none;
  color: inherit;
  position: relative;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }

  ${({ theme }) => theme.mediaQueries.mobile} {
    min-width: 160px;
    max-width: 160px;
  }
`;

const PosterContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;

  ${({ theme }) => theme.mediaQueries.mobile} {
    height: 240px;
  }
`;

const PosterImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${({ theme }) => theme.durations.normal} ${({ theme }) => theme.easings.easeInOut};

  ${MediaCard}:hover & {
    transform: scale(1.05);
  }
`;

const PosterPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.neutral[200]};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  color: ${({ theme }) => theme.colors.neutral[400]};
`;

const MediaTypeBadge = styled.span<{ mediaType: string }>`
  position: absolute;
  top: ${({ theme }) => theme.spacing[2]};
  left: ${({ theme }) => theme.spacing[2]};
  background: ${({ theme, mediaType }) =>
    mediaType === 'movie'
      ? theme.colors.primary[500]
      : theme.colors.secondary[500]};
  color: white;
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-transform: uppercase;
`;

const RatingBadge = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing[2]};
  right: ${({ theme }) => theme.spacing[2]};
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
`;

const WatchlistButton = styled.button`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing[2]};
  left: ${({ theme }) => theme.spacing[2]};
  background: ${({ theme }) => theme.colors.primary[500]};
  color: white;
  border: none;
  padding: ${({ theme }) => theme.spacing[2]};
  border-radius: 50%;
  width: 36px;
  height: 36px;
  cursor: pointer;
  transition: all ${({ theme }) => theme.durations.fast} ${({ theme }) => theme.easings.easeInOut};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  opacity: 0;
  transform: scale(0.8);

  ${MediaCard}:hover & {
    opacity: 1;
    transform: scale(1);
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primary[600]};
    transform: scale(1.1);
  }

  &.added {
    background: ${({ theme }) => theme.colors.success[500]};
    opacity: 1;
    &:hover {
      background: ${({ theme }) => theme.colors.success[600]};
    }
  }
`;

const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
`;

const MediaTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  ${({ theme }) => theme.mediaQueries.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const MediaMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ReleaseYear = styled.span``;

const PopularityScore = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const LoadingContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
`;

const LoadingCard = styled.div`
  min-width: 200px;
  height: 350px;
  background: ${({ theme }) => theme.colors.neutral[200]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  ${({ theme }) => theme.mediaQueries.mobile} {
    min-width: 160px;
    height: 290px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing[12]} ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const EmptyStateIcon = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const EmptyStateText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

export const MediaCarousel: React.FC<MediaCarouselProps> = ({
  items,
  title,
  mediaType = 'mixed',
  showWatchlistButton = true,
  loading = false,
}) => {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  const isMovie = (item: Movie | TVShow): item is Movie => {
    return 'title' in item;
  };

  const getTitle = (item: Movie | TVShow): string => {
    return isMovie(item) ? item.title : item.name;
  };

  const getReleaseYear = (item: Movie | TVShow): string => {
    const date = isMovie(item) ? item.release_date : item.first_air_date;
    if (!date) return 'Unknown';
    return TMDBService.getYearFromDate(date);
  };

  const getDetailPath = (item: Movie | TVShow): string => {
    const type = isMovie(item) ? 'movie' : 'tv';
    return `/${type}/${item.id}`;
  };

  const getMediaType = (item: Movie | TVShow): 'movie' | 'tv' => {
    return isMovie(item) ? 'movie' : 'tv';
  };

  const handleWatchlistClick = (e: React.MouseEvent, item: Movie | TVShow) => {
    e.preventDefault();
    e.stopPropagation();

    const type = getMediaType(item);

    if (isInWatchlist(item.id)) {
      removeFromWatchlist(item.id);
    } else {
      addToWatchlist(item, type);
    }
  };

  const formatPopularity = (popularity: number): string => {
    if (popularity >= 1000) {
      return `${(popularity / 1000).toFixed(1)}K`;
    }
    return Math.round(popularity).toString();
  };

  const getRatingIcon = (rating: number): string => {
    if (rating >= 8) return '🔥';
    if (rating >= 7) return '⭐';
    if (rating >= 6) return '👍';
    return '📊';
  };

  if (loading) {
    return (
      <CarouselSection>
        <SectionHeader>
          <SectionTitle>{title}</SectionTitle>
        </SectionHeader>
        <CarouselContainer>
          <LoadingContainer>
            {Array.from({ length: 6 }).map((_, index) => (
              <LoadingCard key={index} />
            ))}
          </LoadingContainer>
        </CarouselContainer>
      </CarouselSection>
    );
  }

  if (!items || items.length === 0) {
    return (
      <CarouselSection>
        <SectionHeader>
          <SectionTitle>{title}</SectionTitle>
        </SectionHeader>
        <EmptyState>
          <EmptyStateIcon>🎬</EmptyStateIcon>
          <EmptyStateText>No content available</EmptyStateText>
        </EmptyState>
      </CarouselSection>
    );
  }

  return (
    <CarouselSection>
      <SectionHeader>
        <SectionTitle>{title}</SectionTitle>
        {mediaType !== 'mixed' && (
          <ViewAllLink to={`/trending?type=${mediaType}`}>
            View All →
          </ViewAllLink>
        )}
      </SectionHeader>

      <CarouselContainer>
        <CarouselTrack>
          {items.map((item) => {
            const itemTitle = getTitle(item);
            const releaseYear = getReleaseYear(item);
            const itemMediaType = getMediaType(item);
            const inWatchlist = isInWatchlist(item.id);

            return (
              <MediaCard key={item.id} to={getDetailPath(item)}>
                <PosterContainer>
                  {item.poster_path ? (
                    <PosterImage
                      src={TMDBService.buildImageUrl(item.poster_path, 'w342')}
                      alt={itemTitle}
                      loading="lazy"
                    />
                  ) : (
                    <PosterPlaceholder>
                      {itemMediaType === 'movie' ? '🎬' : '📺'}
                    </PosterPlaceholder>
                  )}

                  {mediaType === 'mixed' && (
                    <MediaTypeBadge mediaType={itemMediaType}>
                      {itemMediaType === 'movie' ? 'Movie' : 'TV'}
                    </MediaTypeBadge>
                  )}

                  {item.vote_average > 0 && (
                    <RatingBadge>
                      {getRatingIcon(item.vote_average)}
                      {item.vote_average.toFixed(1)}
                    </RatingBadge>
                  )}

                  {showWatchlistButton && (
                    <WatchlistButton
                      className={inWatchlist ? 'added' : ''}
                      onClick={(e) => handleWatchlistClick(e, item)}
                      title={inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
                    >
                      {inWatchlist ? '✓' : '+'}
                    </WatchlistButton>
                  )}
                </PosterContainer>

                <CardContent>
                  <MediaTitle>{itemTitle}</MediaTitle>
                  <MediaMeta>
                    <ReleaseYear>{releaseYear}</ReleaseYear>
                    <PopularityScore>
                      {formatPopularity(item.popularity)}
                    </PopularityScore>
                  </MediaMeta>
                </CardContent>
              </MediaCard>
            );
          })}
        </CarouselTrack>
      </CarouselContainer>
    </CarouselSection>
  );
};

export default MediaCarousel;
