import GameCards from "../GameCards"
import useGameGeneralData from "../../hooks/useGameGeneralData"
import GameCardsLoading from "../GameCards"
import "./index.css"

import "./index.css"

import { useEffect, useState } from "react"
import TablePagination from "@mui/material/TablePagination"

const Home = () => {
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const { topGames, isLoading } = useGameGeneralData({ rowsPerPage, page })

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(1)
  }

  return (
    <>
      <h1>Top Games</h1>
      <p>Here you can find the best games of all time!</p>
      <GameCards />
      {isLoading ? (
        <GameCardsLoading itemNumber={rowsPerPage} />
      ) : (
        <GameCards gamesList={topGames} isLoading={isLoading} />
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

export default Home
