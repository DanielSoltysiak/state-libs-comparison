describe("Use application", () => {
  it("Does tested actions on page", () => {
    cy.visit("http://127.0.0.1:5173/")
    cy.window()
      .its("performance.timing")
      .then((timing) => {
        const loadTime = timing.domInteractive - timing.navigationStart
        cy.log(`App Load Time: ${loadTime}ms`)
      })

    cy.getByData("posts-list")
      .get(":nth-child(2)")
      .getByData("thumbsUp-button")
      .contains("0")
      .click()
    cy.getByData("posts-list")
      .get(":nth-child(2)")
      .getByData("thumbsUp-button")
      .should("contain", "1")

    cy.get(':nth-child(2) > [data-test="view-post"]').click()
    cy.getByData("thumbsUp-button").should("contain", "1")
    cy.getByData("edit-post").click()
    cy.getByData("post-title-input").clear().type("Edited title")
    cy.getByData("save-post").click()
    cy.getByData("post-title").should("contain", "Edited title")

    cy.getByData("navigation-posts").click()
    cy.getByData("post-title-input").type("New title")
    cy.getByData("post-author-select").select(1)
    cy.getByData("post-content-input").type("New content")
    cy.getByData("save-post").click()
    cy.getByData("posts-list").contains("New title")

    cy.getByData("refresh-notifications").click()
    cy.getByData("badge")
    cy.getByData("navigation-notifications").click()
    cy.getByData("badge").should("not.exist")
    cy.getByData("refresh-notifications").click()
    cy.getByData("badge").should("not.exist")
  })
})
