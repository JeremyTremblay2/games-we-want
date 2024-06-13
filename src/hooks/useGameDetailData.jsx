import { useEffect, useState } from "react"
import {
  API_BASE_URL,
  API_GAME_DETAIL,
  API_SCREENSHOTS_URL,
  API_COMPANIES_URL,
  API_PLATFORMS_URL,
} from "../utils/constants"
import { enqueueSnackbar } from "notistack"
import PropTypes from "prop-types"

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
        id: parseInt(gameId),
        name: data.name,
        description: data.summary,
        releaseDate: data.firstReleaseDate,
        url: data.url,
        rating: data.rating,
        screenshots: screenshots,
        companies: [],
        platforms: [],
      }

      try {
        for (let i = 0; i < data.involvedCompanies.ids.length; i++) {
          try {
            const companyResult = await fetch(
              `${API_BASE_URL}${API_COMPANIES_URL}/${data.involvedCompanies.ids[i]}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("jwt"),
                },
              }
            )
            const companyResultsData = await companyResult.json()
            game.companies.push({
              name: companyResultsData.name,
              description: companyResultsData.description,
              url: companyResultsData.url,
            })
          } catch (error) {
            console.warn(
              "Failed to get the company",
              data.involvedCompanies.ids,
              " for the game",
              gameId
            )
          }
        }
      } catch (error) {
        console.warn("Failed to get the platforms for the game", gameId)
      }

      try {
        const platformResult = await fetch(`${API_BASE_URL}${API_PLATFORMS_URL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify(data.platforms.ids),
        })
        const platformResultsData = await platformResult.json()
        for (let i = 0; i < platformResultsData.length; i++) {
          game.platforms.push({
            name: platformResultsData[i].name,
            category: platformResultsData[i].category,
            url: platformResultsData[i].url,
          })
        }
      } catch (error) {
        console.warn("Failed to get the platforms for the game", gameId)
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
