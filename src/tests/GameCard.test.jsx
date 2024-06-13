import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import GameCard from "../components/GameCard"
import { UserContext } from "../components/UserContext"
import { addFavorite } from "../services/favorites-games"
import "@testing-library/jest-dom"

describe("GameCard", () => {
  const userInfo = {
    name: "Username",
    favorites: [],
  }
  const game = {
    id: 1,
    name: "Sample Game",
    image: "sample-image.jpg",
    firstReleaseDate: "2022-01-30",
  }

  const favoriteGames = [
    {
      id: 1,
      name: "Sample Game",
      image: "sample-image.jpg",
      firstReleaseDate: "2022-01-30",
    },
  ]

  test("renders game name", () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ favoriteGames }}>
          <GameCard game={game} />
        </UserContext.Provider>
      </MemoryRouter>
    )

    const gameNameElement = screen.getByText("Sample Game")
    expect(gameNameElement).toBeInTheDocument()
  })

  test("renders game release date", () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ favoriteGames }}>
          <GameCard game={game} />
        </UserContext.Provider>
      </MemoryRouter>
    )

    const releaseDateElement = screen.getByText("Released on 2022-01-30")
    expect(releaseDateElement).toBeInTheDocument()
  })

  test("renders the heart if there is a user", () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ userInfo, favoriteGames }}>
          <GameCard game={game} />
        </UserContext.Provider>
      </MemoryRouter>
    )

    const favoriteElement = screen.getByTestId("FavoriteIcon")
    expect(favoriteElement).toBeInTheDocument()

    cleanup()

    render(
      <MemoryRouter>
        <UserContext.Provider value={{ userInfo: null, favoriteGames }}>
          <GameCard game={game} />
        </UserContext.Provider>
      </MemoryRouter>
    )

    expect(favoriteElement).not.toBeInTheDocument()
  })

  test("renders the heart in red if the game is favorite", () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ userInfo, favoriteGames }}>
          <GameCard game={game} />
        </UserContext.Provider>
      </MemoryRouter>
    )

    const favoriteElement = screen.getByTestId("FavoriteIcon")
    expect(favoriteElement).toHaveStyle("color: #d32f2f")
  })

  test("renders the heart in white if the game is not favorite", () => {
    const game = {
      id: 2,
      name: "Another Game",
      image: "another-image.jpg",
      firstReleaseDate: "2022-02-28",
    }

    render(
      <MemoryRouter>
        <UserContext.Provider value={{ userInfo, favoriteGames }}>
          <GameCard game={game} />
        </UserContext.Provider>
      </MemoryRouter>
    )

    const favoriteElement = screen.getByTestId("FavoriteIcon")
    expect(favoriteElement).toHaveStyle("color: rgba(0, 0, 0, 0.54)")
  })

  test("renders loading skeleton", () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ userInfo, favoriteGames }}>
          <GameCard isLoading />
        </UserContext.Provider>
      </MemoryRouter>
    )

    const gameCard = screen.getByTestId("GameCard")
    expect(gameCard).toBeInTheDocument()
    expect(gameCard.lastChild.firstChild.firstChild).toHaveClass("MuiSkeleton-root")
  })
})
