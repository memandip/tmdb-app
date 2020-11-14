describe('Visit home page', () => {

    /**
     * Regular functions are used instead of arrow functions
     * as arrows functions causes the issue with this
     * */ 

    beforeEach(function () {
        cy.visit('http://localhost:3000')
        cy.fixture("htmlElements.json")
            .then(elements => {
                this.elements = elements
            })
            .as('elements')
    })

    it('should find sidebar link', function () {
        cy.get('.nav-item > a')
            .first()
            .click()

        cy.contains("Movies By Action Genre")
        cy.contains("load more", { matchCase: false })
        cy.get(this.elements.page.genre.load_more_btn).click()
    })

})