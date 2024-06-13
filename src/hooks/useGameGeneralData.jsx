import { useEffect, useState } from "react"
import { API_TOP_10_GAMES_URL, API_SCREENSHOTS_URL, API_BASE_URL } from "../utils/constants"
import game_image from "../assets/images/game_image_placeholder.png"

const useGameGeneralData = ({ rowsPerPage, page }) => {
  const [topGames, setTopGames] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  console.log("useGameGeneralData", rowsPerPage, page)

  useEffect(() => {
    async function getData() {
      // API call
      const result = await fetch(
        `${API_BASE_URL}${API_TOP_10_GAMES_URL}?pageSize=${rowsPerPage}&page=${page}`
      )

      if (!result.ok) {
        throw "There was a problem while collecting data, please retry."
      }

      const data = await result.json()

      // Formattage
      const gamesList = []
      for (let i = 0; i < data.length; i++) {
        gamesList.push({
          id: data[i].id,
          firstReleaseDate: data[i].firstReleaseDate,
          name: data[i].name,
        })
      }

      setTopGames(gamesList)
    }

    setIsLoading(true)

    getData().then(() => setIsLoading(false))
  }, [rowsPerPage, page])

  console.log("topGames", topGames)

  return { topGames, isLoading }
}

export default useGameGeneralData
