import { useState } from "react"
import { Button, TablePagination } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { useFavoriteGames, useUserInfo } from "../UserContext"
import GameCards from "../GameCards"
import "./index.css"
import useDeleteAccount from "../../hooks/useDeleteAccount"

const Profile = () => {
  const [isDeletingAccount, setIsDeletingAccount] = useState(false)
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const user = useUserInfo()
  const { favoriteGames } = useFavoriteGames()

  useDeleteAccount(isDeletingAccount)

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(1)
  }

  return (
    <div className="profile">
      <h1>{user.name}</h1>
      {favoriteGames.length === 0 ? (
        <h2>You have no favorite games yet</h2>
      ) : (
        <>
          <h2>Your favorite games</h2>
          <GameCards
            gamesList={favoriteGames.slice((page - 1) * rowsPerPage, page * rowsPerPage)}
          />
        </>
      )}
      <TablePagination
        component="div"
        page={page - 1}
        count={favoriteGames.length}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <h2>Manage Account</h2>
      <Button
        onClick={() => setIsDeletingAccount(true)}
        variant="contained"
        color="error"
        startIcon={<DeleteIcon />}
        size="large"
      >
        Delete Account
      </Button>
    </div>
  )
}

export default Profile
