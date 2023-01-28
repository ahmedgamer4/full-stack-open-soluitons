/* eslint-disable no-undef */
describe("Blog app", () => {
  beforeEach(() => {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "ahmed",
      username: "ahmed",
      password: "ahmed123",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", () => {
    cy.contains("log in to application");
    cy.get("form");
  });

  describe("Login", () => {
    it("succeeds with correct credentials", () => {
      cy.get("#username").type("ahmed");
      cy.get("#password").type("ahmed123");
      cy.get("#login-button").click();

      cy.contains("ahmed logged in");
    });

    it("fails with wrong credentails", () => {
      cy.get("#username").type("halkdfj");
      cy.get("#password").type("password");
      cy.get("#login-button").click();

      cy.contains("wrong username or password");
      cy.visit("http://localhost:3000");
    });
  });

  describe("When logged in", () => {
    beforeEach(() => {
      cy.login({ username: "ahmed", password: "ahmed123" });
    });

    it("A blog can be created", () => {
      console.log(localStorage);
      cy.createBlog({ title: "first blog", author: "me", url: "myurl.com" });
      cy.get("#create-blog").click();
      cy.contains("first blog");

    });

    describe("when blogs exists", () => {
			beforeEach(() => {
				cy.createBlog({ 
					title: 'first blog',
					author: 'me',
					url: 'url',
					likes: 3,
				})

				cy.createBlog({
					title: 'second blog',
					author: 'me',
					url: 'url',
					likes: 2,
				})

				cy.createBlog({
					title: 'third blog',
					author: 'me',
					url: 'url',
					likes: 1,
				})
			})

			it('can be liked', () => {
				cy.contains('frist blog').click()
      	cy.contains("view").click();
				cy.get("#likes").contains("3")
     	  cy.contains("like").click();

        cy.get("#likes").contains("4");
			})

			it('can be deleted', () => {
				cy.contains('first blog').click()
				cy.contains('view').click()
				cy.contains('remove').click()

				cy.contains('first blog').should('not.exist')
			})

			it('blogs are sorted by the number of likes', () => {
				cy.get('.blog').eq(0).contains('first blog')
				cy.get('.blog').eq(1).contains('second blog')
				cy.get('.blog').eq(2).contains('third blog')
				cy.contains('second blog').click()
				cy.contains('like').click()
				cy.wait(1000)
				cy.contains('like').click()
				cy.contains('likes 4')
				cy.visit('http://localhost:3000')
				cy.get('.blog').eq(0).contains('second blog')
			})
    });
  });
});
