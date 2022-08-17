describe('calculations spec', () => {
  let noc = 0;

  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  })

  it('render Navigation UI', () => {
    cy.get('.App__navigation div').should('have.length', 2);
  });

  it('render Hompage UI', () => {
    cy.get('.Homepage__noc-input-wrap input');
    cy.get('.Homepage__noc-input-wrap button').should('have.text', 'Start');
    cy.get('.Homepage h4').should('have.text', 'NoC');
  });

  it('insert number of calculations out of the range', () => {
    cy.get('.Homepage__noc-input-wrap input').type('10{enter}');
    cy.on('window:alert', (text) => {
      expect(text).to.contains('insert number of calculations from interval <20 ; 60>');
    });
  });

  it('insert number of calculations', () => {
    noc = 20;
    cy.get('.Homepage__noc-input-wrap input').type(`${noc}{enter}`);
    cy.url().should('include', '/calculations');
  });

  it('render Calculation UI', () => {
    cy.get('.Homepage__noc-input-wrap input').type(`${noc}{enter}`);

    cy.get('.Calculations')
        .find('div')
        .then(eqs => {
          const calculationsCount = Cypress.$(eqs).length;
          expect(eqs).to.have.length(calculationsCount);
        });
    cy.get('.Timer');
    cy.get('.FinishedEq');
  });

  it('test equation: unsuccessful ', () => {
    cy.get('.Homepage__noc-input-wrap input').type(`${noc}{enter}`);
    const eq = cy.get('.Calculations div').first();
    eq.find('input').last().type('300{enter}');
    cy.get('.Calculations div').first().should('have.class', 'red-bg');
  });

  it('test equation: successful ', () => {
    cy.get('.Homepage__noc-input-wrap input').type(`20{enter}`);

    const equation = cy.get('.Calculations div').first();
    const input = equation.find('input[name="value"]')

   cy.window()
        .its('store')
        .invoke('getState')
        .its('calculations.equations').should(eq => {
          const answer = eq[0].correct_answer

          if (answer) {
            input.type(`${answer}{enter}`);
            expect(equation).to.have.class('green-bg')
          }
   });
  });


})