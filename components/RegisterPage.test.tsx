import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi } from 'vitest';
import RegisterPage from './registerPage';

vi.mock('next/link', () => ({
    default: ({ children, href }: any) => <a href={href}>{children}</a>
}));

describe('RegisterPage', () => {
    it('must successfully render all fields of the registration form', () => {
        render(<RegisterPage />);

        expect(screen.getByLabelText('Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Gender')).toBeInTheDocument();
        expect(screen.getByLabelText('Date of Birth')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
    });

    it('must update status (name and gender) when entering data', () => {
        render(<RegisterPage />);

        const nameInput = screen.getByLabelText('Name') as HTMLInputElement;
        const genderSelect = screen.getByLabelText('Gender') as HTMLSelectElement;

        fireEvent.change(nameInput, { target: { value: 'Nadiia' } });
        fireEvent.change(genderSelect, { target: { value: 'female' } });

        expect(nameInput.value).toBe('Nadiia');
        expect(genderSelect.value).toBe('female');
    });
    it('must update the Email and Birthdate fields and submit the form', () => {
        render(<RegisterPage />);

        const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
        const birthdateInput = screen.getByLabelText('Date of Birth') as HTMLInputElement;

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(birthdateInput, { target: { value: '2000-01-01' } });

        expect(emailInput.value).toBe('test@example.com');
        expect(birthdateInput.value).toBe('2000-01-01');

        const form = screen.getAllByRole('button', { name: /Register/i })[0].closest('form');        if (form) {
            fireEvent.submit(form);
        }
    });
});