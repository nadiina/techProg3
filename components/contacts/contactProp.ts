export  async function getContacts() {
    const res = await fetch('http://localhost:4000/contacts');
    return res.json();
}

export async function updateContact(id: string, data: any) {
    await fetch(`http://localhost:4000/contacts/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

export async function deleteContact(id: string) {
    await fetch(`http://localhost:4000/contacts/${id}`, {
        method: 'DELETE'
    });
}

export async function addContact(data: any) {
    await fetch('http://localhost:4000/contacts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const updatedContacts = await getContacts();
    await getContacts();

    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
}
