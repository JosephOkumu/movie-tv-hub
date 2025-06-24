import React, { useState } from 'react';
import styled from 'styled-components';
import { WatchlistItem } from '../../types';

const ExportContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ExportButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.colors.primary[500]};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.durations.fast}
    ${({ theme }) => theme.easings.easeInOut};

  &:hover {
    background: ${({ theme }) => theme.colors.primary[600]};
    transform: translateY(-1px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary[200]};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.neutral[400]};
    cursor: not-allowed;
    transform: none;
  }
`;

const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: ${({ theme }) => theme.spacing[1]};
  background: ${({ theme }) => theme.colors.background.card};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  z-index: 1000;
  min-width: 200px;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transform: translateY(${({ isOpen }) => (isOpen ? '0' : '-10px')});
  transition: all ${({ theme }) => theme.durations.fast}
    ${({ theme }) => theme.easings.easeInOut};
`;

const DropdownItem = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  text-align: left;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.durations.fast}
    ${({ theme }) => theme.easings.easeInOut};

  &:hover {
    background: ${({ theme }) => theme.colors.neutral[50]};
  }

  &:focus {
    outline: none;
    background: ${({ theme }) => theme.colors.primary[50]};
  }

  &:first-child {
    border-top-left-radius: ${({ theme }) => theme.borderRadius.md};
    border-top-right-radius: ${({ theme }) => theme.borderRadius.md};
  }

  &:last-child {
    border-bottom-left-radius: ${({ theme }) => theme.borderRadius.md};
    border-bottom-right-radius: ${({ theme }) => theme.borderRadius.md};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  }
`;

const ExportIcon = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

interface WatchlistExportProps {
  watchlist: WatchlistItem[];
  filteredItems?: WatchlistItem[];
  className?: string;
}

const WatchlistExport: React.FC<WatchlistExportProps> = ({
  watchlist,
  filteredItems,
  className,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const itemsToExport = filteredItems || watchlist;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const exportToCSV = async () => {
    setIsExporting(true);

    try {
      const csvHeaders = [
        'Title',
        'Type',
        'Release Date',
        'TMDB Rating',
        'Your Rating',
        'Watched',
        'Added Date',
        'Notes',
      ];

      const csvRows = itemsToExport.map(item => [
        `"${item.title.replace(/"/g, '""')}"`,
        item.media_type === 'movie' ? 'Movie' : 'TV Show',
        item.release_date || '',
        item.vote_average.toString(),
        item.user_rating?.toString() || '',
        item.watched ? 'Yes' : 'No',
        formatDate(item.added_date),
        item.notes ? `"${item.notes.replace(/"/g, '""')}"` : '',
      ]);

      const csvContent = [
        csvHeaders.join(','),
        ...csvRows.map(row => row.join(',')),
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);

      link.setAttribute('href', url);
      link.setAttribute(
        'download',
        `watchlist-${new Date().toISOString().split('T')[0]}.csv`
      );
      link.style.visibility = 'hidden';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting to CSV:', error);
      alert('Failed to export watchlist. Please try again.');
    } finally {
      setIsExporting(false);
      setIsDropdownOpen(false);
    }
  };

  const exportToJSON = async () => {
    setIsExporting(true);

    try {
      const exportData = {
        exported_at: new Date().toISOString(),
        total_items: itemsToExport.length,
        watchlist: itemsToExport.map(item => ({
          id: item.id,
          title: item.title,
          media_type: item.media_type,
          release_date: item.release_date,
          poster_path: item.poster_path,
          vote_average: item.vote_average,
          user_rating: item.user_rating,
          watched: item.watched,
          added_date: item.added_date,
          notes: item.notes,
        })),
      };

      const jsonContent = JSON.stringify(exportData, null, 2);
      const blob = new Blob([jsonContent], {
        type: 'application/json;charset=utf-8;',
      });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);

      link.setAttribute('href', url);
      link.setAttribute(
        'download',
        `watchlist-${new Date().toISOString().split('T')[0]}.json`
      );
      link.style.visibility = 'hidden';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting to JSON:', error);
      alert('Failed to export watchlist. Please try again.');
    } finally {
      setIsExporting(false);
      setIsDropdownOpen(false);
    }
  };

  const exportToPrintable = async () => {
    setIsExporting(true);

    try {
      const watchedItems = itemsToExport.filter(item => item.watched);
      const unwatchedItems = itemsToExport.filter(item => !item.watched);

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>My Watchlist</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 40px;
              line-height: 1.6;
              color: #333;
            }
            h1 {
              color: #2563eb;
              border-bottom: 2px solid #2563eb;
              padding-bottom: 10px;
            }
            h2 {
              color: #4b5563;
              margin-top: 30px;
            }
            .stats {
              background: #f8fafc;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
            }
            .item {
              margin: 15px 0;
              padding: 15px;
              border: 1px solid #e5e7eb;
              border-radius: 6px;
            }
            .item-title {
              font-weight: bold;
              font-size: 1.1em;
              color: #1f2937;
            }
            .item-meta {
              color: #6b7280;
              font-size: 0.9em;
              margin: 5px 0;
            }
            .rating {
              color: #f59e0b;
            }
            .notes {
              font-style: italic;
              color: #4b5563;
              margin-top: 10px;
            }
            @media print {
              body { margin: 20px; }
              .item { break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <h1>My Movie & TV Watchlist</h1>
          <div class="stats">
            <p><strong>Export Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Total Items:</strong> ${itemsToExport.length}</p>
            <p><strong>Watched:</strong> ${watchedItems.length}</p>
            <p><strong>To Watch:</strong> ${unwatchedItems.length}</p>
          </div>

          ${
            unwatchedItems.length > 0
              ? `
            <h2>📋 To Watch (${unwatchedItems.length})</h2>
            ${unwatchedItems
              .map(
                item => `
              <div class="item">
                <div class="item-title">${item.title}</div>
                <div class="item-meta">
                  ${item.media_type === 'movie' ? 'Movie' : 'TV Show'} •
                  ${item.release_date ? new Date(item.release_date).getFullYear() : 'N/A'} •
                  <span class="rating">⭐ ${item.vote_average.toFixed(1)}</span>
                  ${item.user_rating ? ` • Your Rating: ${item.user_rating}/5` : ''}
                </div>
                ${item.notes ? `<div class="notes">"${item.notes}"</div>` : ''}
              </div>
            `
              )
              .join('')}
          `
              : ''
          }

          ${
            watchedItems.length > 0
              ? `
            <h2>✅ Watched (${watchedItems.length})</h2>
            ${watchedItems
              .map(
                item => `
              <div class="item">
                <div class="item-title">${item.title}</div>
                <div class="item-meta">
                  ${item.media_type === 'movie' ? 'Movie' : 'TV Show'} •
                  ${item.release_date ? new Date(item.release_date).getFullYear() : 'N/A'} •
                  <span class="rating">⭐ ${item.vote_average.toFixed(1)}</span>
                  ${item.user_rating ? ` • Your Rating: ${item.user_rating}/5` : ''}
                </div>
                ${item.notes ? `<div class="notes">"${item.notes}"</div>` : ''}
              </div>
            `
              )
              .join('')}
          `
              : ''
          }
        </body>
        </html>
      `;

      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
      } else {
        alert('Please allow pop-ups to export a printable version.');
      }
    } catch (error) {
      console.error('Error creating printable version:', error);
      alert('Failed to create printable version. Please try again.');
    } finally {
      setIsExporting(false);
      setIsDropdownOpen(false);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Element;
    if (!target.closest('[data-export-container]')) {
      setIsDropdownOpen(false);
    }
  };

  React.useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isDropdownOpen]);

  if (itemsToExport.length === 0) {
    return null;
  }

  return (
    <ExportContainer className={className} data-export-container>
      <ExportButton
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        disabled={isExporting}
      >
        {isExporting ? <LoadingSpinner /> : <ExportIcon>📤</ExportIcon>}
        Export Watchlist
      </ExportButton>

      <DropdownMenu isOpen={isDropdownOpen && !isExporting}>
        <DropdownItem onClick={exportToCSV}>📊 Export as CSV</DropdownItem>
        <DropdownItem onClick={exportToJSON}>📄 Export as JSON</DropdownItem>
        <DropdownItem onClick={exportToPrintable}>🖨️ Print/PDF</DropdownItem>
      </DropdownMenu>
    </ExportContainer>
  );
};

export default WatchlistExport;
