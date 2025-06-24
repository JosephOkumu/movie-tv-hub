import React, { useState } from 'react';
import styled from 'styled-components';
import { Review } from '../../types';

interface ReviewsSectionProps {
  reviews: Review[];
  title?: string;
}

const ReviewSection = styled.section`
  margin: ${({ theme }) => theme.spacing[8]} 0;
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
`;

const ReviewCard = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[6]};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: box-shadow ${({ theme }) => theme.durations.fast} ${({ theme }) => theme.easings.easeInOut};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const AuthorAvatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  background: ${({ theme }) => theme.colors.neutral[200]};
`;

const AvatarPlaceholder = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary[500]};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const AuthorDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const AuthorUsername = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ReviewMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  flex-wrap: wrap;
`;

const UserRating = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  background: ${({ theme }) => theme.colors.rating.good};
  color: white;
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const ReviewDate = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ReviewContent = styled.div<{ expanded: boolean }>`
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  font-size: ${({ theme }) => theme.fontSizes.base};

  ${({ expanded }) => !expanded && `
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    overflow: hidden;
  `}
`;

const ExpandButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary[500]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  margin-top: ${({ theme }) => theme.spacing[2]};
  padding: 0;
  transition: color ${({ theme }) => theme.durations.fast} ${({ theme }) => theme.easings.easeInOut};

  &:hover {
    color: ${({ theme }) => theme.colors.primary[600]};
    text-decoration: underline;
  }
`;

const LoadMoreButton = styled.button`
  background: ${({ theme }) => theme.colors.primary[500]};
  color: white;
  border: none;
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.durations.fast} ${({ theme }) => theme.easings.easeInOut};
  align-self: center;
  margin-top: ${({ theme }) => theme.spacing[4]};

  &:hover {
    background: ${({ theme }) => theme.colors.primary[600]};
    transform: translateY(-2px);
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

const INITIAL_REVIEWS_COUNT = 3;

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  title = "Reviews"
}) => {
  const [expandedReviews, setExpandedReviews] = useState<Set<string>>(new Set());
  const [visibleCount, setVisibleCount] = useState(INITIAL_REVIEWS_COUNT);

  if (!reviews || reviews.length === 0) {
    return (
      <ReviewSection>
        <SectionTitle>{title}</SectionTitle>
        <EmptyState>
          <EmptyStateIcon>💬</EmptyStateIcon>
          <EmptyStateText>No reviews available</EmptyStateText>
        </EmptyState>
      </ReviewSection>
    );
  }

  const toggleReviewExpansion = (reviewId: string) => {
    const newExpanded = new Set(expandedReviews);
    if (newExpanded.has(reviewId)) {
      newExpanded.delete(reviewId);
    } else {
      newExpanded.add(reviewId);
    }
    setExpandedReviews(newExpanded);
  };

  const loadMoreReviews = () => {
    setVisibleCount(prev => Math.min(prev + INITIAL_REVIEWS_COUNT, reviews.length));
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAuthorInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const formatContent = (content: string): string => {
    // Remove excessive line breaks and clean up formatting
    return content
      .replace(/\n{3,}/g, '\n\n')
      .replace(/\r\n/g, '\n')
      .trim();
  };

  const getAvatarUrl = (avatarPath: string | null): string | null => {
    if (!avatarPath) return null;

    // Handle Gravatar URLs that start with /https:
    if (avatarPath.startsWith('/https:')) {
      return avatarPath.substring(1);
    }

    // Handle relative paths
    if (avatarPath.startsWith('/')) {
      return `https://image.tmdb.org/t/p/w185${avatarPath}`;
    }

    return avatarPath;
  };

  const shouldShowExpandButton = (content: string): boolean => {
    return content.length > 500 || content.split('\n').length > 6;
  };

  const visibleReviews = reviews.slice(0, visibleCount);

  return (
    <ReviewSection>
      <SectionTitle>{title} ({reviews.length})</SectionTitle>
      <ReviewsContainer>
        {visibleReviews.map((review) => {
          const isExpanded = expandedReviews.has(review.id);
          const formattedContent = formatContent(review.content);
          const showExpandButton = shouldShowExpandButton(formattedContent);
          const avatarUrl = getAvatarUrl(review.author_details.avatar_path);

          return (
            <ReviewCard key={review.id}>
              <ReviewHeader>
                <AuthorInfo>
                  {avatarUrl ? (
                    <AuthorAvatar src={avatarUrl} alt={review.author} />
                  ) : (
                    <AvatarPlaceholder>
                      {getAuthorInitials(review.author)}
                    </AvatarPlaceholder>
                  )}
                  <AuthorDetails>
                    <AuthorName>{review.author_details.name || review.author}</AuthorName>
                    {review.author_details.username && (
                      <AuthorUsername>@{review.author_details.username}</AuthorUsername>
                    )}
                  </AuthorDetails>
                </AuthorInfo>

                <ReviewMeta>
                  {review.author_details.rating && (
                    <UserRating>
                      ⭐ {review.author_details.rating}/10
                    </UserRating>
                  )}
                  <ReviewDate>{formatDate(review.created_at)}</ReviewDate>
                </ReviewMeta>
              </ReviewHeader>

              <ReviewContent expanded={isExpanded}>
                {formattedContent}
              </ReviewContent>

              {showExpandButton && (
                <ExpandButton onClick={() => toggleReviewExpansion(review.id)}>
                  {isExpanded ? 'Show Less' : 'Read More'}
                </ExpandButton>
              )}
            </ReviewCard>
          );
        })}

        {visibleCount < reviews.length && (
          <LoadMoreButton onClick={loadMoreReviews}>
            Load More Reviews ({reviews.length - visibleCount} remaining)
          </LoadMoreButton>
        )}
      </ReviewsContainer>
    </ReviewSection>
  );
};

export default ReviewsSection;
