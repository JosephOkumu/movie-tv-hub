import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const TVDetailContainer = styled.div`
  padding: ${({ theme }) => theme.spacing[6]} 0;
  min-height: calc(100vh - ${({ theme }) => theme.layout.headerHeight});
`;

const DetailHeader = styled.div`
  background: ${({ theme }) => theme.colors.background.secondary};
  padding: ${({ theme }) => theme.spacing[8]} 0;
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const DetailTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.text.primary};

  ${({ theme }) => theme.mediaQueries.mobile} {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  }
`;

const DetailSubtitle = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  max-width: 600px;
  margin: 0 auto;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[4]};
`;

const PlaceholderCard = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[8]};
  box-shadow: ${({ theme }) => theme.shadows.md};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const TVGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: ${({ theme }) => theme.spacing[8]};
  margin-bottom: ${({ theme }) => theme.spacing[8]};

  ${({ theme }) => theme.mediaQueries.tablet} {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing[6]};
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
`;

const TVInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const TVTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const TVMeta = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const MetaItem = styled.span`
  background: ${({ theme }) => theme.colors.primary[100]};
  color: ${({ theme }) => theme.colors.primary[700]};
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const RatingContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[6]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  flex-wrap: wrap;
`;

const RatingItem = styled.div`
  text-align: center;
`;

const RatingValue = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.rating.good};
`;

const RatingLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: ${({ theme }) => theme.spacing[1]};
`;

const Overview = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
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
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const SeasonTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const SeasonDetails = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  flex-wrap: wrap;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-top: ${({ theme }) => theme.spacing[6]};
  flex-wrap: wrap;
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.durations.fast} ${({ theme }) => theme.easings.easeInOut};

  ${({ theme, variant = 'primary' }) =>
    variant === 'primary'
      ? `
        background: ${theme.colors.primary[500]};
        color: white;
        border: 2px solid ${theme.colors.primary[500]};

        &:hover {
          background: ${theme.colors.primary[600]};
          border-color: ${theme.colors.primary[600]};
        }
      `
      : `
        background: transparent;
        color: ${theme.colors.primary[500]};
        border: 2px solid ${theme.colors.primary[500]};

        &:hover {
          background: ${theme.colors.primary[50]};
        }
      `}
`;

const PlaceholderSection = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing[12]} ${({ theme }) => theme.spacing[4]};
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

const TVDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <TVDetailContainer>
      <DetailHeader>
        <div className="container">
          <DetailTitle>TV Show Details</DetailTitle>
          <DetailSubtitle>
            Detailed information about the selected TV show
          </DetailSubtitle>
        </div>
      </DetailHeader>

      <ContentContainer>
        <PlaceholderCard>
          <TVGrid>
            <PosterPlaceholder>
              📺
            </PosterPlaceholder>

            <TVInfo>
              <TVTitle>Sample TV Show Title</TVTitle>

              <TVMeta>
                <MetaItem>2022-2024</MetaItem>
                <MetaItem>TV-14</MetaItem>
                <MetaItem>45 min</MetaItem>
                <MetaItem>Drama, Thriller</MetaItem>
                <MetaItem>Ongoing</MetaItem>
              </TVMeta>

              <RatingContainer>
                <RatingItem>
                  <RatingValue>8.7</RatingValue>
                  <RatingLabel>TMDB</RatingLabel>
                </RatingItem>
                <RatingItem>
                  <RatingValue>8.2</RatingValue>
                  <RatingLabel>IMDB</RatingLabel>
                </RatingItem>
                <RatingItem>
                  <RatingValue>92%</RatingValue>
                  <RatingLabel>Rotten Tomatoes</RatingLabel>
                </RatingItem>
              </RatingContainer>

              <Overview>
                <SectionTitle>Overview</SectionTitle>
                <OverviewText>
                  This is where the TV show overview/plot summary would appear.
                  The actual content will be loaded from the TMDB API when the
                  TV show detail functionality is implemented.
                </OverviewText>
              </Overview>

              <SeasonInfo>
                <SeasonTitle>Season Information</SeasonTitle>
                <SeasonDetails>
                  <span>3 Seasons</span>
                  <span>•</span>
                  <span>24 Episodes</span>
                  <span>•</span>
                  <span>Last aired: December 2024</span>
                </SeasonDetails>
              </SeasonInfo>

              <ActionButtons>
                <ActionButton variant="primary">
                  ➕ Add to Watchlist
                </ActionButton>
                <ActionButton variant="secondary">
                  ⭐ Rate Show
                </ActionButton>
                <ActionButton variant="secondary">
                  🎥 Watch Trailer
                </ActionButton>
              </ActionButtons>
            </TVInfo>
          </TVGrid>
        </PlaceholderCard>

        <PlaceholderSection>
          <PlaceholderIcon>🎭</PlaceholderIcon>
          <PlaceholderTitle>TV Show ID: {id}</PlaceholderTitle>
          <PlaceholderText>
            Cast, crew, episodes, seasons, similar shows, and reviews will be displayed here
            when the TV show detail functionality is fully implemented.
          </PlaceholderText>
        </PlaceholderSection>
      </ContentContainer>
    </TVDetailContainer>
  );
};

export default TVDetail;
