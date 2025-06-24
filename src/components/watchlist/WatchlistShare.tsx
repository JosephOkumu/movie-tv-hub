import React, { useState } from 'react';
import styled from 'styled-components';
import { WatchlistItem } from '../../types';

const ShareContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ShareButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.colors.secondary[500]};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.durations.fast}
    ${({ theme }) => theme.easings.easeInOut};

  &:hover {
    background: ${({ theme }) => theme.colors.secondary[600]};
    transform: translateY(-1px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.secondary[200]};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.neutral[400]};
    cursor: not-allowed;
    transform: none;
  }
`;

const ShareModal = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: all ${({ theme }) => theme.durations.normal}
    ${({ theme }) => theme.easings.easeInOut};
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[6]};
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: ${({ theme }) => theme.shadows.xl};
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const ModalTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing[1]};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: all ${({ theme }) => theme.durations.fast}
    ${({ theme }) => theme.easings.easeInOut};

  &:hover {
    background: ${({ theme }) => theme.colors.neutral[100]};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const ShareOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const ShareOption = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  transition: all ${({ theme }) => theme.durations.fast}
    ${({ theme }) => theme.easings.easeInOut};
  text-align: left;
  width: 100%;

  &:hover {
    background: ${({ theme }) => theme.colors.neutral[50]};
    border-color: ${({ theme }) => theme.colors.border.medium};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

const ShareIcon = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  width: 24px;
  text-align: center;
`;

const ShareText = styled.div`
  flex: 1;
`;

const ShareTitle = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const ShareDescription = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
`;

const UrlInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[3]};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: monospace;
  margin-top: ${({ theme }) => theme.spacing[2]};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

const CopyButton = styled.button`
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  background: ${({ theme }) => theme.colors.primary[500]};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  margin-top: ${({ theme }) => theme.spacing[2]};
  transition: background-color ${({ theme }) => theme.durations.fast}
    ${({ theme }) => theme.easings.easeInOut};

  &:hover {
    background: ${({ theme }) => theme.colors.primary[600]};
  }
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background: ${({ theme }) => theme.colors.border.light};
  margin: ${({ theme }) => theme.spacing[4]} 0;
`;

const ShareStats = styled.div`
  background: ${({ theme }) => theme.colors.neutral[50]};
  padding: ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing[1]};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  &:last-child {
    margin-bottom: 0;
  }
`;

interface WatchlistShareProps {
  watchlist: WatchlistItem[];
  filteredItems?: WatchlistItem[];
  className?: string;
}

const WatchlistShare: React.FC<WatchlistShareProps> = ({
  watchlist,
  filteredItems,
  className,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const itemsToShare = filteredItems || watchlist;

  const generateShareableUrl = () => {
    const shareData = {
      title: 'My Movie & TV Watchlist',
      items: itemsToShare.map(item => ({
        id: item.id,
        title: item.title,
        type: item.media_type,
        year: item.release_date
          ? new Date(item.release_date).getFullYear()
          : null,
        rating: item.vote_average,
        watched: item.watched,
        userRating: item.user_rating,
      })),
      totalItems: itemsToShare.length,
      watchedItems: itemsToShare.filter(item => item.watched).length,
      createdAt: new Date().toISOString(),
    };

    // In a real app, you'd send this to your backend to create a shareable link
    // For now, we'll encode it as a base64 string in the URL
    const encodedData = btoa(JSON.stringify(shareData));
    const baseUrl = window.location.origin;
    return `${baseUrl}/shared-watchlist?data=${encodedData}`;
  };

  const handleShareUrl = () => {
    const url = generateShareableUrl();
    setShareUrl(url);
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const handleSocialShare = (platform: string) => {
    const shareText = `Check out my watchlist of ${itemsToShare.length} movies and TV shows!`;
    const shareUrl = generateShareableUrl();

    let url = '';
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'reddit':
        url = `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`;
        break;
      default:
        return;
    }

    window.open(url, '_blank', 'width=600,height=400');
  };

  const handleEmailShare = () => {
    const subject = 'Check out my movie & TV watchlist!';
    const body = `I wanted to share my watchlist of ${itemsToShare.length} movies and TV shows with you!\n\nView it here: ${generateShareableUrl()}`;
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const handleWhatsAppShare = () => {
    const shareText = `Check out my watchlist of ${itemsToShare.length} movies and TV shows! ${generateShareableUrl()}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (itemsToShare.length === 0) {
    return null;
  }

  const stats = {
    total: itemsToShare.length,
    watched: itemsToShare.filter(item => item.watched).length,
    movies: itemsToShare.filter(item => item.media_type === 'movie').length,
    tvShows: itemsToShare.filter(item => item.media_type === 'tv').length,
  };

  return (
    <ShareContainer className={className}>
      <ShareButton onClick={() => setIsModalOpen(true)}>
        <span>📤</span>
        Share Watchlist
      </ShareButton>

      <ShareModal isOpen={isModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Share Your Watchlist</ModalTitle>
            <CloseButton onClick={() => setIsModalOpen(false)}>×</CloseButton>
          </ModalHeader>

          <ShareStats>
            <StatRow>
              <span>Total Items:</span>
              <span>{stats.total}</span>
            </StatRow>
            <StatRow>
              <span>Watched:</span>
              <span>{stats.watched}</span>
            </StatRow>
            <StatRow>
              <span>Movies:</span>
              <span>{stats.movies}</span>
            </StatRow>
            <StatRow>
              <span>TV Shows:</span>
              <span>{stats.tvShows}</span>
            </StatRow>
          </ShareStats>

          <ShareOptions>
            <ShareOption onClick={handleShareUrl}>
              <ShareIcon>🔗</ShareIcon>
              <ShareText>
                <ShareTitle>Get Shareable Link</ShareTitle>
                <ShareDescription>
                  Generate a link that others can view your watchlist
                </ShareDescription>
              </ShareText>
            </ShareOption>

            {shareUrl && (
              <div>
                <UrlInput
                  value={shareUrl}
                  readOnly
                  onClick={e => (e.target as HTMLInputElement).select()}
                />
                <CopyButton onClick={handleCopyUrl}>
                  {copySuccess ? '✓ Copied!' : 'Copy Link'}
                </CopyButton>
              </div>
            )}

            <Divider />

            <ShareOption onClick={() => handleSocialShare('twitter')}>
              <ShareIcon>🐦</ShareIcon>
              <ShareText>
                <ShareTitle>Share on Twitter</ShareTitle>
                <ShareDescription>
                  Tweet your watchlist to your followers
                </ShareDescription>
              </ShareText>
            </ShareOption>

            <ShareOption onClick={() => handleSocialShare('facebook')}>
              <ShareIcon>📘</ShareIcon>
              <ShareText>
                <ShareTitle>Share on Facebook</ShareTitle>
                <ShareDescription>
                  Post to your Facebook timeline
                </ShareDescription>
              </ShareText>
            </ShareOption>

            <ShareOption onClick={() => handleSocialShare('reddit')}>
              <ShareIcon>🤖</ShareIcon>
              <ShareText>
                <ShareTitle>Share on Reddit</ShareTitle>
                <ShareDescription>
                  Post to your favorite subreddit
                </ShareDescription>
              </ShareText>
            </ShareOption>

            <ShareOption onClick={handleWhatsAppShare}>
              <ShareIcon>💬</ShareIcon>
              <ShareText>
                <ShareTitle>Share on WhatsApp</ShareTitle>
                <ShareDescription>
                  Send to your WhatsApp contacts
                </ShareDescription>
              </ShareText>
            </ShareOption>

            <ShareOption onClick={handleEmailShare}>
              <ShareIcon>📧</ShareIcon>
              <ShareText>
                <ShareTitle>Share via Email</ShareTitle>
                <ShareDescription>
                  Send your watchlist via email
                </ShareDescription>
              </ShareText>
            </ShareOption>
          </ShareOptions>
        </ModalContent>
      </ShareModal>
    </ShareContainer>
  );
};

export default WatchlistShare;
