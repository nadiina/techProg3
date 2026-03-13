import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getContacts, deleteContact, updateContact, addContact } from './contactProp';

describe('Contact API Functions', () => {
    beforeEach(() => {
        global.fetch = vi.fn();
        global.localStorage = {
            setItem: vi.fn(),
            getItem: vi.fn(),
            removeItem: vi.fn(),
            clear: vi.fn(),
            length: 0,
            key: vi.fn(),
        };
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should successfully receive contacts', async () => {
        const mockContacts = [{ id: '1', name: 'Ivan', phones: '123' }];

        (global.fetch as any).mockResolvedValue({
            json: async () => mockContacts,
        });

        const contacts = await getContacts();

        expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/contacts');
        expect(contacts).toEqual(mockContacts);
    });

    it('should successfully delete the contact', async () => {
        (global.fetch as any).mockResolvedValue({ ok: true });

        await deleteContact('1');

        expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/contacts/1', {
            method: 'DELETE',
        });
    });

    it('should successfully update the contact', async () => {
        const updateData = { name: 'Ivan Updated', phones: '321' };
        (global.fetch as any).mockResolvedValue({ ok: true });

        await updateContact('1', updateData);

        expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/contacts/1', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateData),
        });
    });
    it('addContact: must make a POST request and update localStorage', async () => {
        const newContact = { name: 'New User', phones: '999' };
        const mockUpdatedContacts = [{ id: '1', name: 'New User', phones: '999' }];

        (global.fetch as any).mockResolvedValue({
            json: async () => mockUpdatedContacts,
            ok: true
        });

        await addContact(newContact);

        expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/contacts', expect.objectContaining({
            method: 'POST',
            body: JSON.stringify(newContact)
        }));

        expect(global.localStorage.setItem).toHaveBeenCalledWith('contacts', JSON.stringify(mockUpdatedContacts));
    });
    it('addContact: should make a POST request and update localStorage', async () => {
        const newContact = { name: 'New User', phones: '999' };
        const mockUpdatedContacts = [{ id: '1', name: 'New User', phones: '999' }];

        (global.fetch as any).mockResolvedValue({
            json: async () => mockUpdatedContacts,
            ok: true
        });

        await addContact(newContact);

        expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/contacts', expect.objectContaining({
            method: 'POST',
            body: JSON.stringify(newContact)
        }));

        expect(global.localStorage.setItem).toHaveBeenCalledWith('contacts', JSON.stringify(mockUpdatedContacts));
    });
});