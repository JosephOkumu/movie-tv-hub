import React, { useState } from 'react';
import styled from 'styled-components';
import { Video } from '../../types';

interface VideoPlayerProps {
  videos: Video[];
  title?: string;
}

const VideoSection = styled.section`
  margin: ${({ theme }) => theme.spacing[8]} 0;
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
`;

const MainVideoContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const VideoIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

const VideoThumbnail = styled.div<{ thumbnail: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.thumbnail});
  background-size: cover;
  background-position: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({ theme }) => theme.durations.normal}
    ${({ theme }) => theme.easings.easeInOut};

  &:hover {
    &::before {
      opacity: 0.3;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    transition: opacity ${({ theme }) => theme.durations.normal}
      ${({ theme }) => theme.easings.easeInOut};
  }
`;

const PlayButton = styled.button`
  position: relative;
  z-index: 1;
  width: 80px;
  height: 80px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  color: ${({ theme }) => theme.colors.primary[600]};
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({ theme }) => theme.durations.fast}
    ${({ theme }) => theme.easings.easeInOut};
  box-shadow: ${({ theme }) => theme.shadows.lg};

  &:hover {
    transform: scale(1.1);
    background: white;
  }

  &::before {
    content: '▶';
    margin-left: 4px;
  }
`;

const VideoList = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
  overflow-x: auto;
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
`;

const VideoThumbnailSmall = styled.div<{
  thumbnail: string;
  isActive: boolean;
}>`
  min-width: 160px;
  height: 90px;
  background-image: url(${props => props.thumbnail});
  background-size: cover;
  background-position: center;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  position: relative;
  transition: all ${({ theme }) => theme.durations.fast}
    ${({ theme }) => theme.easings.easeInOut};
  border: 2px solid
    ${({ theme, isActive }) =>
      isActive ? theme.colors.primary[500] : 'transparent'};

  &:hover {
    transform: scale(1.05);
    border-color: ${({ theme }) => theme.colors.primary[400]};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    border-radius: ${({ theme }) => theme.borderRadius.md};
  }

  &::after {
    content: '▶';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    z-index: 1;
  }
`;

const VideoTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-top: ${({ theme }) => theme.spacing[2]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
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

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videos,
  title = 'Videos & Trailers',
}) => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Filter and sort videos
  const trailers = videos.filter(
    video =>
      video.site === 'YouTube' &&
      (video.type === 'Trailer' || video.type === 'Teaser')
  );

  const clips = videos.filter(
    video =>
      video.site === 'YouTube' &&
      video.type !== 'Trailer' &&
      video.type !== 'Teaser'
  );

  const allVideos = [...trailers, ...clips];

  if (!allVideos.length) {
    return (
      <VideoSection>
        <SectionTitle>{title}</SectionTitle>
        <EmptyState>
          <EmptyStateIcon>🎥</EmptyStateIcon>
          <EmptyStateText>No videos available</EmptyStateText>
        </EmptyState>
      </VideoSection>
    );
  }

  const mainVideo = selectedVideo || allVideos[0];

  const getYouTubeThumbnail = (
    videoKey: string,
    quality: 'default' | 'hq' = 'hq'
  ) => {
    return `https://img.youtube.com/vi/${videoKey}/${quality}default.jpg`;
  };

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
    setIsPlaying(false);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <VideoSection>
      <SectionTitle>{title}</SectionTitle>
      <VideoContainer>
        <MainVideoContainer>
          {isPlaying ? (
            <VideoIframe
              src={`https://www.youtube.com/embed/${mainVideo.key}?autoplay=1&rel=0`}
              title={mainVideo.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <VideoThumbnail
              thumbnail={getYouTubeThumbnail(mainVideo.key)}
              onClick={handlePlay}
            >
              <PlayButton />
            </VideoThumbnail>
          )}
        </MainVideoContainer>

        <VideoTitle>{mainVideo.name}</VideoTitle>

        {allVideos.length > 1 && (
          <VideoList>
            {allVideos.map(video => (
              <div key={video.id}>
                <VideoThumbnailSmall
                  thumbnail={getYouTubeThumbnail(video.key, 'default')}
                  isActive={
                    selectedVideo?.id === video.id ||
                    (!selectedVideo && video.id === allVideos[0].id)
                  }
                  onClick={() => handleVideoSelect(video)}
                />
                <VideoTitle
                  style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}
                >
                  {video.name.length > 20
                    ? `${video.name.substring(0, 20)}...`
                    : video.name}
                </VideoTitle>
              </div>
            ))}
          </VideoList>
        )}
      </VideoContainer>
    </VideoSection>
  );
};

export default VideoPlayer;
