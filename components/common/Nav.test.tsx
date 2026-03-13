import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, afterEach } from 'vitest';
import Nav from './Nav';

vi.mock('next/link', () => ({
    default: ({ children, href, className }: any) => (
        <a href={href} className={className}>{children}</a>
    )
}));

describe('Компонент Nav', () => {

    afterEach(() => {
        cleanup();
    });

    it('should successfully render the logo and desktop links', () => {
        render(<Nav />);

        expect(screen.getByText('ContactMe')).toBeInTheDocument();

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();
        expect(screen.getByText('Profile')).toBeInTheDocument();
    });

    it('should open and close the mobile menu when clicking on the “Menu” button', () => {
        render(<Nav />);

        const menuButton = screen.getByRole('button', { name: /Menu/i });

        expect(screen.getAllByText('Home').length).toBe(1);
        expect(screen.getAllByText('Login').length).toBe(1);

        fireEvent.click(menuButton);

        expect(screen.getAllByText('Home').length).toBe(2);
        expect(screen.getAllByText('Login').length).toBe(2);

        fireEvent.click(menuButton);

        expect(screen.getAllByText('Home').length).toBe(1);
    });
});