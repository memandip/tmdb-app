/* eslint-disable */

describe('Visit home page', () => {

    before(function () {
        cy.server()
        // matches every route containing "/genre/movie/list"
        // and provides result from fixtures (fixtures/genres.json)
        cy.intercept('GET', '**/genre/movie/list*', { fixture: 'genres' }).as('genreList')

        cy.visit('http://localhost:3000')
    })

    /**
     * Regular functions are used instead of arrow functions
     * as arrows functions causes the issue with this
     * */

    it('should fetch list of movie genres', function () {
        cy.wait('@genreList').then(xhr => {
            expect(xhr.response.body.genres).to.have.length(3)
        })
    })

    it('should find sidebar link and fetch movies on click', function () {

        cy.intercept('GET', '**/discover/movie*', { fixture: 'movies_28' })
            .as('fetchMoviesByGenre')

        cy.getElement('common.sidebar.navItem')
            .first()
            .click()


        cy.wait('@fetchMoviesByGenre').then(xhr => {
            expect(xhr.response.body.page).to.equal(1)
            expect(xhr.response.body.results).to.have.length(5)
        })

        cy.getElement('pages.genre.load_more_btn')
            .should('have.length', 0)
    })

    it('should navigate to movie detail', function () {
        cy.intercept('GET', '**/movie/*', { fixture: 'movie' }).as('movieDetail')

        const movieTitles = cy.getElement('pages.genre.card').find('a')

        movieTitles
            .should('have.length.greaterThan', 0)

        movieTitles.first().click()

        cy.wait('@movieDetail')
            .then(xhr => {
                expect(xhr.response.body).not.to.be.empty;
                expect(JSON.parse(xhr.response.body).original_title).to.equal('Jiu Jitsu')
            })
    })

})