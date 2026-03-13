import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi } from 'vitest';
import ProfilePage from './profilePage';

vi.mock('@mui/icons-material/AccountBox', () => ({
    default: () => <span data-testid="mock-icon" />
}));

describe('ProfilePage', () => {
    it('should render the main page headers', () => {
        render(<ProfilePage />);

        expect(screen.getByRole('heading', { level: 1, name: /User Profile/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2, name: /Personal Information/i })).toBeInTheDocument();
        expect(screen.getByText(/Welcome to your profile page/i)).toBeInTheDocument();
    });

    it('should reflect the correct static user data', () => {
        render(<ProfilePage />);

        expect(screen.getAllByText(/Name: Tom Crush/i)[0]).toBeInTheDocument();
        expect(screen.getAllByText(/Email: test@example.com/i)[0]).toBeInTheDocument();
        expect(screen.getAllByText(/Phone: 123-456-7890/i)[0]).toBeInTheDocument();
    });
});