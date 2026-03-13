import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi } from 'vitest';
import LoginPage from './LoginPage';

vi.mock('next/link', () => ({
    default: ({ children, href }: any) => <a href={href}>{children}</a>
}));

describe('LoginPage', () => {
    it('should successfully render the authorization form', () => {
        render(<LoginPage />);

        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    });

    it('should update the status when data is entered', () => {
        render(<LoginPage />);

        const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
        const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'securePass123' } });

        expect(emailInput.value).toBe('test@example.com');
        expect(passwordInput.value).toBe('securePass123');
    });
    it('should process the form submission', () => {
        render(<LoginPage />);

        const form = screen.getAllByRole('button', { name: /Login/i })[0].closest('form');        if (form) {
            fireEvent.submit(form);
        }
    });
});