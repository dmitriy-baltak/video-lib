import { describe, it, expect, vi } from 'vitest';
import { renderWithRedux, screen, waitFor } from '../../__tests__/test-utils';
import userEvent from '@testing-library/user-event';
import { CreateVideo } from './create-video';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
}));

vi.mock('@/lib/hooks', () => ({
  useAppDispatch: () => vi.fn(),
}));

describe('CreateVideo', () => {
  it('should render form fields correctly', () => {
    renderWithRedux(<CreateVideo />);
    
    expect(screen.getByText('Create New Video')).toBeInTheDocument();
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByText(/tags/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create video/i })).toBeInTheDocument();
  });

  it('should show validation error for empty title', async () => {
    const user = userEvent.setup();
    renderWithRedux(<CreateVideo />);
    
    const submitButton = screen.getByRole('button', { name: /create video/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/title is required/i)).toBeInTheDocument();
    });
  });

  it('should display success behavior with valid form data', async () => {
    const user = userEvent.setup();
    renderWithRedux(<CreateVideo />);

    const titleInput = screen.getByLabelText(/title/i);
    await user.type(titleInput, 'My Test Video');

    const tagInput = screen.getByPlaceholderText(/add a tag/i);
    await user.type(tagInput, 'tutorial{enter}');

    expect(screen.getByText('tutorial')).toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: /create video/i });
    expect(submitButton).toBeEnabled();
  });
});
