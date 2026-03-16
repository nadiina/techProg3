describe('Поведінка користувача (E2E)', () => {
  it('should successfully navigate to the login page and enter data', () => {
    cy.visit('http://localhost:3000');

    cy.contains('nav a', 'Login').click();

    cy.url().should('include', '/login');

    cy.get('input[type="email"]').type('test.user@example.com');
    cy.get('input[type="password"]').type('SecurePass123!');

    cy.contains('button', 'Login').click();

    // cy.url().should('include', '/profile');
  });
});