import React from 'react';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  margin: ${({ theme }) => theme.spacing[8]} 0;
  flex-wrap: wrap;
`;

const PaginationButton = styled.button<{ active?: boolean; disabled?: boolean }>`
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border: 1px solid ${({ theme, active }) =>
    active ? theme.colors.primary[500] : theme.colors.border.light};
  background: ${({ theme, active, disabled }) =>
    disabled
      ? theme.colors.neutral[100]
      : active
      ? theme.colors.primary[500]
      : theme.colors.background.primary};
  color: ${({ theme, active, disabled }) =>
    disabled
      ? theme.colors.neutral[400]
      : active
      ? 'white'
      : theme.colors.text.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all ${({ theme }) => theme.durations.fast} ${({ theme }) => theme.easings.easeInOut};
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    ${({ theme, active, disabled }) =>
      !disabled && !active &&
      `
        background: ${theme.colors.primary[50]};
        border-color: ${theme.colors.primary[300]};
      `}
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary[100]};
  }

  ${({ theme }) => theme.mediaQueries.mobile} {
    min-width: 36px;
    height: 36px;
    padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
  }
`;

const PaginationInfo = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin: 0 ${({ theme }) => theme.spacing[3]};
  white-space: nowrap;

  ${({ theme }) => theme.mediaQueries.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    margin: 0 ${({ theme }) => theme.spacing[2]};
  }
`;

const PaginationEllipsis = styled.span`
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[1]};
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;

  ${({ theme }) => theme.mediaQueries.mobile} {
    min-width: 36px;
    height: 36px;
  }
`;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showInfo?: boolean;
  maxVisiblePages?: number;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showInfo = true,
  maxVisiblePages = 7,
  className,
}) => {
  // Don't render pagination if there's only one page or no pages
  if (totalPages <= 1) {
    return null;
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const getVisiblePages = () => {
    const pages: (number | 'ellipsis')[] = [];

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      const startPage = Math.max(2, currentPage - Math.floor((maxVisiblePages - 3) / 2));
      const endPage = Math.min(totalPages - 1, currentPage + Math.floor((maxVisiblePages - 3) / 2));

      // Add ellipsis if there's a gap between 1 and start
      if (startPage > 2) {
        pages.push('ellipsis');
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis if there's a gap between end and last page
      if (endPage < totalPages - 1) {
        pages.push('ellipsis');
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <PaginationContainer className={className}>
      {/* Previous button */}
      <PaginationButton
        disabled={!hasPrevious}
        onClick={() => handlePageChange(currentPage - 1)}
        title="Previous page"
      >
        ‹
      </PaginationButton>

      {/* Page numbers */}
      {visiblePages.map((page, index) => (
        page === 'ellipsis' ? (
          <PaginationEllipsis key={`ellipsis-${index}`}>
            ...
          </PaginationEllipsis>
        ) : (
          <PaginationButton
            key={page}
            active={page === currentPage}
            onClick={() => handlePageChange(page)}
            title={`Go to page ${page}`}
          >
            {page}
          </PaginationButton>
        )
      ))}

      {/* Next button */}
      <PaginationButton
        disabled={!hasNext}
        onClick={() => handlePageChange(currentPage + 1)}
        title="Next page"
      >
        ›
      </PaginationButton>

      {/* Page info */}
      {showInfo && (
        <PaginationInfo>
          Page {currentPage} of {totalPages}
        </PaginationInfo>
      )}
    </PaginationContainer>
  );
};

export default Pagination;
