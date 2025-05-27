/**
 * End-to-end tests for Calculator functionality
 * Tests the complete user workflows and interactions
 */

describe('Calculator E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.calculator').should('be.visible');
  });

  describe('Basic Functionality', () => {
    it('should perform basic arithmetic operations', () => {
      // Test addition
      cy.get('[data-number="5"]').click();
      cy.get('[data-operation="+"]').click();
      cy.get('[data-number="3"]').click();
      cy.get('[data-equals]').click();
      cy.get('[data-current-operand]').should('contain', '8');

      // Test clear
      cy.get('[data-all-clear]').click();
      cy.get('[data-current-operand]').should('contain', '0');
    });

    it('should handle decimal numbers', () => {
      cy.get('[data-number="1"]').click();
      cy.get('[data-number="."]').click();
      cy.get('[data-number="5"]').click();
      cy.get('[data-operation="+"]').click();
      cy.get('[data-number="2"]').click();
      cy.get('[data-number="."]').click();
      cy.get('[data-number="3"]').click();
      cy.get('[data-equals]').click();
      cy.get('[data-current-operand]').should('contain', '3.8');
    });

    it('should handle keyboard input', () => {
      cy.get('body').type('5+3=');
      cy.get('[data-current-operand]').should('contain', '8');
      
      cy.get('body').type('{backspace}');
      cy.get('[data-current-operand]').should('contain', '');
    });
  });

  describe('Theme Switching', () => {
    it('should switch between dark and light themes', () => {
      cy.get('.theme-toggle').click();
      cy.get('body').should('have.class', 'light-theme');
      
      cy.get('.theme-toggle').click();
      cy.get('body').should('have.class', 'dark-theme');
    });

    it('should persist theme preference', () => {
      cy.get('.theme-toggle').click();
      cy.reload();
      cy.get('body').should('have.class', 'light-theme');
    });
  });

  describe('History Feature', () => {
    it('should save calculation history', () => {
      // Perform a calculation
      cy.get('[data-number="5"]').click();
      cy.get('[data-operation="+"]').click();
      cy.get('[data-number="3"]').click();
      cy.get('[data-equals]').click();

      // Open history
      cy.get('.history-toggle').click();
      cy.get('.history-panel').should('be.visible');
      cy.get('.history-item').should('contain', '5 + 3 = 8');
    });

    it('should clear history', () => {
      // Perform calculation and open history
      cy.get('[data-number="5"]').click();
      cy.get('[data-operation="+"]').click();
      cy.get('[data-number="3"]').click();
      cy.get('[data-equals]').click();
      cy.get('.history-toggle').click();

      // Clear history
      cy.get('.clear-history').click();
      cy.get('.history-item').should('not.exist');
    });
  });

  describe('Error Handling', () => {
    it('should handle division by zero', () => {
      cy.get('[data-number="5"]').click();
      cy.get('[data-operation="÷"]').click();
      cy.get('[data-number="0"]').click();
      cy.get('[data-equals]').click();
      cy.get('[data-current-operand]').should('contain', 'Error');
    });

    it('should recover from errors', () => {
      // Cause an error
      cy.get('[data-number="5"]').click();
      cy.get('[data-operation="÷"]').click();
      cy.get('[data-number="0"]').click();
      cy.get('[data-equals]').click();

      // Clear and continue
      cy.get('[data-all-clear]').click();
      cy.get('[data-number="5"]').click();
      cy.get('[data-current-operand]').should('contain', '5');
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard navigable', () => {
      cy.get('body').tab();
      cy.focused().should('have.attr', 'data-all-clear');
      
      cy.focused().tab();
      cy.focused().should('have.attr', 'data-delete');
    });

    it('should have proper ARIA labels', () => {
      cy.get('[data-number="1"]').should('have.attr', 'aria-label', 'Number 1');
      cy.get('[data-operation="+"]').should('have.attr', 'aria-label', 'Addition');
      cy.get('[data-equals]').should('have.attr', 'aria-label', 'Equals');
    });

    it('should announce calculations to screen readers', () => {
      cy.get('[aria-live="polite"]').should('exist');
    });
  });

  describe('PWA Features', () => {
    it('should have a web app manifest', () => {
      cy.request('/manifest.json').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name');
        expect(response.body).to.have.property('icons');
      });
    });

    it('should register a service worker', () => {
      cy.window().then((win) => {
        expect(win.navigator.serviceWorker).to.exist;
      });
    });
  });

  describe('Responsive Design', () => {
    it('should work on mobile viewport', () => {
      cy.viewport('iphone-x');
      cy.get('.calculator').should('be.visible');
      cy.get('[data-number="5"]').click();
      cy.get('[data-current-operand]').should('contain', '5');
    });

    it('should work on tablet viewport', () => {
      cy.viewport('ipad-2');
      cy.get('.calculator').should('be.visible');
      cy.get('[data-number="5"]').click();
      cy.get('[data-current-operand]').should('contain', '5');
    });
  });
});
