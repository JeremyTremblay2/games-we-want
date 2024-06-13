import { createContext, useContext } from "react"
import { useState } from "react"
import PropTypes from "prop-types"

export const SearchContext = createContext()

export const SearchContextProvider = ({ children = null }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, isSearching, setIsSearching }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearchContext() {
  const { searchTerm } = useContext(SearchContext)
  return { searchTerm }
}

SearchContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
