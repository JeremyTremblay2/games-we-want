import { useEffect, useState } from "react"
import { API_BASE_URL, API_SEARCH_URL } from "../utils/constants"

const useSearchGames = ({ searchTerm, isSearching, setIsSearching }) => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwt = localStorage.getItem("jwt")

        const result = await fetch(
          `${API_BASE_URL}${API_SEARCH_URL}?term=${searchTerm}&pageSize=10&page=1`,
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
      fetchData()
    }
    setIsLoading(false)
    setIsSearching(false)
  }, [isSearching])

  return { data: data, isLoading: isLoading }
}

export default useSearchGames
