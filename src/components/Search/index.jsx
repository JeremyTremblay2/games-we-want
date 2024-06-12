import GameCards from "../GameCards"
import GameCardsLoading from "../GameCards"
import { SearchContext } from "../SearchContext"
import { useContext, useEffect } from "react"
import useSearchGames from "../../hooks/useSearchGames.js"

const Search = () => {
  const { searchTerm, isSearching, setIsSearching } = useContext(SearchContext)
  useEffect(() => console.log(data, isLoadingSearch, searchTerm, isSearching, setIsSearching))
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
