import { render, screen } from '@setupTest';

import { CategoryBadge } from '../index';
import { CATEGORY_BADGE_FIXTURES } from './fixtures';

const { categories } = CATEGORY_BADGE_FIXTURES;

describe('CategoryBadge', () => {
  describe('Rendering', () => {
    it('renders the category name as visible text', () => {
      render(<CategoryBadge category={categories.default} />);

      expect(screen.getByText(categories.default)).toBeInTheDocument();
    });
  });

  describe('Color variants', () => {
    it('applies blue color classes when no color prop is provided (default)', () => {
      render(<CategoryBadge category={categories.blue} />);

      expect(screen.getByText(categories.blue)).toHaveClass('text-blue-600', 'bg-blue-50');
    });

    it('applies blue color classes when color="blue" is explicitly specified', () => {
      render(<CategoryBadge category={categories.blue} color="blue" />);

      expect(screen.getByText(categories.blue)).toHaveClass('text-blue-600', 'bg-blue-50');
    });

    it('applies purple color classes when color="purple"', () => {
      render(<CategoryBadge category={categories.purple} color="purple" />);

      expect(screen.getByText(categories.purple)).toHaveClass('text-purple-600', 'bg-purple-50');
    });

    it('does NOT apply purple classes when using the default (blue) color', () => {
      render(<CategoryBadge category={categories.default} />);

      const badge = screen.getByText(categories.default);
      expect(badge).not.toHaveClass('text-purple-600');
      expect(badge).not.toHaveClass('bg-purple-50');
    });
  });
});
