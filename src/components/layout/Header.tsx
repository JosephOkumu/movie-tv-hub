import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const HeaderContainer = styled.header`
  background: ${({ theme }) => theme.colors.background.primary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
`;

const HeaderContent = styled.div`
  max-width: ${({ theme }) => theme.layout.containerMaxWidth};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[4]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${({ theme }) => theme.layout.headerHeight};
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  gap: ${({ theme }) => theme.spacing[2]};
  transition: color ${({ theme }) => theme.durations.fast} ${({ theme }) => theme.easings.easeInOut};

  &:hover {
    color: ${({ theme }) => theme.colors.primary[600]};
  }
`;

const LogoIcon = styled.span`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[6]};

  ${({ theme }) => theme.mediaQueries.mobile} {
    display: none;
  }
`;

const NavLink = styled(Link)<{ active?: boolean }>`
  color: ${({ theme, active }) =>
    active ? theme.colors.primary[600] : theme.colors.text.secondary};
  text-decoration: none;
  font-weight: ${({ theme, active }) =>
    active ? theme.fontWeights.semibold : theme.fontWeights.medium};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.durations.fast} ${({ theme }) => theme.easings.easeInOut};

  &:hover {
    color: ${({ theme }) => theme.colors.primary[600]};
    background: ${({ theme }) => theme.colors.primary[50]};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  padding: ${({ theme }) => theme.spacing[2]};
  cursor: pointer;

  ${({ theme }) => theme.mediaQueries.mobile} {
    display: block;
  }
`;

const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.background.primary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: ${({ theme }) => theme.spacing[4]};
  z-index: ${({ theme }) => theme.zIndex.dropdown};

  ${({ theme }) => theme.mediaQueries.mobile} {
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  }
`;

const MobileNavLink = styled(Link)<{ active?: boolean }>`
  display: block;
  color: ${({ theme, active }) =>
    active ? theme.colors.primary[600] : theme.colors.text.secondary};
  text-decoration: none;
  font-weight: ${({ theme, active }) =>
    active ? theme.fontWeights.semibold : theme.fontWeights.medium};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.durations.fast} ${({ theme }) => theme.easings.easeInOut};
  margin-bottom: ${({ theme }) => theme.spacing[1]};

  &:hover {
    color: ${({ theme }) => theme.colors.primary[600]};
    background: ${({ theme }) => theme.colors.primary[50]};
  }
`;

const WatchlistBadge = styled.span`
  background: ${({ theme }) => theme.colors.accent[500]};
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  padding: ${({ theme }) => theme.spacing[0.5]} ${({ theme }) => theme.spacing[1.5]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  margin-left: ${({ theme }) => theme.spacing[1]};
  min-width: 20px;
  text-align: center;
`;

const Header: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Mock watchlist count - will be replaced with actual context data
  const watchlistCount = 0;

  const isActive = (path: string) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/search', label: 'Search' },
    { path: '/trending', label: 'Trending' },
    { path: '/watchlist', label: 'Watchlist', showBadge: true },
  ];

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/" onClick={closeMobileMenu}>
          <LogoIcon>🎬</LogoIcon>
          Movie/TV Hub
        </Logo>

        <Nav>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              active={isActive(item.path)}
            >
              {item.label}
              {item.showBadge && watchlistCount > 0 && (
                <WatchlistBadge>{watchlistCount}</WatchlistBadge>
              )}
            </NavLink>
          ))}
        </Nav>

        <MobileMenuButton onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>
      </HeaderContent>

      <MobileMenu isOpen={isMobileMenuOpen}>
        {navItems.map((item) => (
          <MobileNavLink
            key={item.path}
            to={item.path}
            active={isActive(item.path)}
            onClick={closeMobileMenu}
          >
            {item.label}
            {item.showBadge && watchlistCount > 0 && (
              <WatchlistBadge>{watchlistCount}</WatchlistBadge>
            )}
          </MobileNavLink>
        ))}
      </MobileMenu>
    </HeaderContainer>
  );
};

export default Header;
