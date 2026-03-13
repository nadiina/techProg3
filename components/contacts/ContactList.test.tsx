import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

    it('should delete the contact when clicking on Delete', async () => {
        const mockContacts = [{ id: '1', name: 'Nadiia', phones: '099-123-45-67' }];
        vi.mocked(api.getContacts).mockResolvedValue(mockContacts);
        render(<ContactList />);

        await waitFor(() => expect(screen.getAllByText('Nadiia')[0]).toBeInTheDocument());

        fireEvent.click(screen.getAllByText('Delete')[0]);

        expect(api.deleteContact).toHaveBeenCalledWith('1');
    });

    it('should open a modal window and add a new contact', async () => {
        vi.mocked(api.getContacts).mockResolvedValue([]);
        render(<ContactList />);
        await waitFor(() => expect(screen.getAllByText('No contacts found')[0]).toBeInTheDocument());

        fireEvent.click(screen.getAllByText('Add Contact')[0]);

        const nameInput = screen.getAllByPlaceholderText('Name')[0];
        const phoneInput = screen.getAllByPlaceholderText('Phone')[0];

        fireEvent.change(nameInput, { target: { value: 'New Friend' } });
        fireEvent.change(phoneInput, { target: { value: '555-555' } });

        fireEvent.click(screen.getAllByRole('button', { name: 'Add' })[0]);

        expect(api.addContact).toHaveBeenCalledWith({ name: 'New Friend', phones: '555-555' });
    });

    it('should switch to edit mode and save changes', async () => {
        const mockContacts = [{ id: '1', name: 'Nadiia', phones: '099-123-45-67' }];
        vi.mocked(api.getContacts).mockResolvedValue(mockContacts);
        render(<ContactList />);
        await waitFor(() => expect(screen.getAllByText('Nadiia')[0]).toBeInTheDocument());

        fireEvent.click(screen.getAllByText('Edit')[0]);

        const inputs = screen.getAllByRole('textbox');
        fireEvent.change(inputs[0], { target: { value: 'Nadiia Updated' } });
        fireEvent.change(inputs[1], { target: { value: '111-222' } }); // Ось він, наш 92-й рядок!

        fireEvent.click(screen.getAllByText('Save')[0]);

        expect(api.updateContact).toHaveBeenCalledWith('1', { id: '1', name: 'Nadiia Updated', phones: '111-222' });
    });

    it('should cancel editing when clicking Cancel', async () => {
        const mockContacts = [{ id: '1', name: 'Nadiia', phones: '099-123-45-67' }];
        vi.mocked(api.getContacts).mockResolvedValue(mockContacts);
        render(<ContactList />);
        await waitFor(() => expect(screen.getAllByText('Nadiia')[0]).toBeInTheDocument());

        fireEvent.click(screen.getAllByText('Edit')[0]);

        const inputs = screen.getAllByRole('textbox');
        fireEvent.change(inputs[0], { target: { value: 'Wrong Name' } });

        fireEvent.click(screen.getAllByText('Cancel')[0]);

        expect(screen.getAllByText('Nadiia')[0]).toBeInTheDocument();
    });
    it('should handle server error when loading', async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        vi.mocked(api.getContacts).mockRejectedValue(new Error('Network error'));
        render(<ContactList />);

        await waitFor(() => expect(consoleSpy).toHaveBeenCalled());
        consoleSpy.mockRestore();
    });

    it('should hide the deletion notification after 3 seconds', async () => {
        const mockContacts = [{ id: '1', name: 'Nadiia', phones: '099-123-45-67' }];
        vi.mocked(api.getContacts).mockResolvedValue(mockContacts);
        render(<ContactList />);

        await waitFor(() => expect(screen.getAllByText('Nadiia')[0]).toBeInTheDocument());

        fireEvent.click(screen.getAllByText('Delete')[0]);

        expect(await screen.findByText('Nadiia deleted')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.queryByText('Nadiia deleted')).not.toBeInTheDocument();
        }, { timeout: 4000 });

    }, 10000);
});