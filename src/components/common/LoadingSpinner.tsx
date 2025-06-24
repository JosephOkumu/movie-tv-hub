import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div<{ size?: 'small' | 'medium' | 'large' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[4]};
`;

const Spinner = styled.div<{ size?: 'small' | 'medium' | 'large' }>`
  border: 4px solid ${({ theme }) => theme.colors.neutral[200]};
  border-top: 4px solid ${({ theme }) => theme.colors.primary[500]};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;

  ${({ size = 'medium' }) => {
    switch (size) {
      case 'small':
        return `
          width: 20px;
          height: 20px;
          border-width: 2px;
        `;
      case 'large':
        return `
          width: 60px;
          height: 60px;
          border-width: 6px;
        `;
      default:
        return `
          width: 40px;
          height: 40px;
          border-width: 4px;
        `;
    }
  }}
`;

const LoadingText = styled.p<{ size?: 'small' | 'medium' | 'large' }>`
  margin-top: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme, size = 'medium' }) =>
    size === 'small'
      ? theme.fontSizes.sm
      : size === 'large'
      ? theme.fontSizes.lg
      : theme.fontSizes.base};
  text-align: center;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  showText?: boolean;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  text = 'Loading...',
  showText = true,
  className,
}) => {
  return (
    <SpinnerContainer size={size} className={className}>
      <LoadingContainer>
        <Spinner size={size} />
        {showText && <LoadingText size={size}>{text}</LoadingText>}
      </LoadingContainer>
    </SpinnerContainer>
  );
};

export default LoadingSpinner;
