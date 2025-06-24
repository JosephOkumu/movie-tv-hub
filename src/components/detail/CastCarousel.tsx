import React from 'react';
import styled from 'styled-components';
import { CastMember } from '../../types';
import { TMDBService } from '../../services/tmdb';

interface CastCarouselProps {
  cast: CastMember[];
  title?: string;
}

const CastSection = styled.section`
  margin: ${({ theme }) => theme.spacing[8]} 0;
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const CastContainer = styled.div`
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

const CastCard = styled.div`
  min-width: 140px;
  max-width: 140px;
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  overflow: hidden;
  transition: all ${({ theme }) => theme.durations.fast}
    ${({ theme }) => theme.easings.easeInOut};
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const CastImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 210px;
  overflow: hidden;
`;

const CastImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${({ theme }) => theme.durations.normal}
    ${({ theme }) => theme.easings.easeInOut};

  ${CastCard}:hover & {
    transform: scale(1.05);
  }
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.neutral[200]};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  color: ${({ theme }) => theme.colors.neutral[400]};
`;

const CastInfo = styled.div`
  padding: ${({ theme }) => theme.spacing[3]};
`;

const CastName = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CharacterName = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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

export const CastCarousel: React.FC<CastCarouselProps> = ({
  cast,
  title = 'Cast',
}) => {
  if (!cast || cast.length === 0) {
    return (
      <CastSection>
        <SectionTitle>{title}</SectionTitle>
        <EmptyState>
          <EmptyStateIcon>🎭</EmptyStateIcon>
          <EmptyStateText>No cast information available</EmptyStateText>
        </EmptyState>
      </CastSection>
    );
  }

  const handleCastClick = (castMember: CastMember) => {
    // Future implementation: Navigate to person detail page
    console.log('Cast member clicked:', castMember.name);
  };

  return (
    <CastSection>
      <SectionTitle>{title}</SectionTitle>
      <CastContainer>
        {cast.slice(0, 20).map(castMember => (
          <CastCard
            key={castMember.id}
            onClick={() => handleCastClick(castMember)}
          >
            <CastImageContainer>
              {castMember.profile_path ? (
                <CastImage
                  src={TMDBService.buildProfileUrl(
                    castMember.profile_path,
                    'w185'
                  )}
                  alt={castMember.name}
                  loading="lazy"
                />
              ) : (
                <PlaceholderImage>👤</PlaceholderImage>
              )}
            </CastImageContainer>
            <CastInfo>
              <CastName>{castMember.name}</CastName>
              <CharacterName>{castMember.character}</CharacterName>
            </CastInfo>
          </CastCard>
        ))}
      </CastContainer>
    </CastSection>
  );
};

export default CastCarousel;
