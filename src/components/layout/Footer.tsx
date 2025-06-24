import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.background.secondary};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: ${({ theme }) => theme.layout.containerMaxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[6]};
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing[8]};
  margin-bottom: ${({ theme }) => theme.spacing[8]};

  ${({ theme }) => theme.mediaQueries.mobile} {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing[6]};
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const FooterTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  transition: color ${({ theme }) => theme.durations.fast} ${({ theme }) => theme.easings.easeInOut};

  &:hover {
    color: ${({ theme }) => theme.colors.primary[600]};
  }
`;

const FooterExternalLink = styled.a`
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  transition: color ${({ theme }) => theme.durations.fast} ${({ theme }) => theme.easings.easeInOut};

  &:hover {
    color: ${({ theme }) => theme.colors.primary[600]};
  }
`;

const FooterText = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

const FooterBottom = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  padding-top: ${({ theme }) => theme.spacing[6]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[4]};

  ${({ theme }) => theme.mediaQueries.mobile} {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  transition: color ${({ theme }) => theme.durations.fast} ${({ theme }) => theme.easings.easeInOut};

  &:hover {
    color: ${({ theme }) => theme.colors.primary[600]};
  }
`;

const APICredit = styled.div`
  background: ${({ theme }) => theme.colors.primary[50]};
  padding: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const APICreditText = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const APILinks = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[4]};
  flex-wrap: wrap;
`;

const APILink = styled.a`
  color: ${({ theme }) => theme.colors.primary[600]};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};

  &:hover {
    text-decoration: underline;
  }
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <APICredit>
          <APICreditText>
            This product uses the TMDB API but is not endorsed or certified by TMDB.
            Additional data provided by OMDB API.
          </APICreditText>
          <APILinks>
            <APILink href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
              The Movie Database (TMDB)
            </APILink>
            <APILink href="https://www.omdbapi.com/" target="_blank" rel="noopener noreferrer">
              Open Movie Database (OMDB)
            </APILink>
          </APILinks>
        </APICredit>

        <FooterGrid>
          <FooterSection>
            <FooterTitle>Navigation</FooterTitle>
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/search">Search</FooterLink>
            <FooterLink to="/trending">Trending</FooterLink>
            <FooterLink to="/watchlist">Watchlist</FooterLink>
          </FooterSection>

          <FooterSection>
            <FooterTitle>Categories</FooterTitle>
            <FooterLink to="/search?type=movie">Movies</FooterLink>
            <FooterLink to="/search?type=tv">TV Shows</FooterLink>
            <FooterLink to="/trending?type=movie">Trending Movies</FooterLink>
            <FooterLink to="/trending?type=tv">Trending TV Shows</FooterLink>
          </FooterSection>

          <FooterSection>
            <FooterTitle>About</FooterTitle>
            <FooterText>
              Movie/TV Hub is a comprehensive entertainment discovery platform
              that helps you find, track, and manage your favorite movies and TV shows.
            </FooterText>
            <FooterText>
              Built with React, TypeScript, and powered by TMDB and OMDB APIs.
            </FooterText>
          </FooterSection>

          <FooterSection>
            <FooterTitle>Resources</FooterTitle>
            <FooterExternalLink href="https://github.com" target="_blank" rel="noopener noreferrer">
              GitHub Repository
            </FooterExternalLink>
            <FooterExternalLink href="https://www.themoviedb.org/documentation/api" target="_blank" rel="noopener noreferrer">
              TMDB API Documentation
            </FooterExternalLink>
            <FooterExternalLink href="https://www.omdbapi.com/" target="_blank" rel="noopener noreferrer">
              OMDB API Documentation
            </FooterExternalLink>
          </FooterSection>
        </FooterGrid>

        <FooterBottom>
          <Copyright>
            © {currentYear} Movie/TV Hub. All rights reserved.
          </Copyright>

          <SocialLinks>
            <SocialLink href="https://github.com" target="_blank" rel="noopener noreferrer" title="GitHub">
              📱
            </SocialLink>
            <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter">
              🐦
            </SocialLink>
            <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn">
              💼
            </SocialLink>
          </SocialLinks>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
