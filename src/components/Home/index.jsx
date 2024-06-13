import GameCards from "../GameCards"
import useGameGeneralData from "../../hooks/useGameGeneralData"
import Index from "../GameCardsLoading"
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
      {isLoading ? (
        <Index itemNumber={rowsPerPage} isLoading={true} />
      ) : (
        <GameCards gamesList={topGames} isLoading={isLoading} />
      )}

      <TablePagination
        component="div"
        style={{ display: "flex", justifyContent: "center" }}
        page={page - 1}
        count={-1}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelDisplayedRows={({ from, to }) => `${from}-${to}`}
        labelRowsPerPage=""
      />
    </>
  )
}

export default Home
