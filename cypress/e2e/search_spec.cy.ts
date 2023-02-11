describe('Search Page Test', () => {
  it('Navigates to the search page and displays results', () => {
    cy.visit('/');
    cy.get('.search__page').should('be.visible');
  });

  it('When the user types in the search field and clicks Search button, the search results are updated', () => {
    cy.visit('/');

    cy.get('.search__input').type('Avengers');
    cy.get('.search__button').click();

    cy.get('.search__results').should('be.visible');
    cy.get('.title__date').contains('avengers', { matchCase: false });

    cy.get('.search__input').clear().type('Batman');
    cy.get('.search__button').click();

    cy.get('.search__results').should('be.visible');
    cy.get('.title__date').contains('batman', { matchCase: false });
  });

  it('When the user clicks on the movie card, the correct movie details page is displayed', () => {
    cy.visit('/');

    cy.get('.search__input').type('Avengers');
    cy.get('.search__button').click();

    cy.get('.search__results').should('be.visible');
    cy.get('.title__date').contains('avengers', { matchCase: false });

    // Click on the first movie card and check if the correct movie details page is displayed
    cy.get('.movie__item')
      .first()
      .click()
      .then((movieItem) => {
        const movieId = movieItem[0].id;
        cy.get('.title__date').contains('avengers', { matchCase: false });
        cy.url().should('include', `movie=${movieId}`);
      });

    // Click on the second movie card and check if the correct movie details page is displayed
    cy.get('.movie__item')
      .eq(1)
      .click()
      .then((movieItem) => {
        const movieId = movieItem[0].id;
        cy.get('.title__date').contains('avengers', { matchCase: false });
        cy.url().should('include', `movie=${movieId}`);
      });
  });
});
