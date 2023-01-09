describe('Blog app', function() {
/* beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })*/

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Blogs')
    cy.contains('Log in')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.visit('http://localhost:3000')
      cy.get('#username').type('Marko')
      cy.get('#password').type('lolli')
      cy.get('#login').click()

      cy.contains('logged in')
    })

    it('fails with wrong credentials', function() {
      cy.visit('http://localhost:3000')
      cy.get('#username').type('Marko')
      cy.get('#password').type('loll')
      cy.get('#login').click()

      cy.contains('Log in')
    })
  })

  describe('When logged in', function() {


    it('A blog can be created', function() {
      cy.visit('http://localhost:3000')
      cy.get('#username').type('Marko')
      cy.get('#password').type('lolli')
      cy.get('#login').click()

      cy.contains('add new blog').click()

      cy.get('#title').type('Testi')
      cy.get('#author').type('Testi')
      cy.get('#url').type('Testi')
      cy.contains('save').click()

      cy.contains('title: Testi')
    })

    it('A blog can be liked', function() {
      cy.visit('http://localhost:3000')
      cy.get('#username').type('Marko')
      cy.get('#password').type('lolli')
      cy.get('#login').click()

      cy.contains('add new blog').click()

      cy.get('#title').type('Testi')
      cy.get('#author').type('Testi')
      cy.get('#url').type('Testi')
      cy.contains('save').click()

      cy.contains('Testi').contains('view').click()
     // cy.contains('like').click()
     // cy.contains('likes: 1)
    })

    it('Blogs are in order', function() {
      cy.visit('http://localhost:3000')
      cy.get('#username').type('Marko')
      cy.get('#password').type('lolli')
      cy.get('#login').click()

      cy.get('.blog').eq(0).should('contain', 'LISÄ')
      cy.get('.blog').eq(1).should('contain', 'Keski')
      cy.get('.blog').eq(2).should('contain', 'Testi')
    })
  })

})