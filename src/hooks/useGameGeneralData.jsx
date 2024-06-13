import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { API_TOP_10_GAMES_URL, API_BASE_URL } from "../utils/constants"

const useGameGeneralData = ({ rowsPerPage = 10, page = 1 }) => {
  const [topGames, setTopGames] = useState([])
  const [isLoading, setIsLoading] = useState(true)

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

  return { topGames, isLoading }
}

export default useGameGeneralData

useGameGeneralData.propTypes = {
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
}
