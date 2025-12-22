import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router';

import Header from './Header';
import { RoutesEnum } from 'config/routes';
import s from './Header.module.scss';

// Mock the SVG imports
vi.mock('assets/icons/burger.svg?react', () => ({
  default: () => <svg data-testid="burger-icon" />,
}));

vi.mock('assets/icons/search.svg?react', () => ({
  default: () => <svg data-testid="search-icon" />,
}));

vi.mock('assets/icons/heart.svg?react', () => ({
  default: () => <svg data-testid="heart-icon" />,
}));

vi.mock('assets/icons/bag.svg?react', () => ({
  default: () => <svg data-testid="bag-icon" />,
}));

vi.mock('assets/icons/user.svg?react', () => ({
  default: () => <svg data-testid="user-icon" />,
}));

// Mock the logo
vi.mock('assets/logo.png', () => ({
  default: 'mocked-logo.png',
}));

// Mock the store hook
const mockNavigate = vi.fn();
const mockUseRootStore = vi.fn();

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('stores/global/hooks', () => ({
  useRootStore: () => mockUseRootStore(),
}));

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseRootStore.mockReturnValue({
      isAuthenticated: false,
      setIsAuthenticated: vi.fn(),
    });
  });

  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  describe('Rendering', () => {
    it('renders header element', () => {
      renderWithRouter(<Header />);
      const header = document.querySelector('header');
      expect(header).toBeInTheDocument();
    });

    it('renders logo', () => {
      renderWithRouter(<Header />);
      const logo = screen.getByAltText('HFurniture');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', 'mocked-logo.png');
    });

    it('renders search input', () => {
      renderWithRouter(<Header />);
      const searchInput = screen.getByPlaceholderText('Search anything');
      expect(searchInput).toBeInTheDocument();
    });

    it('renders all icon buttons when not authenticated', () => {
      renderWithRouter(<Header />);
      expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
      expect(screen.getByLabelText('Favorites')).toBeInTheDocument();
      expect(screen.getByLabelText('Shopping cart')).toBeInTheDocument();
      expect(screen.queryByLabelText('User profile')).not.toBeInTheDocument();
    });

    it('renders user profile button when authenticated', () => {
      mockUseRootStore.mockReturnValue({
        isAuthenticated: true,
        setIsAuthenticated: vi.fn(),
      });

      renderWithRouter(<Header />);
      expect(screen.getByLabelText('User profile')).toBeInTheDocument();
    });

    it('renders all icons', () => {
      renderWithRouter(<Header />);
      expect(screen.getByTestId('burger-icon')).toBeInTheDocument();
      expect(screen.getByTestId('search-icon')).toBeInTheDocument();
      expect(screen.getByTestId('heart-icon')).toBeInTheDocument();
      expect(screen.getByTestId('bag-icon')).toBeInTheDocument();
    });
  });

  describe('Logo Click', () => {
    it('navigates to home when logo is clicked', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Header />);

      const logo = screen.getByAltText('HFurniture');
      await user.click(logo);

      expect(mockNavigate).toHaveBeenCalledWith(RoutesEnum.HOME);
    });

    it('navigates to home multiple times', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Header />);

      const logo = screen.getByAltText('HFurniture');
      await user.click(logo);
      await user.click(logo);

      expect(mockNavigate).toHaveBeenCalledTimes(2);
      expect(mockNavigate).toHaveBeenCalledWith(RoutesEnum.HOME);
    });
  });

  describe('Burger Menu Button', () => {
    it('calls onMenuClick when burger button is clicked', async () => {
      const user = userEvent.setup();
      const handleMenuClick = vi.fn();
      renderWithRouter(<Header onMenuClick={handleMenuClick} />);

      const burgerButton = screen.getByLabelText('Open menu');
      await user.click(burgerButton);

      expect(handleMenuClick).toHaveBeenCalledTimes(1);
    });

    it('toggles authentication state when burger button is clicked', async () => {
      const user = userEvent.setup();
      const setIsAuthenticated = vi.fn();
      mockUseRootStore.mockReturnValue({
        isAuthenticated: false,
        setIsAuthenticated,
      });

      renderWithRouter(<Header />);

      const burgerButton = screen.getByLabelText('Open menu');
      await user.click(burgerButton);

      expect(setIsAuthenticated).toHaveBeenCalledWith(true);
    });

    it('toggles authentication from true to false', async () => {
      const user = userEvent.setup();
      const setIsAuthenticated = vi.fn();
      mockUseRootStore.mockReturnValue({
        isAuthenticated: true,
        setIsAuthenticated,
      });

      renderWithRouter(<Header />);

      const burgerButton = screen.getByLabelText('Open menu');
      await user.click(burgerButton);

      expect(setIsAuthenticated).toHaveBeenCalledWith(false);
    });

    it('does not call onMenuClick when not provided', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Header />);

      const burgerButton = screen.getByLabelText('Open menu');
      await user.click(burgerButton);

      // Should not throw error
      expect(burgerButton).toBeInTheDocument();
    });
  });

  describe('Search Functionality', () => {
    it('updates search value when typing', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Header />);

      const searchInput = screen.getByPlaceholderText('Search anything') as HTMLInputElement;
      await user.type(searchInput, 'chair');

      expect(searchInput.value).toBe('chair');
    });

    it('calls onSearchChange when typing', async () => {
      const user = userEvent.setup();
      const handleSearchChange = vi.fn();
      renderWithRouter(<Header onSearchChange={handleSearchChange} />);

      const searchInput = screen.getByPlaceholderText('Search anything');
      await user.type(searchInput, 'sofa');

      expect(handleSearchChange).toHaveBeenCalled();
      expect(handleSearchChange).toHaveBeenLastCalledWith('sofa');
    });

    it('calls onSearchChange for each character typed', async () => {
      const user = userEvent.setup();
      const handleSearchChange = vi.fn();
      renderWithRouter(<Header onSearchChange={handleSearchChange} />);

      const searchInput = screen.getByPlaceholderText('Search anything');
      await user.type(searchInput, 'abc');

      expect(handleSearchChange).toHaveBeenCalledTimes(3);
      expect(handleSearchChange).toHaveBeenNthCalledWith(1, 'a');
      expect(handleSearchChange).toHaveBeenNthCalledWith(2, 'ab');
      expect(handleSearchChange).toHaveBeenNthCalledWith(3, 'abc');
    });

    it('does not call onSearchChange when not provided', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Header />);

      const searchInput = screen.getByPlaceholderText('Search anything');
      await user.type(searchInput, 'test');

      // Should not throw error
      expect(searchInput).toHaveValue('test');
    });

    it('clears search value', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Header />);

      const searchInput = screen.getByPlaceholderText('Search anything');
      await user.type(searchInput, 'test');
      expect(searchInput).toHaveValue('test');

      await user.clear(searchInput);
      expect(searchInput).toHaveValue('');
    });
  });

  describe('Favorites Button', () => {
    it('navigates to favorites when clicked', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Header />);

      const favoritesButton = screen.getByLabelText('Favorites');
      await user.click(favoritesButton);

      expect(mockNavigate).toHaveBeenCalledWith(RoutesEnum.FAVOURITES);
    });

    it('navigates to favorites multiple times', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Header />);

      const favoritesButton = screen.getByLabelText('Favorites');
      await user.click(favoritesButton);
      await user.click(favoritesButton);

      expect(mockNavigate).toHaveBeenCalledTimes(2);
      expect(mockNavigate).toHaveBeenCalledWith(RoutesEnum.FAVOURITES);
    });
  });

  describe('Cart Button', () => {
    it('calls onCartClick when cart button is clicked', async () => {
      const user = userEvent.setup();
      const handleCartClick = vi.fn();
      renderWithRouter(<Header onCartClick={handleCartClick} />);

      const cartButton = screen.getByLabelText('Shopping cart');
      await user.click(cartButton);

      expect(handleCartClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onCartClick when not provided', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Header />);

      const cartButton = screen.getByLabelText('Shopping cart');
      await user.click(cartButton);

      // Should not throw error
      expect(cartButton).toBeInTheDocument();
    });
  });

  describe('Profile Button', () => {
    it('does not render when not authenticated', () => {
      mockUseRootStore.mockReturnValue({
        isAuthenticated: false,
        setIsAuthenticated: vi.fn(),
      });

      renderWithRouter(<Header />);
      expect(screen.queryByLabelText('User profile')).not.toBeInTheDocument();
    });

    it('renders when authenticated', () => {
      mockUseRootStore.mockReturnValue({
        isAuthenticated: true,
        setIsAuthenticated: vi.fn(),
      });

      renderWithRouter(<Header />);
      expect(screen.getByLabelText('User profile')).toBeInTheDocument();
    });

    it('calls onProfileClick when profile button is clicked', async () => {
      const user = userEvent.setup();
      const handleProfileClick = vi.fn();
      mockUseRootStore.mockReturnValue({
        isAuthenticated: true,
        setIsAuthenticated: vi.fn(),
      });

      renderWithRouter(<Header onProfileClick={handleProfileClick} />);

      const profileButton = screen.getByLabelText('User profile');
      await user.click(profileButton);

      expect(handleProfileClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onProfileClick when not provided', async () => {
      const user = userEvent.setup();
      mockUseRootStore.mockReturnValue({
        isAuthenticated: true,
        setIsAuthenticated: vi.fn(),
      });

      renderWithRouter(<Header />);

      const profileButton = screen.getByLabelText('User profile');
      await user.click(profileButton);

      // Should not throw error
      expect(profileButton).toBeInTheDocument();
    });
  });

  describe('Props - ClassName', () => {
    it('renders with custom className', () => {
      renderWithRouter(<Header className="custom-header" />);
      const header = document.querySelector('header');
      expect(header).toHaveClass('custom-header');
    });

    it('combines custom className with default class', () => {
      renderWithRouter(<Header className="custom-header" />);
      const header = document.querySelector('header');
      expect(header).toHaveClass('custom-header');
      expect(header).toHaveClass(s.header);
    });
  });

  describe('CSS Classes and Structure', () => {
    it('header has correct class', () => {
      const { container } = renderWithRouter(<Header />);
      const header = container.querySelector(`.${s.header}`);
      expect(header).toBeInTheDocument();
    });

    it('has container with correct class', () => {
      const { container } = renderWithRouter(<Header />);
      const headerContainer = container.querySelector(`.${s.container}`);
      expect(headerContainer).toBeInTheDocument();
    });

    it('has left section with correct elements', () => {
      const { container } = renderWithRouter(<Header />);
      const leftSection = container.querySelector(`.${s.leftSection}`);
      expect(leftSection).toBeInTheDocument();

      const burgerButton = leftSection?.querySelector('button');
      expect(burgerButton).toBeInTheDocument();

      const logo = leftSection?.querySelector('img');
      expect(logo).toBeInTheDocument();
    });

    it('has right section with search and actions', () => {
      const { container } = renderWithRouter(<Header />);
      const rightSection = container.querySelector(`.${s.rightSection}`);
      expect(rightSection).toBeInTheDocument();

      const searchContainer = rightSection?.querySelector(`.${s.searchContainer}`);
      expect(searchContainer).toBeInTheDocument();

      const actions = rightSection?.querySelector(`.${s.actions}`);
      expect(actions).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('all icon buttons have aria-labels', () => {
      renderWithRouter(<Header />);
      expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
      expect(screen.getByLabelText('Favorites')).toBeInTheDocument();
      expect(screen.getByLabelText('Shopping cart')).toBeInTheDocument();
    });

    it('all icon buttons are of type button', () => {
      renderWithRouter(<Header />);
      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).toHaveAttribute('type', 'button');
      });
    });

    it('search input has correct type', () => {
      renderWithRouter(<Header />);
      const searchInput = screen.getByPlaceholderText('Search anything');
      expect(searchInput).toHaveAttribute('type', 'text');
    });

    it('logo has alt text', () => {
      renderWithRouter(<Header />);
      const logo = screen.getByAltText('HFurniture');
      expect(logo).toBeInTheDocument();
    });

    it('buttons are keyboard accessible', async () => {
      const user = userEvent.setup();
      const handleCartClick = vi.fn();
      renderWithRouter(<Header onCartClick={handleCartClick} />);

      const cartButton = screen.getByLabelText('Shopping cart');
      cartButton.focus();
      await user.keyboard('{Enter}');

      expect(handleCartClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Integration Tests', () => {
    it('complete user flow: search, navigate to favorites, open cart', async () => {
      const user = userEvent.setup();
      const handleSearchChange = vi.fn();
      const handleCartClick = vi.fn();

      renderWithRouter(
        <Header onSearchChange={handleSearchChange} onCartClick={handleCartClick} />,
      );

      // Search for something
      const searchInput = screen.getByPlaceholderText('Search anything');
      await user.type(searchInput, 'table');
      expect(handleSearchChange).toHaveBeenCalled();
      expect(searchInput).toHaveValue('table');

      // Navigate to favorites
      const favoritesButton = screen.getByLabelText('Favorites');
      await user.click(favoritesButton);
      expect(mockNavigate).toHaveBeenCalledWith(RoutesEnum.FAVOURITES);

      // Open cart
      const cartButton = screen.getByLabelText('Shopping cart');
      await user.click(cartButton);
      expect(handleCartClick).toHaveBeenCalledTimes(1);
    });

    it('authentication state affects profile button visibility', () => {
      // Test not authenticated state
      mockUseRootStore.mockReturnValue({
        isAuthenticated: false,
        setIsAuthenticated: vi.fn(),
      });

      const { unmount } = renderWithRouter(<Header />);
      expect(screen.queryByLabelText('User profile')).not.toBeInTheDocument();
      unmount();

      // Test authenticated state in a new render
      mockUseRootStore.mockReturnValue({
        isAuthenticated: true,
        setIsAuthenticated: vi.fn(),
      });

      renderWithRouter(<Header />);
      expect(screen.getByLabelText('User profile')).toBeInTheDocument();
    });

    it('burger button toggles authentication and calls callback', async () => {
      const user = userEvent.setup();
      const handleMenuClick = vi.fn();
      const setIsAuthenticated = vi.fn();

      mockUseRootStore.mockReturnValue({
        isAuthenticated: false,
        setIsAuthenticated,
      });

      renderWithRouter(<Header onMenuClick={handleMenuClick} />);

      const burgerButton = screen.getByLabelText('Open menu');
      await user.click(burgerButton);

      expect(setIsAuthenticated).toHaveBeenCalledWith(true);
      expect(handleMenuClick).toHaveBeenCalledTimes(1);
    });

    it('all callbacks work together', async () => {
      const user = userEvent.setup();
      const callbacks = {
        onMenuClick: vi.fn(),
        onSearchChange: vi.fn(),
        onCartClick: vi.fn(),
        onProfileClick: vi.fn(),
      };

      mockUseRootStore.mockReturnValue({
        isAuthenticated: true,
        setIsAuthenticated: vi.fn(),
      });

      renderWithRouter(<Header {...callbacks} />);

      // Click menu
      await user.click(screen.getByLabelText('Open menu'));
      expect(callbacks.onMenuClick).toHaveBeenCalledTimes(1);

      // Search
      await user.type(screen.getByPlaceholderText('Search anything'), 'a');
      expect(callbacks.onSearchChange).toHaveBeenCalled();

      // Click cart
      await user.click(screen.getByLabelText('Shopping cart'));
      expect(callbacks.onCartClick).toHaveBeenCalledTimes(1);

      // Click profile
      await user.click(screen.getByLabelText('User profile'));
      expect(callbacks.onProfileClick).toHaveBeenCalledTimes(1);
    });

    it('logo and favorites navigation work independently', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Header />);

      // Click logo
      const logo = screen.getByAltText('HFurniture');
      await user.click(logo);
      expect(mockNavigate).toHaveBeenCalledWith(RoutesEnum.HOME);

      mockNavigate.mockClear();

      // Click favorites
      const favoritesButton = screen.getByLabelText('Favorites');
      await user.click(favoritesButton);
      expect(mockNavigate).toHaveBeenCalledWith(RoutesEnum.FAVOURITES);
    });
  });

  describe('Edge Cases', () => {
    it('handles rapid clicking of buttons', async () => {
      const user = userEvent.setup();
      const handleCartClick = vi.fn();
      renderWithRouter(<Header onCartClick={handleCartClick} />);

      const cartButton = screen.getByLabelText('Shopping cart');
      await user.tripleClick(cartButton);

      expect(handleCartClick).toHaveBeenCalledTimes(3);
    });

    it('handles search with special characters', async () => {
      const user = userEvent.setup();
      const handleSearchChange = vi.fn();
      renderWithRouter(<Header onSearchChange={handleSearchChange} />);

      const searchInput = screen.getByPlaceholderText('Search anything');
      await user.type(searchInput, '!@#$%');

      expect(searchInput).toHaveValue('!@#$%');
      expect(handleSearchChange).toHaveBeenCalled();
    });

    it('handles empty search', async () => {
      const user = userEvent.setup();
      const handleSearchChange = vi.fn();
      renderWithRouter(<Header onSearchChange={handleSearchChange} />);

      const searchInput = screen.getByPlaceholderText('Search anything');
      await user.type(searchInput, 'test');
      await user.clear(searchInput);

      expect(searchInput).toHaveValue('');
      expect(handleSearchChange).toHaveBeenLastCalledWith('');
    });
  });
});
