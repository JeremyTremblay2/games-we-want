import { render, screen } from "@testing-library/react"
import GameGeneralInformation from "../components/GameDetails/GameGeneralInformation"
import { expect } from "vitest"

test("renders game name", () => {
  const game = {
    id: 1,
    name: "Sample Game",
    releaseDate: "2022-01-01",
    url: "https://example.com",
  }

  render(<GameGeneralInformation game={game} />)

  const gameNameElement = screen.getByText("Sample Game")
  expect(gameNameElement).toBeInTheDocument()
})

test("renders game release date", () => {
  const game = {
    id: 1,
    name: "Default Game",
    releaseDate: "2022-01-30",
    url: "https://example.com",
  }

  render(<GameGeneralInformation game={game} />)

  // get the p balise:

  const releaseDateElement = screen.getByRole("paragraph")
  expect(releaseDateElement).toBeInTheDocument()
  expect(releaseDateElement).toHaveTextContent("Release on 30th January 2022")
})

test("renders view online button", () => {
  const game = {
    id: 1,
    name: "Default Game",
    releaseDate: "2022-01-30",
    url: "https://example.com",
  }

  render(<GameGeneralInformation game={game} />)

  const viewOnlineButton = screen.getByText("View Online")
  expect(viewOnlineButton).toBeInTheDocument()
  expect(viewOnlineButton).toHaveAttribute("href", "https://example.com")
})
