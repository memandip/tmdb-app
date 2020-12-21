// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

/* eslint-disable */
const resolveNestedProperty = (path, obj) => (
    path.split('.').reduce((prev, curr) => prev ? prev[curr] : null, obj || self)
)

Cypress.Commands.add('getElement', function (elementPath, cyGetOptions = {}) {
    cy.fixture("htmlElements.json")
        .then(elements => {
            const element = resolveNestedProperty(elementPath, elements)
            return cy.get(element, cyGetOptions)
        })
})
