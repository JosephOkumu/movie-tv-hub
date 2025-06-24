import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TVShowDetails, OMDBResponse } from '../types';
import { TMDBService } from '../services/tmdb';
import { OMDBService } from '../services/omdb';
import { useWatchlist } from '../context/WatchlistContext';
import CastCarousel from '../components/detail/CastCarousel';
import VideoPlayer from '../components/detail/VideoPlayer';
import RatingsDisplay from '../components/detail/RatingsDisplay';
import SimilarContent from '../components/detail/SimilarContent';
import ReviewsSection from '../components/detail/ReviewsSection';
import LoadingSpinner from '../components/common/LoadingSpinner';

const TVDetailContainer = styled.div`
  min-height: calc(100vh - ${({ theme }) => theme.layout.headerHeight});
`;

const BackdropContainer = styled.div`
  position: relative;
  height: 50vh;
  min-height: 400px;
  overflow: hidden;
`;

const BackdropImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BackdropOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.7) 100%
  );
`;

const BackdropPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.neutral[300]};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes['6xl']};
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[4]};
  position: relative;
  z-index: 2;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: ${({ theme }) => theme.spacing[8]};
  margin-top: -150px;
  margin-bottom: ${({ theme }) => theme.spacing[8]};

  ${({ theme }) => theme.mediaQueries.tablet} {
    grid-template-columns: 1fr;
    margin-top: -100px;
    gap: ${({ theme }) => theme.spacing[6]};
  }
`;

const PosterContainer = styled.div`
  position: relative;
  z-index: 3;
`;

const PosterImage = styled.img`
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  transition: transform ${({ theme }) => theme.durations.normal}
    ${({ theme }) => theme.easings.easeInOut};

  &:hover {
    transform: scale(1.02);
  }
`;

const PosterPlaceholder = styled.div`
  width: 100%;
  height: 450px;
  background: ${({ theme }) => theme.colors.neutral[200]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes['6xl']};
  color: ${({ theme }) => theme.colors.neutral[400]};
  box-shadow: ${({ theme }) => theme.shadows.xl};
`;

const TVInfo = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[6]};
  box-shadow: ${({ theme }) => theme.shadows.md};
  margin-top: ${({ theme }) => theme.spacing[6]};

  ${({ theme }) => theme.mediaQueries.tablet} {
    margin-top: 0;
  }
`;

const TVTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  line-height: ${({ theme }) => theme.lineHeights.tight};

  ${({ theme }) => theme.mediaQueries.mobile} {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  }
`;

const TVTagline = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-style: italic;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

const TVMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const MetaItem = styled.span`
  background: ${({ theme }) => theme.colors.primary[100]};
  color: ${({ theme }) => theme.colors.primary[700]};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const GenreContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const GenreTag = styled.span`
  background: ${({ theme }) => theme.colors.secondary[100]};
  color: ${({ theme }) => theme.colors.secondary[700]};
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const RatingsSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

const Overview = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const OverviewText = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

const SeasonInfo = styled.div`
  background: ${({ theme }) => theme.colors.background.secondary};
  padding: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const SeasonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing[4]};
`;

const SeasonCard = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing[4]};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const SeasonTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const SeasonDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const NetworkInfo = styled.div`
  background: ${({ theme }) => theme.colors.background.secondary};
  padding: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const NetworkGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-top: ${({ theme }) => theme.spacing[2]};
`;

const NetworkTag = styled.span`
  background: ${({ theme }) => theme.colors.primary[100]};
  color: ${({ theme }) => theme.colors.primary[700]};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-top: ${({ theme }) => theme.spacing[6]};
  flex-wrap: wrap;
`;

const ActionButton = styled.button<{
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}>`
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all ${({ theme }) => theme.durations.fast}
    ${({ theme }) => theme.easings.easeInOut};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};

  ${({ theme, variant = 'primary' }) =>
    variant === 'primary'
      ? `
        background: ${theme.colors.primary[500]};
        color: white;
        border: 2px solid ${theme.colors.primary[500]};

        &:hover:not(:disabled) {
          background: ${theme.colors.primary[600]};
          border-color: ${theme.colors.primary[600]};
          transform: translateY(-2px);
        }
      `
      : `
        background: transparent;
        color: ${theme.colors.primary[500]};
        border: 2px solid ${theme.colors.primary[500]};

        &:hover:not(:disabled) {
          background: ${theme.colors.primary[50]};
          transform: translateY(-2px);
        }
      `}
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing[12]}
    ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ErrorIcon = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['6xl']};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const ErrorTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ErrorText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const BackButton = styled.button`
  background: ${({ theme }) => theme.colors.primary[500]};
  color: white;
  border: none;
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.durations.fast}
    ${({ theme }) => theme.easings.easeInOut};

  &:hover {
    background: ${({ theme }) => theme.colors.primary[600]};
    transform: translateY(-2px);
  }
`;

const DetailSections = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[8]};
`;

const TVDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const watchlist = useWatchlist();

  const [tvShow, setTVShow] = useState<TVShowDetails | null>(null);
  const [omdbData, setOmdbData] = useState<OMDBResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTVShowDetails = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        // Fetch TV show details from TMDB
        const tvData = await TMDBService.getTVShow(Number(id));
        setTVShow(tvData);

        // Try to fetch additional data from OMDB using the show name
        if (tvData.name) {
          try {
            const firstAirYear = tvData.first_air_date
              ? new Date(tvData.first_air_date).getFullYear()
              : undefined;
            const omdbResponse = await OMDBService.searchByTitle(
              tvData.name,
              firstAirYear,
              'series'
            );
            setOmdbData(omdbResponse);
          } catch (omdbError) {
            // OMDB data is optional, continue without it
            console.warn('Could not fetch OMDB data:', omdbError);
          }
        }
      } catch (err) {
        console.error('Error fetching TV show details:', err);
        setError('Failed to load TV show details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTVShowDetails();
  }, [id]);

  const handleAddToWatchlist = () => {
    if (tvShow && watchlist) {
      watchlist.addToWatchlist(tvShow, 'tv');
    }
  };

  const handleRemoveFromWatchlist = () => {
    if (tvShow && watchlist) {
      watchlist.removeFromWatchlist(tvShow.id);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <TVDetailContainer>
        <LoadingContainer>
          <LoadingSpinner size="large" />
        </LoadingContainer>
      </TVDetailContainer>
    );
  }

  if (error || !tvShow) {
    return (
      <TVDetailContainer>
        <ErrorContainer>
          <ErrorIcon>😞</ErrorIcon>
          <ErrorTitle>Oops! Something went wrong</ErrorTitle>
          <ErrorText>{error || 'TV show not found'}</ErrorText>
          <BackButton onClick={handleGoBack}>← Go Back</BackButton>
        </ErrorContainer>
      </TVDetailContainer>
    );
  }

  const isInWatchlist = watchlist?.isInWatchlist(tvShow.id) || false;
  const firstAirYear = tvShow.first_air_date
    ? TMDBService.getYearFromDate(tvShow.first_air_date)
    : 'Unknown';
  const lastAirYear = tvShow.last_air_date
    ? TMDBService.getYearFromDate(tvShow.last_air_date)
    : null;
  const yearRange =
    lastAirYear && lastAirYear !== firstAirYear
      ? `${firstAirYear} - ${lastAirYear}`
      : firstAirYear;

  const averageRuntime =
    tvShow.episode_run_time && tvShow.episode_run_time.length > 0
      ? Math.round(
          tvShow.episode_run_time.reduce((a, b) => a + b, 0) /
            tvShow.episode_run_time.length
        )
      : null;

  const trailers =
    tvShow.videos?.results.filter(
      video =>
        video.site === 'YouTube' &&
        (video.type === 'Trailer' || video.type === 'Teaser')
    ) || [];

  return (
    <TVDetailContainer>
      <BackdropContainer>
        {tvShow.backdrop_path ? (
          <>
            <BackdropImage
              src={TMDBService.buildBackdropUrl(tvShow.backdrop_path, 'w1280')}
              alt={tvShow.name}
            />
            <BackdropOverlay />
          </>
        ) : (
          <BackdropPlaceholder>📺</BackdropPlaceholder>
        )}
      </BackdropContainer>

      <ContentContainer>
        <MainContent>
          <PosterContainer>
            {tvShow.poster_path ? (
              <PosterImage
                src={TMDBService.buildImageUrl(tvShow.poster_path, 'w500')}
                alt={tvShow.name}
              />
            ) : (
              <PosterPlaceholder>📺</PosterPlaceholder>
            )}
          </PosterContainer>

          <TVInfo>
            <TVTitle>
              {tvShow.name} ({yearRange})
            </TVTitle>

            {/* TV shows don't typically have taglines */}

            <TVMeta>
              <MetaItem>{yearRange}</MetaItem>
              {averageRuntime && <MetaItem>{averageRuntime} min</MetaItem>}
              {omdbData?.Rated && omdbData.Rated !== 'N/A' && (
                <MetaItem>{omdbData.Rated}</MetaItem>
              )}
              {tvShow.status && <MetaItem>{tvShow.status}</MetaItem>}
              {tvShow.number_of_seasons && (
                <MetaItem>
                  {tvShow.number_of_seasons} Season
                  {tvShow.number_of_seasons > 1 ? 's' : ''}
                </MetaItem>
              )}
              {tvShow.number_of_episodes && (
                <MetaItem>
                  {tvShow.number_of_episodes} Episode
                  {tvShow.number_of_episodes > 1 ? 's' : ''}
                </MetaItem>
              )}
            </TVMeta>

            {tvShow.genres && tvShow.genres.length > 0 && (
              <GenreContainer>
                {tvShow.genres.map(genre => (
                  <GenreTag key={genre.id}>{genre.name}</GenreTag>
                ))}
              </GenreContainer>
            )}

            <RatingsSection>
              <SectionTitle>Ratings</SectionTitle>
              <RatingsDisplay
                tmdbRating={tvShow.vote_average}
                tmdbVoteCount={tvShow.vote_count}
                omdbData={omdbData || undefined}
                size="medium"
              />
            </RatingsSection>

            {tvShow.overview && (
              <Overview>
                <SectionTitle>Overview</SectionTitle>
                <OverviewText>{tvShow.overview}</OverviewText>
              </Overview>
            )}

            {tvShow.networks && tvShow.networks.length > 0 && (
              <NetworkInfo>
                <SectionTitle>Networks</SectionTitle>
                <NetworkGrid>
                  {tvShow.networks.map(network => (
                    <NetworkTag key={network.id}>{network.name}</NetworkTag>
                  ))}
                </NetworkGrid>
              </NetworkInfo>
            )}

            {tvShow.seasons && tvShow.seasons.length > 0 && (
              <SeasonInfo>
                <SectionTitle>Seasons</SectionTitle>
                <SeasonGrid>
                  {tvShow.seasons
                    .filter(season => season.season_number > 0)
                    .map(season => (
                      <SeasonCard key={season.id}>
                        <SeasonTitle>{season.name}</SeasonTitle>
                        <SeasonDetails>
                          <span>{season.episode_count} episodes</span>
                          {season.air_date && (
                            <span>
                              Aired:{' '}
                              {TMDBService.formatReleaseDate(season.air_date)}
                            </span>
                          )}
                          {season.overview && (
                            <span>
                              {season.overview.substring(0, 100)}
                              {season.overview.length > 100 ? '...' : ''}
                            </span>
                          )}
                        </SeasonDetails>
                      </SeasonCard>
                    ))}
                </SeasonGrid>
              </SeasonInfo>
            )}

            <ActionButtons>
              {isInWatchlist ? (
                <ActionButton
                  variant="secondary"
                  onClick={handleRemoveFromWatchlist}
                >
                  ✓ Remove from Watchlist
                </ActionButton>
              ) : (
                <ActionButton variant="primary" onClick={handleAddToWatchlist}>
                  ➕ Add to Watchlist
                </ActionButton>
              )}
              <ActionButton variant="secondary" onClick={handleGoBack}>
                ← Back
              </ActionButton>
            </ActionButtons>
          </TVInfo>
        </MainContent>

        <DetailSections>
          {trailers.length > 0 && (
            <VideoPlayer videos={trailers} title="Trailers & Videos" />
          )}

          {tvShow.credits?.cast && tvShow.credits.cast.length > 0 && (
            <CastCarousel cast={tvShow.credits.cast} title="Cast" />
          )}

          {tvShow.similar?.results && tvShow.similar.results.length > 0 && (
            <SimilarContent
              content={tvShow.similar.results}
              mediaType="tv"
              title="Similar TV Shows"
            />
          )}

          {tvShow.recommendations?.results &&
            tvShow.recommendations.results.length > 0 && (
              <SimilarContent
                content={tvShow.recommendations.results}
                mediaType="tv"
                title="Recommended TV Shows"
              />
            )}

          {tvShow.reviews?.results && tvShow.reviews.results.length > 0 && (
            <ReviewsSection
              reviews={tvShow.reviews.results}
              title="User Reviews"
            />
          )}
        </DetailSections>
      </ContentContainer>
    </TVDetailContainer>
  );
};

export default TVDetail;
