import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { API_BASE_URL, API_SEARCH_URL } from "../utils/constants"

const useSearchGames = ({
  searchTerm = "",
  isSearching = false,
  setIsSearching,
  rowsPerPage = 10,
  page = 1,
}) => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwt = localStorage.getItem("jwt")

        const result = await fetch(
          `${API_BASE_URL}${API_SEARCH_URL}?term=${searchTerm}&pageSize=${rowsPerPage}&page=${page}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          }
        )

        if (!result.ok) {
          throw "There was a problem while collecting data, please retry."
        }

        const data = await result.json()

        const gamesList = []
        for (let i = 0; i < data.length; i++) {
          gamesList.push({
            id: data[i].id,
            firstReleaseDate: data[i].firstReleaseDate,
            name: data[i].name,
          })
        }
        setData(gamesList)
      } catch (error) {
        console.error("Failed to fetch data:", error)
      }
    }

    if (searchTerm) {
      setIsLoading(true)
      fetchData().then(() => setIsLoading(false))
    }
    setIsSearching(false)
  }, [isSearching, rowsPerPage, page])

  return { data: data, isLoading: isLoading }
}

export default useSearchGames

useSearchGames.propTypes = {
  searchTerm: PropTypes.string,
  isSearching: PropTypes.bool,
  setIsSearching: PropTypes.func,
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
}
