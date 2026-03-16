describe('ContactList Component', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    it('displays empty state when there are no contacts', () => {
        cy.get('body').then(($body) => {
            if ($body.text().includes('No contacts found')) {
                cy.contains('No contacts found').should('be.visible');
                cy.get('img[alt="No contacts"]').should('be.visible');
            }
        });
    });

    it('adds a new contact successfully', () => {
        const newName = 'Test';
        const newPhone = '+380991234567';

        cy.contains('button', 'Add Contact').click();

        cy.get('input[placeholder="Name"]').type(newName);
        cy.get('input[placeholder="Phone"]').type(newPhone);
        cy.contains('button', 'Add').click();

        cy.get('input[placeholder="Name"]').should('not.exist');

        cy.contains('td', newName).should('be.visible');
        cy.contains('td', newPhone).should('be.visible');
    });

    it('edits an existing contact', () => {
        const updatedName = 'Update Contact';
        const updatedPhone = '+380000000000';

        cy.contains('tr', 'Test').within(() => {
            cy.contains('button', 'Edit').click();

            cy.get('input').first().clear().type(updatedName);
            cy.get('input').last().clear().type(updatedPhone);

            cy.contains('button', 'Save').click();
        });

        cy.contains('td', updatedName).should('be.visible');
        cy.contains('td', updatedPhone).should('be.visible');
    });

    it('deletes a contact and shows notification', () => {
        cy.contains('tr', 'Update Contact').within(() => {
            cy.contains('button', 'Delete').click();
        });

        cy.contains('Update Contact deleted').should('be.visible');

        cy.contains('td', 'Update Contact').should('not.exist');
    });
});