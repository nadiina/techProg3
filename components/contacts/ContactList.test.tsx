import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as api from './contactProp';
import ContactList from "./contactList";

vi.mock('next/image', () => ({
    // eslint-disable-next-line @next/next/no-img-element
    default: (props: any) => <img alt="mock" {...props} />
}));

vi.mock('./contactProp', () => ({
    getContacts: vi.fn(),
    deleteContact: vi.fn(),
    updateContact: vi.fn(),
    addContact: vi.fn(),
}));

describe('ContactList', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should show the message "No contacts found" if the list is empty', async () => {
        vi.mocked(api.getContacts).mockResolvedValue([]);

        render(<ContactList />);

        expect(await screen.findByText('No contacts found')).toBeInTheDocument();
    });

    it('should render a table with contacts if the data is there', async () => {
        const mockContacts = [{ id: '1', name: 'Nadiia', phones: '099-123-45-67' }];
        vi.mocked(api.getContacts).mockResolvedValue(mockContacts);

        render(<ContactList />);

        expect(await screen.findByText('Nadiia')).toBeInTheDocument();
        expect(await screen.findByText('099-123-45-67')).toBeInTheDocument();
    });
});