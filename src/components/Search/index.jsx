import GameCards from "../GameCards"
import GameCardsLoading from "../GameCards"
import { SearchContext } from "../SearchContext"
import { useContext, useEffect } from "react"
import useSearchGames from "../../hooks/useSearchGames.js"
import { useLocation } from "react-router-dom"

const Search = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const q = queryParams.get("q")
  const { searchTerm, setSearchTerm, isSearching, setIsSearching } = useContext(SearchContext)
  useEffect(() => {
    if (q) {
      setSearchTerm(q)
    }
  }, [q])
  useEffect(() => {
    if (searchTerm === q) {
      setIsSearching(true)
    }
  }, [searchTerm])
  const { data, isLoading: isLoadingSearch } = useSearchGames({
    searchTerm,
    isSearching,
    setIsSearching,
  })

  return (
    <>
      {searchTerm && <h1>Games</h1>}
      {isLoadingSearch && (
        <>
          <p>Searching...</p>
          <GameCardsLoading itemNumber={10} />
        </>
      )}
      {searchTerm && searchTerm.trim() !== "" && data && data.length > 0 ? (
        <>
          <p>Here are the games found: </p>
          <GameCards gamesList={data} isLoading={isLoadingSearch} />
        </>
      ) : (
        <p>No games found for your research.</p>
      )}
    </>
  )
}

export default Search
