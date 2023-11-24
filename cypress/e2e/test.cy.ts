const xlsx = require("xlsx")

let accumulatedResults = []

describe("Use application", () => {
  before(() => {
    // Set up the initial Excel file
    const ws = xlsx.utils.json_to_sheet(accumulatedResults)
    const wb = xlsx.utils.book_new()
    xlsx.utils.book_append_sheet(wb, ws, "WebVitalsResults")
    xlsx.writeFile(wb, "web_vitals_results_combined.xlsx")
  })

  after(() => {
    // Save accumulated results to the Excel file
    const ws = xlsx.utils.json_to_sheet(accumulatedResults)
    const wb = xlsx.utils.book_new()
    xlsx.utils.book_append_sheet(wb, ws, "WebVitalsResults")
    xlsx.writeFile(wb, "web_vitals_results_combined.xlsx")
    cy.log("Web vitals results saved to: web_vitals_results_combined.xlsx")
  })

  beforeEach(() => {
    cy.visit("http://localhost:5173/")
  })

  it("Chcecks app load time", () => {
    cy.window()
      .its("performance.timing")
      .then((timing) => {
        const loadTime = timing.domInteractive - timing.navigationStart
        cy.log(`App Load Time: ${loadTime}ms`)
      })
  })

  for (let i = 1; i <= 100; i++) {
    it.only(`Performs audit against the Google Web Vitals - Run ${i}`, () => {
      cy.vitals({
        firstInputSelector: [
          '[data-test="post-title-input"]',
          '[data-test="post-content-input"]',
        ],
        onReport({ results }) {
          accumulatedResults = accumulatedResults.concat({
            lcp: results.lcp,
            fid: results.fid,
            cls: results.cls,
          })
        },
      })
    })
  }

  it("Does tested actions on page", () => {
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
