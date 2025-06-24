import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MovieDetails, OMDBResponse } from '../types';
import { TMDBService } from '../services/tmdb';
import { OMDBService } from '../services/omdb';
import { useWatchlist } from '../context/WatchlistContext';
import CastCarousel from '../components/detail/CastCarousel';
import VideoPlayer from '../components/detail/VideoPlayer';
import RatingsDisplay from '../components/detail/RatingsDisplay';
import SimilarContent from '../components/detail/SimilarContent';
import ReviewsSection from '../components/detail/ReviewsSection';
import LoadingSpinner from '../components/common/LoadingSpinner';

const MovieDetailContainer = styled.div`
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

const MovieInfo = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[6]};
  box-shadow: ${({ theme }) => theme.shadows.md};
  margin-top: ${({ theme }) => theme.spacing[6]};

  ${({ theme }) => theme.mediaQueries.tablet} {
    margin-top: 0;
  }
`;

const MovieTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  line-height: ${({ theme }) => theme.lineHeights.tight};

  ${({ theme }) => theme.mediaQueries.mobile} {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  }
`;

const MovieTagline = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-style: italic;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

const MovieMeta = styled.div`
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

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const watchlist = useWatchlist();

  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [omdbData, setOmdbData] = useState<OMDBResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        // Fetch movie details from TMDB
        const movieData = await TMDBService.getMovie(Number(id));
        setMovie(movieData);

        // Fetch additional data from OMDB if we have an IMDB ID
        if (movieData.imdb_id) {
          try {
            const omdbResponse = await OMDBService.searchByIMDBId(
              movieData.imdb_id
            );
            setOmdbData(omdbResponse);
          } catch (omdbError) {
            // OMDB data is optional, continue without it
            console.warn('Could not fetch OMDB data:', omdbError);
          }
        }
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError('Failed to load movie details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleAddToWatchlist = () => {
    if (movie && watchlist) {
      watchlist.addToWatchlist(movie, 'movie');
    }
  };

  const handleRemoveFromWatchlist = () => {
    if (movie && watchlist) {
      watchlist.removeFromWatchlist(movie.id);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <MovieDetailContainer>
        <LoadingContainer>
          <LoadingSpinner size="large" />
        </LoadingContainer>
      </MovieDetailContainer>
    );
  }

  if (error || !movie) {
    return (
      <MovieDetailContainer>
        <ErrorContainer>
          <ErrorIcon>😞</ErrorIcon>
          <ErrorTitle>Oops! Something went wrong</ErrorTitle>
          <ErrorText>{error || 'Movie not found'}</ErrorText>
          <BackButton onClick={handleGoBack}>← Go Back</BackButton>
        </ErrorContainer>
      </MovieDetailContainer>
    );
  }

  const isInWatchlist = watchlist?.isInWatchlist(movie.id) || false;
  const releaseYear = movie.release_date
    ? TMDBService.getYearFromDate(movie.release_date)
    : 'Unknown';
  const formattedRuntime = movie.runtime
    ? TMDBService.formatRuntime(movie.runtime)
    : 'Unknown';
  const trailers =
    movie.videos?.results.filter(
      video =>
        video.site === 'YouTube' &&
        (video.type === 'Trailer' || video.type === 'Teaser')
    ) || [];

  return (
    <MovieDetailContainer>
      <BackdropContainer>
        {movie.backdrop_path ? (
          <>
            <BackdropImage
              src={TMDBService.buildBackdropUrl(movie.backdrop_path, 'w1280')}
              alt={movie.title}
            />
            <BackdropOverlay />
          </>
        ) : (
          <BackdropPlaceholder>🎬</BackdropPlaceholder>
        )}
      </BackdropContainer>

      <ContentContainer>
        <MainContent>
          <PosterContainer>
            {movie.poster_path ? (
              <PosterImage
                src={TMDBService.buildImageUrl(movie.poster_path, 'w500')}
                alt={movie.title}
              />
            ) : (
              <PosterPlaceholder>🎬</PosterPlaceholder>
            )}
          </PosterContainer>

          <MovieInfo>
            <MovieTitle>
              {movie.title} ({releaseYear})
            </MovieTitle>

            {movie.tagline && <MovieTagline>"{movie.tagline}"</MovieTagline>}

            <MovieMeta>
              <MetaItem>{releaseYear}</MetaItem>
              {movie.runtime && <MetaItem>{formattedRuntime}</MetaItem>}
              {omdbData?.Rated && omdbData.Rated !== 'N/A' && (
                <MetaItem>{omdbData.Rated}</MetaItem>
              )}
              {movie.status && <MetaItem>{movie.status}</MetaItem>}
            </MovieMeta>

            {movie.genres && movie.genres.length > 0 && (
              <GenreContainer>
                {movie.genres.map(genre => (
                  <GenreTag key={genre.id}>{genre.name}</GenreTag>
                ))}
              </GenreContainer>
            )}

            <RatingsSection>
              <SectionTitle>Ratings</SectionTitle>
              <RatingsDisplay
                tmdbRating={movie.vote_average}
                tmdbVoteCount={movie.vote_count}
                omdbData={omdbData || undefined}
                size="medium"
              />
            </RatingsSection>

            {movie.overview && (
              <Overview>
                <SectionTitle>Overview</SectionTitle>
                <OverviewText>{movie.overview}</OverviewText>
              </Overview>
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
          </MovieInfo>
        </MainContent>

        <DetailSections>
          {trailers.length > 0 && (
            <VideoPlayer videos={trailers} title="Trailers & Videos" />
          )}

          {movie.credits?.cast && movie.credits.cast.length > 0 && (
            <CastCarousel cast={movie.credits.cast} title="Cast" />
          )}

          {movie.similar?.results && movie.similar.results.length > 0 && (
            <SimilarContent
              content={movie.similar.results}
              mediaType="movie"
              title="Similar Movies"
            />
          )}

          {movie.recommendations?.results &&
            movie.recommendations.results.length > 0 && (
              <SimilarContent
                content={movie.recommendations.results}
                mediaType="movie"
                title="Recommended Movies"
              />
            )}

          {movie.reviews?.results && movie.reviews.results.length > 0 && (
            <ReviewsSection
              reviews={movie.reviews.results}
              title="User Reviews"
            />
          )}
        </DetailSections>
      </ContentContainer>
    </MovieDetailContainer>
  );
};

export default MovieDetail;
