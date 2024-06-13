import GameCards from "../GameCards"
import Index from "../GameCardsLoading"
import { SearchContext } from "../SearchContext"
import { useContext, useEffect, useState } from "react"
import useSearchGames from "../../hooks/useSearchGames"
import { useLocation } from "react-router-dom"
import { TablePagination } from "@mui/material"

const Search = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const q = queryParams.get("q")
  const { searchTerm, setSearchTerm, isSearching, setIsSearching } = useContext(SearchContext)
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

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
  const { data, isLoading } = useSearchGames({
    searchTerm,
    isSearching,
    setIsSearching,
    rowsPerPage,
    page
  })

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(1)
  }

  return (
    <>
      <h1>Games</h1>
      {isLoading ? (
        <Index itemNumber={rowsPerPage} isLoading={true} />
      ) : (
        <GameCards gamesList={data} isLoading={isLoading} />
      )}
      <TablePagination
        component="div"
        page={page - 1}
        count={-1}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}

export default Search
