import { useState } from "react"
import { Button, TablePagination } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { useFavoriteGames, useUserInfo } from "../UserContext"
import GameCards from "../GameCards"
import "./index.css"
import useDeleteAccount from "../../hooks/useDeleteAccount"
import View from "./View"

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
  console.log(user)
  console.log(favoriteGames)

  return (
    <View
      user={user}
      favoriteGames={favoriteGames}
      rowsPerPage={rowsPerPage}
      page={page}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      setIsDeletingAccount={setIsDeletingAccount}
    />
  )
}

export default Profile
