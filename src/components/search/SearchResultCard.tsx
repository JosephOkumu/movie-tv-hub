import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { SearchResult } from '../../types';
import { TMDBService } from '../../services/tmdb';
import { useWatchlist } from '../../context/WatchlistContext';

const Card = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: all ${({ theme }) => theme.durations.normal}
    ${({ theme }) => theme.easings.easeInOut};
  position: relative;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const PosterContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
`;

const PosterImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${({ theme }) => theme.durations.normal}
    ${({ theme }) => theme.easings.easeInOut};

  ${Card}:hover & {
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
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  color: ${({ theme }) => theme.colors.neutral[400]};
`;

const MediaTypeBadge = styled.span<{ mediaType: string }>`
  position: absolute;
  top: ${({ theme }) => theme.spacing[2]};
  left: ${({ theme }) => theme.spacing[2]};
  background: ${({ theme, mediaType }) =>
    mediaType === 'movie'
      ? theme.colors.primary[500]
      : mediaType === 'tv'
        ? theme.colors.secondary[500]
        : theme.colors.neutral[500]};
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
  background: ${({ theme }) => theme.colors.rating.good};
  color: white;
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  min-width: 40px;
  text-align: center;
`;

const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Overview = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const MetaInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

const ReleaseDate = styled.span`
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const PopularityScore = styled.span`
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.durations.fast}
    ${({ theme }) => theme.easings.easeInOut};

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
        color: ${theme.colors.primary[500]};
        border: 1px solid ${theme.colors.primary[500]};

        &:hover {
          background: ${theme.colors.primary[50]};
        }
      `}
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

interface SearchResultCardProps {
  result: SearchResult;
  showAddToWatchlist?: boolean;
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({
  result,
  showAddToWatchlist = true,
}) => {
  const { addToWatchlist, isInWatchlist } = useWatchlist();

  const getTitle = () => {
    return result.title || result.name || 'Unknown Title';
  };

  const getReleaseDate = () => {
    const date = result.release_date || result.first_air_date;
    if (!date) return 'Unknown';
    return new Date(date).getFullYear().toString();
  };

  const getDetailPath = () => {
    if (result.media_type === 'movie') {
      return `/movie/${result.id}`;
    } else if (result.media_type === 'tv') {
      return `/tv/${result.id}`;
    } else if (result.media_type === 'person') {
      return `/person/${result.id}`;
    }
    return '#';
  };

  const handleAddToWatchlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (result.media_type === 'movie' || result.media_type === 'tv') {
      const mediaItem =
        result.media_type === 'movie'
          ? {
              id: result.id,
              title: result.title || '',
              original_title: result.title || '',
              overview: result.overview || '',
              poster_path: result.poster_path,
              backdrop_path: result.backdrop_path || null,
              genre_ids: [],
              popularity: result.popularity || 0,
              vote_average: result.vote_average || 0,
              vote_count: 0,
              release_date: result.release_date || '',
              adult: false,
            }
          : {
              id: result.id,
              name: result.name || '',
              original_name: result.name || '',
              overview: result.overview || '',
              poster_path: result.poster_path,
              backdrop_path: result.backdrop_path || null,
              genre_ids: [],
              popularity: result.popularity || 0,
              vote_average: result.vote_average || 0,
              vote_count: 0,
              first_air_date: result.first_air_date || '',
            };

      addToWatchlist(mediaItem as any, result.media_type);
    }
  };

  const isAlreadyInWatchlist = isInWatchlist(result.id);
  const canAddToWatchlist =
    showAddToWatchlist &&
    (result.media_type === 'movie' || result.media_type === 'tv') &&
    !isAlreadyInWatchlist;

  // For person results, we don't show certain elements
  const isPerson = result.media_type === 'person';

  return (
    <Card>
      <StyledLink to={getDetailPath()}>
        <PosterContainer>
          {result.poster_path || result.profile_path ? (
            <PosterImage
              src={TMDBService.buildImageUrl(
                result.poster_path || result.profile_path || null,
                'w500'
              )}
              alt={getTitle()}
              loading="lazy"
            />
          ) : (
            <PosterPlaceholder>
              {isPerson ? '👤' : result.media_type === 'movie' ? '🎬' : '📺'}
            </PosterPlaceholder>
          )}

          {!isPerson && (
            <>
              <MediaTypeBadge mediaType={result.media_type || 'unknown'}>
                {result.media_type === 'movie' ? 'Movie' : 'TV'}
              </MediaTypeBadge>

              {result.vote_average && result.vote_average > 0 && (
                <RatingBadge>{result.vote_average.toFixed(1)}</RatingBadge>
              )}
            </>
          )}
        </PosterContainer>

        <CardContent>
          <Title>{getTitle()}</Title>

          {result.overview && !isPerson && (
            <Overview>{result.overview}</Overview>
          )}

          {isPerson && result.known_for_department && (
            <Overview>Known for: {result.known_for_department}</Overview>
          )}

          {!isPerson && (
            <MetaInfo>
              <ReleaseDate>{getReleaseDate()}</ReleaseDate>
              {result.popularity && (
                <PopularityScore>
                  Popularity: {Math.round(result.popularity)}
                </PopularityScore>
              )}
            </MetaInfo>
          )}

          {!isPerson && (
            <ActionButtons>
              <ActionButton as={Link} to={getDetailPath()} variant="secondary">
                View Details
              </ActionButton>
              {canAddToWatchlist && (
                <ActionButton onClick={handleAddToWatchlist}>
                  + Watchlist
                </ActionButton>
              )}
              {isAlreadyInWatchlist && (
                <ActionButton variant="secondary" disabled>
                  ✓ In Watchlist
                </ActionButton>
              )}
            </ActionButtons>
          )}

          {isPerson && (
            <ActionButtons>
              <ActionButton as={Link} to={getDetailPath()}>
                View Profile
              </ActionButton>
            </ActionButtons>
          )}
        </CardContent>
      </StyledLink>
    </Card>
  );
};

export default SearchResultCard;
