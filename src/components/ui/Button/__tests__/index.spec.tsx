import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from '../index';
import { BUTTON_FIXTURES } from './fixtures';

const { labels } = BUTTON_FIXTURES;

describe('Button', () => {
  describe('Rendering', () => {
    it('renders children text correctly', () => {
      render(<Button>{labels.default}</Button>);

      expect(screen.getByRole('button', { name: labels.default })).toBeInTheDocument();
    });

    it('renders as a native <button> element with all standard HTML attributes forwarded', () => {
      render(
        <Button id="submit-btn" type="submit">
          {labels.default}
        </Button>
      );
      const button = screen.getByRole('button');

      expect(button).toHaveAttribute('id', 'submit-btn');
      expect(button).toHaveAttribute('type', 'submit');
    });
  });

  describe('Variants', () => {
    it('applies primary variant classes by default', () => {
      render(<Button>{labels.default}</Button>);

      expect(screen.getByRole('button')).toHaveClass('bg-blue-600', 'text-white');
    });

    it('applies success variant classes when variant="success"', () => {
      render(<Button variant="success">{labels.default}</Button>);

      expect(screen.getByRole('button')).toHaveClass('bg-green-600', 'text-white');
    });

    it('applies secondary variant classes when variant="secondary"', () => {
      render(<Button variant="secondary">{labels.default}</Button>);

      expect(screen.getByRole('button')).toHaveClass('border', 'border-gray-300', 'text-gray-700');
    });

    it('merges custom className alongside variant classes', () => {
      render(<Button className="w-full">{labels.customClass}</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('w-full');
      expect(button).toHaveClass('bg-blue-600');
    });
  });

  describe('Interactions', () => {
    it('calls onClick handler exactly once when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      render(<Button onClick={handleClick}>{labels.clickable}</Button>);
      await user.click(screen.getByRole('button'));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when the button is disabled', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      render(
        <Button variant="secondary" disabled onClick={handleClick}>
          {labels.disabled}
        </Button>
      );

      await user.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Disabled state', () => {
    it('is disabled when the disabled prop is set', () => {
      render(
        <Button variant="secondary" disabled>
          {labels.disabled}
        </Button>
      );

      expect(screen.getByRole('button')).toBeDisabled();
    });
  });
});
