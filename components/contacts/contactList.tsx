'use client'
import React, { useState, useEffect, useRef } from 'react';
import {addContact, deleteContact, getContacts, updateContact} from "@/components/contacts/contactProp";
import notFound from "../../public/notFound.jpg"
import Image from "next/image";

export const ContactList: React.FC = () => {
    const [contacts, setContacts] = useState<any[]>([]);
    const [editContact, setEditContact] = useState<any>(null);
    const [addContactModal, setAddContactModal] = useState(false);
    const [newContact, setNewContact] = useState({ name: '', phones: '' });
    const [deleteNotification, setDeleteNotification] = useState(false);
    const [deletedContact, setDeletedContact] = useState<any>(null);
    const prevEditContact = useRef<any>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getContacts();
                setContacts(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    const handleEdit = (contact: any) => {
        setEditContact(contact);
        prevEditContact.current = { ...contact };
    };

    const handleSaveEdit = async () => {
        if (editContact) {
            await updateContact(editContact.id, editContact);
            setEditContact(null);
        }
    };

    const handleCancelEdit = () => {
        if (prevEditContact.current) {
            setEditContact(prevEditContact.current);
            prevEditContact.current = null;
        }
    };

    const handleDelete = async (id: string) => {
        const deletedContact = contacts.find(contact => contact.id === id);
        await deleteContact(id);
        setContacts(contacts.filter(contact => contact.id !== id));
        setDeletedContact(deletedContact);
        setDeleteNotification(true);
        setTimeout(() => {
            setDeleteNotification(false);
            setDeletedContact(null);
        }, 3000);
    };

    const handleAdd = async () => {
        await addContact(newContact);
        setNewContact({ name: '', phones: '' });
        setAddContactModal(false);
    };

    return (
        <div className="container mx-auto bg-white p-4 sm:p-8">
            <h1 className="text-2xl font-bold mb-4 ">Contact Directory</h1>
            {deleteNotification && deletedContact && (
                <div className="absolute top-24 right-4 bg-green-400 text-white px-3 py-2 rounded">
                    {deletedContact.name} deleted
                </div>
            )}
            {contacts.length === 0 ? (
                <div className="flex justify-center items-center h-64">
                    <Image src={notFound} alt="No contacts" height={160} width={120} />
                    <p className="text-gray-500 text-sm ml-4">No contacts found</p>
                </div>
            ) : (
                <>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {contacts.map((contact) => (
                    <tr key={contact.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{editContact?.id === contact.id ? <input type="text" className="text-sm border border-gray-300 rounded px-4 py-2 mb-2" value={editContact.name} onChange={(e) => setEditContact({ ...editContact, name: e.target.value })} /> : contact.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{editContact?.id === contact.id ? <input type="text" className="text-sm border border-gray-300 rounded px-4 py-2 mb-2" value={editContact.phones} onChange={(e) => setEditContact({ ...editContact, phones: e.target.value })} /> : contact.phones}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {editContact?.id === contact.id ? (
                                <>
                                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded" onClick={handleSaveEdit}>Save</button>
                                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded ml-2" onClick={handleCancelEdit}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    <button className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" onClick={() => handleEdit(contact)}>Edit</button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2" onClick={() => handleDelete(contact.id)}>Delete</button>
                                </>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
                <div className="mb-4">
                <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded" onClick={() => setAddContactModal(true)}>Add Contact</button>
</div></>
            )}
            {addContactModal && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-4 rounded sm:w-96 sm:p-8 ">
                        <input className="text-sm border border-gray-300 rounded px-4 py-2 mb-2" type="text" placeholder="Name" value={newContact.name} onChange={(e) => setNewContact({ ...newContact, name: e.target.value })} />
                        <input className="text-sm border border-gray-300 rounded px-4 py-2 mb-2" type="text" placeholder="Phone" value={newContact.phones} onChange={(e) => setNewContact({ ...newContact, phones: e.target.value })} />
                        <div className="flex justify-center">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleAdd}>Add</button>
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={() => setAddContactModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ContactList;
