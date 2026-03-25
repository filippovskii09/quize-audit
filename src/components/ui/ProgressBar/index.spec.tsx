import { render, screen } from '@setupTest';
import { ProgressBar } from './index';

describe('ProgressBar component', () => {
  it('calculates the progress correctly', () => {
    render(<ProgressBar current={5} total={10} />);

    const progressBar = screen.getByRole('progressbar');

    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
  });

  it('handles 0 total safely without throwing or going above 0', () => {
    render(<ProgressBar current={0} total={0} />);

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '0');
  });

  it('handles full progress correctly', () => {
    render(<ProgressBar current={10} total={10} />);

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '100');
  });
});
