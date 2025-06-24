import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* CSS Reset */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: ${({ theme }) => theme.fontWeights.normal};
    line-height: ${({ theme }) => theme.lineHeights.normal};
    color: ${({ theme }) => theme.colors.text.primary};
    background-color: ${({ theme }) => theme.colors.background.primary};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    min-height: 100vh;
  }

  /* Remove default list styles */
  ul,
  ol {
    list-style: none;
  }

  /* Remove default link styles */
  a {
    text-decoration: none;
    color: inherit;
    transition: color ${({ theme }) => theme.durations.fast} ${({ theme }) => theme.easings.easeInOut};

    &:hover {
      color: ${({ theme }) => theme.colors.text.linkHover};
    }

    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors.border.focus};
      outline-offset: 2px;
    }
  }

  /* Remove default button styles */
  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
    font-size: inherit;
    transition: all ${({ theme }) => theme.durations.fast} ${({ theme }) => theme.easings.easeInOut};

    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors.border.focus};
      outline-offset: 2px;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  /* Make images responsive */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Input and form styles */
  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    border: 1px solid ${({ theme }) => theme.colors.border.light};
    padding: ${({ theme }) => theme.spacing[3]};
    transition: border-color ${({ theme }) => theme.durations.fast} ${({ theme }) => theme.easings.easeInOut};

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.border.focus};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary[100]};
    }

    &:disabled {
      background-color: ${({ theme }) => theme.colors.background.tertiary};
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    line-height: ${({ theme }) => theme.lineHeights.tight};
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: ${({ theme }) => theme.spacing[2]};
  }

  h1 {
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
    ${({ theme }) => theme.mediaQueries.mobile} {
      font-size: ${({ theme }) => theme.fontSizes['3xl']};
    }
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
    ${({ theme }) => theme.mediaQueries.mobile} {
      font-size: ${({ theme }) => theme.fontSizes['2xl']};
    }
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    ${({ theme }) => theme.mediaQueries.mobile} {
      font-size: ${({ theme }) => theme.fontSizes.xl};
    }
  }

  h4 {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    ${({ theme }) => theme.mediaQueries.mobile} {
      font-size: ${({ theme }) => theme.fontSizes.lg};
    }
  }

  h5 {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }

  h6 {
    font-size: ${({ theme }) => theme.fontSizes.base};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing[4]};
    color: ${({ theme }) => theme.colors.text.secondary};
    line-height: ${({ theme }) => theme.lineHeights.relaxed};

    &:last-child {
      margin-bottom: 0;
    }
  }

  /* Utility classes */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .container {
    max-width: ${({ theme }) => theme.layout.containerMaxWidth};
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing[4]};

    ${({ theme }) => theme.mediaQueries.mobile} {
      padding: 0 ${({ theme }) => theme.spacing[2]};
    }
  }

  .text-center {
    text-align: center;
  }

  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
  }

  /* Flexbox utilities */
  .flex {
    display: flex;
  }

  .flex-col {
    flex-direction: column;
  }

  .flex-wrap {
    flex-wrap: wrap;
  }

  .items-center {
    align-items: center;
  }

  .items-start {
    align-items: flex-start;
  }

  .items-end {
    align-items: flex-end;
  }

  .justify-center {
    justify-content: center;
  }

  .justify-between {
    justify-content: space-between;
  }

  .justify-around {
    justify-content: space-around;
  }

  .justify-evenly {
    justify-content: space-evenly;
  }

  /* Grid utilities */
  .grid {
    display: grid;
  }

  .grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .grid-cols-5 {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  .grid-cols-6 {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }

  .gap-1 { gap: ${({ theme }) => theme.spacing[1]}; }
  .gap-2 { gap: ${({ theme }) => theme.spacing[2]}; }
  .gap-3 { gap: ${({ theme }) => theme.spacing[3]}; }
  .gap-4 { gap: ${({ theme }) => theme.spacing[4]}; }
  .gap-5 { gap: ${({ theme }) => theme.spacing[5]}; }
  .gap-6 { gap: ${({ theme }) => theme.spacing[6]}; }

  /* Spacing utilities */
  .m-0 { margin: 0; }
  .m-1 { margin: ${({ theme }) => theme.spacing[1]}; }
  .m-2 { margin: ${({ theme }) => theme.spacing[2]}; }
  .m-3 { margin: ${({ theme }) => theme.spacing[3]}; }
  .m-4 { margin: ${({ theme }) => theme.spacing[4]}; }
  .m-5 { margin: ${({ theme }) => theme.spacing[5]}; }
  .m-6 { margin: ${({ theme }) => theme.spacing[6]}; }

  .mt-0 { margin-top: 0; }
  .mt-1 { margin-top: ${({ theme }) => theme.spacing[1]}; }
  .mt-2 { margin-top: ${({ theme }) => theme.spacing[2]}; }
  .mt-3 { margin-top: ${({ theme }) => theme.spacing[3]}; }
  .mt-4 { margin-top: ${({ theme }) => theme.spacing[4]}; }
  .mt-5 { margin-top: ${({ theme }) => theme.spacing[5]}; }
  .mt-6 { margin-top: ${({ theme }) => theme.spacing[6]}; }

  .mb-0 { margin-bottom: 0; }
  .mb-1 { margin-bottom: ${({ theme }) => theme.spacing[1]}; }
  .mb-2 { margin-bottom: ${({ theme }) => theme.spacing[2]}; }
  .mb-3 { margin-bottom: ${({ theme }) => theme.spacing[3]}; }
  .mb-4 { margin-bottom: ${({ theme }) => theme.spacing[4]}; }
  .mb-5 { margin-bottom: ${({ theme }) => theme.spacing[5]}; }
  .mb-6 { margin-bottom: ${({ theme }) => theme.spacing[6]}; }

  .p-0 { padding: 0; }
  .p-1 { padding: ${({ theme }) => theme.spacing[1]}; }
  .p-2 { padding: ${({ theme }) => theme.spacing[2]}; }
  .p-3 { padding: ${({ theme }) => theme.spacing[3]}; }
  .p-4 { padding: ${({ theme }) => theme.spacing[4]}; }
  .p-5 { padding: ${({ theme }) => theme.spacing[5]}; }
  .p-6 { padding: ${({ theme }) => theme.spacing[6]}; }

  /* Loading spinner animation */
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .loading-spinner {
    border: 4px solid ${({ theme }) => theme.colors.neutral[200]};
    border-top: 4px solid ${({ theme }) => theme.colors.primary[500]};
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 0 auto;
  }

  /* Fade animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .fade-in {
    animation: fadeIn 0.6s ease-out;
  }

  .fade-in-up {
    animation: fadeInUp 0.6s ease-out;
  }

  .slide-in-left {
    animation: slideInLeft 0.6s ease-out;
  }

  .slide-in-right {
    animation: slideInRight 0.6s ease-out;
  }

  /* Hide scrollbar but keep functionality */
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background.tertiary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.neutral[400]};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.neutral[500]};
  }

  /* Selection styles */
  ::selection {
    background-color: ${({ theme }) => theme.colors.primary[100]};
    color: ${({ theme }) => theme.colors.primary[900]};
  }

  ::-moz-selection {
    background-color: ${({ theme }) => theme.colors.primary[100]};
    color: ${({ theme }) => theme.colors.primary[900]};
  }

  /* Focus styles for accessibility */
  .focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.border.focus};
    outline-offset: 2px;
  }

  /* Responsive utilities */
  ${({ theme }) => theme.mediaQueries.mobile} {
    .hide-mobile {
      display: none !important;
    }
  }

  ${({ theme }) => theme.mediaQueries.tablet} {
    .hide-tablet {
      display: none !important;
    }
  }

  ${({ theme }) => theme.mediaQueries.desktop} {
    .hide-desktop {
      display: none !important;
    }
  }

  /* Print styles */
  @media print {
    * {
      background: transparent !important;
      color: black !important;
      box-shadow: none !important;
      text-shadow: none !important;
    }

    a,
    a:visited {
      text-decoration: underline;
    }

    a[href]:after {
      content: " (" attr(href) ")";
    }

    .no-print {
      display: none !important;
    }
  }
`;
