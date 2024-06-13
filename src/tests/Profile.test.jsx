import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import Profile from "../components/Profile"
import { UserContext } from "../components/UserContext"

describe("Profile", () => {
  const contextValue = {
    userInfo: {
      name: "Username",
      favorites: [],
    },
    favoriteGames: [
      {
        id: 1,
        name: "Sample Game",
        image: "sample-image.jpg",
        firstReleaseDate: "2022-01-30",
      },
      {
        id: 2,
        name: "Another Game",
        image: "another-image.jpg",
        firstReleaseDate: "2022-02-28",
      },
    ],
  }

  test("renders the user name", () => {
    const userInfo = {
      name: "Username",
      favorites: [],
    }

    render(
      <MemoryRouter>
        <UserContext.Provider value={contextValue}>
          <Profile user={userInfo} />
        </UserContext.Provider>
      </MemoryRouter>
    )

    const gameNameElement = screen.getByText("Username")
    expect(gameNameElement).toBeInTheDocument()
  })

  test("renders the user favorites game", () => {
    const favoriteGames = [
      {
        id: 1,
        name: "Sample Game",
        image: "sample-image.jpg",
        firstReleaseDate: "2022-01-30",
      },
      {
        id: 2,
        name: "Another Game",
        image: "another-image.jpg",
        firstReleaseDate: "2022-02-28",
      },
    ]

    render(
      <MemoryRouter>
        <UserContext.Provider value={contextValue}>
          <Profile />
        </UserContext.Provider>
      </MemoryRouter>
    )

    const gameNameElement1 = screen.getByText("Sample Game")
    expect(gameNameElement1).toBeInTheDocument()
    const gameDateElement1 = screen.getByText("Released on 2022-01-30")
    expect(gameDateElement1).toBeInTheDocument()

    const gameNameElement2 = screen.getByText("Another Game")
    expect(gameNameElement2).toBeInTheDocument()
    const gameDateElement2 = screen.getByText("Released on 2022-02-28")
    expect(gameDateElement2).toBeInTheDocument()
  })
})
