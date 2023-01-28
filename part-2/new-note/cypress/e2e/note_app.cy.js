/* eslint-disable no-undef */

// cypress commands always return undefined
describe("Note app", function () {
  beforeEach(() => {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "ahmed",
      username: "ahmed",
      password: "ahmed123",
    };
    cy.request("POST", "http://localhost:3001/api/users", user);
    cy.visit("http://localhost:3000");
  });
  it("front page can be opened", function () {
    cy.contains("Notes");
    cy.contains(
      "Note app. Department of Computer Science. University of Helsinki"
    );
  });

  it("login form can be opened", () => {
    cy.contains("login").click();
  });

  it("user can log in", () => {
    cy.contains("login").click();
    cy.get("#username").type("ahmed");
    cy.get("#password").type("ahmed123");
    cy.get("#login-button").click();

    cy.contains("ahmed logged in");
  });

  describe("when logged in", () => {
    beforeEach(() => {
      cy.login({ username: "ahmed", password: "ahmed123" });
    });

    describe("and several notes exits", () => {
      beforeEach(() => {
        cy.createNote({ content: "first note", important: false });
        cy.createNote({ content: "second note", important: false });
        cy.createNote({ content: "third note", important: false });
      });

      it("one of those can be made important", () => {
        cy.contains("second note").parent.find("button").click(); // we cannot use get here because it search the whole page
        cy.contains("second note")
          .parent.find("button")
          .contains("make note important");
      });
      it("then example", () => {
        cy.get("button").then((buttons) => {
          console.log("number of buttons", buttons.length);
          cy.wrap(buttons[0]).click();
        });
      });
    });

    describe("and a note exists", () => {
      beforeEach(() => {
        cy.createNote({
          content: "another note cypress",
          important: false,
        });
      });

      it("it can be made important", () => {
        cy.contains("another note cypress").contains("make important").click();

        cy.contains("another note cypress").contains("make not important");
      });
    });
  });

  it.only("login fails with wrong password", () => {
    cy.contains("login").click();
    cy.get("#username").type("ahmed");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();

    cy.contains("Wrong credentials");
  });
});
