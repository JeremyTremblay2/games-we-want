import { render, screen } from "@testing-library/react"
import GameGeneralInformation from "../components/GameDetails/GameGeneralInformation"
import { expect } from "vitest"
import Home from "../components/Home"
import { UserContext } from "../components/UserContext"
import GameCard from "../components/GameCard"
import { MemoryRouter } from "react-router-dom"

describe("Home", () => {
  test("Render the Home page", () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ userInfo: null, favoritesGame: [] }}>
          <Home />
        </UserContext.Provider>
      </MemoryRouter>
    )

    const topGamesElement = screen.getByText("Top Games")
    expect(topGamesElement).toBeInTheDocument()

    const subtitleElement = screen.getByText("Here you can find the best games of all time!")
    expect(subtitleElement).toBeInTheDocument()
  })
})
