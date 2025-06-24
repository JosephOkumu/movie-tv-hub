import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  padding: ${({ theme }) => theme.spacing[6]} 0;
  min-height: calc(100vh - ${({ theme }) => theme.layout.headerHeight} - ${({ theme }) => theme.layout.footerHeight});
`;

const Hero = styled.section`
  text-align: center;
  padding: ${({ theme }) => theme.spacing[12]} 0;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary[500]} 0%, ${({ theme }) => theme.colors.primary[700]} 100%);
  color: white;
  margin-bottom: ${({ theme }) => theme.spacing[10]};
`;

const HeroTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['5xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  color: white;

  ${({ theme }) => theme.mediaQueries.mobile} {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
  }
`;

const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  color: rgba(255, 255, 255, 0.9);

  ${({ theme }) => theme.mediaQueries.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    padding: 0 ${({ theme }) => theme.spacing[4]};
  }
`;

const CTAButton = styled.button`
  background: ${({ theme }) => theme.colors.accent[500]};
  color: white;
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[8]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  transition: background-color ${({ theme }) => theme.durations.fast} ${({ theme }) => theme.easings.easeInOut};

  &:hover {
    background: ${({ theme }) => theme.colors.accent[600]};
  }
`;

const SectionContainer = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing[12]};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const PlaceholderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing[6]};
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[4]};
`;

const PlaceholderCard = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[6]};
  box-shadow: ${({ theme }) => theme.shadows.md};
  text-align: center;
  transition: transform ${({ theme }) => theme.durations.fast} ${({ theme }) => theme.easings.easeInOut};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const PlaceholderIcon = styled.div`
  width: 60px;
  height: 60px;
  background: ${({ theme }) => theme.colors.primary[100]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  margin: 0 auto ${({ theme }) => theme.spacing[4]};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  color: ${({ theme }) => theme.colors.primary[600]};
`;

const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const CardDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <Hero>
        <div className="container">
          <HeroTitle>Discover Your Next Favorite</HeroTitle>
          <HeroSubtitle>
            Explore thousands of movies and TV shows, manage your watchlist,
            and discover trending content all in one place.
          </HeroSubtitle>
          <CTAButton>Start Exploring</CTAButton>
        </div>
      </Hero>

      <div className="container">
        <SectionContainer>
          <SectionTitle>Features</SectionTitle>
          <PlaceholderGrid>
            <PlaceholderCard>
              <PlaceholderIcon>🔍</PlaceholderIcon>
              <CardTitle>Smart Search</CardTitle>
              <CardDescription>
                Find movies and TV shows with our intelligent search featuring
                real-time results and advanced filtering options.
              </CardDescription>
            </PlaceholderCard>

            <PlaceholderCard>
              <PlaceholderIcon>📝</PlaceholderIcon>
              <CardTitle>Personal Watchlist</CardTitle>
              <CardDescription>
                Create and manage your personal watchlist, mark items as watched,
                and add your own ratings and notes.
              </CardDescription>
            </PlaceholderCard>

            <PlaceholderCard>
              <PlaceholderIcon>🔥</PlaceholderIcon>
              <CardTitle>Trending Content</CardTitle>
              <CardDescription>
                Stay up-to-date with the latest trending movies and TV shows
                from around the world.
              </CardDescription>
            </PlaceholderCard>

            <PlaceholderCard>
              <PlaceholderIcon>⭐</PlaceholderIcon>
              <CardTitle>Multiple Ratings</CardTitle>
              <CardDescription>
                View ratings from IMDB, Rotten Tomatoes, and TMDB all in one place
                to make informed viewing decisions.
              </CardDescription>
            </PlaceholderCard>
          </PlaceholderGrid>
        </SectionContainer>

        <SectionContainer>
          <SectionTitle>Coming Soon</SectionTitle>
          <PlaceholderGrid>
            <PlaceholderCard>
              <PlaceholderIcon>🎬</PlaceholderIcon>
              <CardTitle>Trending Movies</CardTitle>
              <CardDescription>
                Popular movies will be displayed here
              </CardDescription>
            </PlaceholderCard>

            <PlaceholderCard>
              <PlaceholderIcon>📺</PlaceholderIcon>
              <CardTitle>Popular TV Shows</CardTitle>
              <CardDescription>
                Trending TV shows will be displayed here
              </CardDescription>
            </PlaceholderCard>

            <PlaceholderCard>
              <PlaceholderIcon>🆕</PlaceholderIcon>
              <CardTitle>Latest Releases</CardTitle>
              <CardDescription>
                New releases will be displayed here
              </CardDescription>
            </PlaceholderCard>
          </PlaceholderGrid>
        </SectionContainer>
      </div>
    </HomeContainer>
  );
};

export default Home;
