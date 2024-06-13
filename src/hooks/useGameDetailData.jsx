import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { enqueueSnackbar } from "notistack"
import { API_BASE_URL, API_GAME_DETAIL, API_SCREENSHOTS_URL } from "../utils/constants"

const useGameDetailData = (gameId = 0) => {
  const [game, setGame] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getData() {
      const result = await fetch(`${API_BASE_URL}${API_GAME_DETAIL}/${gameId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })

      if (!result.ok) {
        enqueueSnackbar("There was a problem while collecting the game data, please retry.", {
          variant: "error",
        })
        throw "There was a problem while collecting the game data, please retry."
      }

      const data = await result.json()

      const imageResults = await fetch(`${API_BASE_URL}${API_SCREENSHOTS_URL}/${gameId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })

      if (!imageResults.ok) {
        enqueueSnackbar(
          "There was a problem while collecting screenshots of the game, please retry.",
          { variant: "error" }
        )
        return {
          name: data.name,
          description: data.summary,
        }
      }

      let imageResultsData = []

      try {
        imageResultsData = await imageResults.json()
      } catch (error) {
        console.warn("Failed to get images for the game", gameId)
      }
      const screenshots = imageResultsData.map(screenshot => {
        return screenshot.url
      })

      const game = {
        name: data.name,
        description: data.summary,
        screenshots: screenshots,
      }
      setGame(game)
    }

    setIsLoading(true)
    getData().then(() => setIsLoading(false))
  }, [gameId])
  return { game, isLoading }
}

export default useGameDetailData

useGameDetailData.propTypes = {
  gameId: PropTypes.number,
}