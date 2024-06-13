import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { UserContext } from "../components/UserContext"
import GameCardsLoading from "../components/GameCardsLoading"

describe("GameCardsLoading", () => {
  test("renders the right number of cards", () => {
    const images = ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]

    render(
      <MemoryRouter>
        <UserContext.Provider value={{ favoriteGames: [] }}>
          <GameCardsLoading itemNumber={10} />
        </UserContext.Provider>
      </MemoryRouter>
    )

    let loadingCards = screen.getAllByTestId("GameCard")
    expect(loadingCards).toHaveLength(10)
  })
})
