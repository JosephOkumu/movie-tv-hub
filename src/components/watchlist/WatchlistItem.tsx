import React, { useState } from 'react';
import styled from 'styled-components';
import { WatchlistItem as WatchlistItemType } from '../../types';

const WatchlistItemContainer = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition:
    transform ${({ theme }) => theme.durations.fast}
      ${({ theme }) => theme.easings.easeInOut},
    box-shadow ${({ theme }) => theme.durations.fast}
      ${({ theme }) => theme.easings.easeInOut};
  margin-bottom: ${({ theme }) => theme.spacing[4]};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  ${({ theme }) => theme.mediaQueries.mobile} {
    flex-direction: column;
  }
`;

const ItemImage = styled.img`
  width: 120px;
  height: 180px;
  object-fit: cover;
  flex-shrink: 0;

  ${({ theme }) => theme.mediaQueries.mobile} {
    width: 100%;
    height: 200px;
  }
`;

const ItemContent = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[4]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const ItemTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  line-height: ${({ theme }) => theme.lineHeights.tight};
`;

const ItemMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const MediaTypeBadge = styled.span<{ mediaType: 'movie' | 'tv' }>`
  background: ${({ theme, mediaType }) =>
    mediaType === 'movie'
      ? theme.colors.primary[100]
      : theme.colors.success[100]};
  color: ${({ theme, mediaType }) =>
    mediaType === 'movie'
      ? theme.colors.primary[700]
      : theme.colors.success[700]};
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: uppercase;
`;

const WatchedToggle = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
`;

const RatingSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  flex-wrap: wrap;
`;

const RatingLabel = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const StarRating = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[1]};
`;

const Star = styled.button<{ filled: boolean }>`
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme, filled }) =>
    filled ? theme.colors.warning[400] : theme.colors.neutral[300]};
  cursor: pointer;
  padding: 0;
  transition: color ${({ theme }) => theme.durations.fast}
    ${({ theme }) => theme.easings.easeInOut};

  &:hover {
    color: ${({ theme }) => theme.colors.warning[400]};
  }
`;

const TMDBRating = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const NotesSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const NotesTextarea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: ${({ theme }) => theme.spacing[2]};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[500]};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
  align-items: center;
  flex-wrap: wrap;
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'danger' }>`
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.durations.fast}
    ${({ theme }) => theme.easings.easeInOut};

  ${({ theme, variant = 'primary' }) => {
    if (variant === 'danger') {
      return `
        background: ${theme.colors.error[500]};
        color: white;
        border: none;

        &:hover {
          background: ${theme.colors.error[600]};
        }
      `;
    }
    return `
      background: ${theme.colors.primary[500]};
      color: white;
      border: none;

      &:hover {
        background: ${theme.colors.primary[600]};
      }
    `;
  }}
`;

const AddedDate = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  margin-top: auto;
`;

interface WatchlistItemProps {
  item: WatchlistItemType;
  onRemove: (id: number) => void;
  onToggleWatched: (id: number) => void;
  onRatingChange: (id: number, rating: number) => void;
  onNotesChange: (id: number, notes: string) => void;
}

const WatchlistItem: React.FC<WatchlistItemProps> = ({
  item,
  onRemove,
  onToggleWatched,
  onRatingChange,
  onNotesChange,
}) => {
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [tempNotes, setTempNotes] = useState(item.notes || '');

  const handleStarClick = (rating: number) => {
    onRatingChange(item.id, rating);
  };

  const handleNotesSubmit = () => {
    onNotesChange(item.id, tempNotes);
    setIsEditingNotes(false);
  };

  const handleNotesCancel = () => {
    setTempNotes(item.notes || '');
    setIsEditingNotes(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const posterUrl = item.poster_path
    ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
    : '/placeholder-poster.svg';

  return (
    <WatchlistItemContainer>
      <ItemImage
        src={posterUrl}
        alt={item.title}
        onError={e => {
          const target = e.target as HTMLImageElement;
          target.src = '/placeholder-poster.svg';
        }}
      />

      <ItemContent>
        <ItemHeader>
          <div>
            <ItemTitle>{item.title}</ItemTitle>
            <ItemMeta>
              <MediaTypeBadge mediaType={item.media_type}>
                {item.media_type === 'movie' ? 'Movie' : 'TV Show'}
              </MediaTypeBadge>
              {item.release_date && (
                <span>• {new Date(item.release_date).getFullYear()}</span>
              )}
              <TMDBRating>
                <span>⭐</span>
                <span>{item.vote_average.toFixed(1)}</span>
              </TMDBRating>
            </ItemMeta>
          </div>
        </ItemHeader>

        <WatchedToggle>
          <Checkbox
            type="checkbox"
            id={`watched-${item.id}`}
            checked={item.watched}
            onChange={() => onToggleWatched(item.id)}
          />
          <CheckboxLabel htmlFor={`watched-${item.id}`}>
            {item.watched ? 'Watched' : 'Mark as watched'}
          </CheckboxLabel>
        </WatchedToggle>

        <RatingSection>
          <RatingLabel>Your Rating:</RatingLabel>
          <StarRating>
            {[1, 2, 3, 4, 5].map(rating => (
              <Star
                key={rating}
                filled={rating <= (item.user_rating || 0)}
                onClick={() => handleStarClick(rating)}
                title={`Rate ${rating} star${rating > 1 ? 's' : ''}`}
              >
                ★
              </Star>
            ))}
          </StarRating>
          {item.user_rating && <span>({item.user_rating}/5)</span>}
        </RatingSection>

        <NotesSection>
          <RatingLabel>Notes:</RatingLabel>
          {isEditingNotes ? (
            <>
              <NotesTextarea
                value={tempNotes}
                onChange={e => setTempNotes(e.target.value)}
                placeholder="Add your notes about this title..."
                autoFocus
              />
              <ActionButtons>
                <ActionButton onClick={handleNotesSubmit}>
                  Save Notes
                </ActionButton>
                <ActionButton onClick={handleNotesCancel}>Cancel</ActionButton>
              </ActionButtons>
            </>
          ) : (
            <>
              <div style={{ minHeight: '40px', padding: '8px 0' }}>
                {item.notes ? (
                  <span style={{ fontSize: '14px', lineHeight: '1.5' }}>
                    {item.notes}
                  </span>
                ) : (
                  <span
                    style={{
                      fontSize: '14px',
                      color: 'var(--text-secondary)',
                      fontStyle: 'italic',
                    }}
                  >
                    No notes added yet
                  </span>
                )}
              </div>
              <ActionButtons>
                <ActionButton onClick={() => setIsEditingNotes(true)}>
                  {item.notes ? 'Edit Notes' : 'Add Notes'}
                </ActionButton>
                <ActionButton
                  variant="danger"
                  onClick={() => onRemove(item.id)}
                >
                  Remove from Watchlist
                </ActionButton>
              </ActionButtons>
            </>
          )}
        </NotesSection>

        <AddedDate>Added on {formatDate(item.added_date)}</AddedDate>
      </ItemContent>
    </WatchlistItemContainer>
  );
};

export default WatchlistItem;
