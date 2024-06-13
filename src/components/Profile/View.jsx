import { useState } from "react"
import { Button, TablePagination } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { useFavoriteGames, useUserInfo } from "../UserContext"
import GameCards from "../GameCards"
import "./index.css"
import useDeleteAccount from "../../hooks/useDeleteAccount"
import PropTypes from "prop-types"

const Profile = ({
  user = {},
  favoriteGames = [],
  page = 1,
  rowsPerPage = 10,
  handleChangePage = () => {},
  handleChangeRowsPerPage = () => {},
  setIsDeletingAccount = () => {},
}) => {
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
        style={{ display: "flex", justifyContent: "center" }}
        page={page - 1}
        count={favoriteGames.length}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelDisplayedRows={({ from, to, count }) => `${from}-${to}`}
        labelRowsPerPage=""
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

Profile.propTypes = {
  user: PropTypes.object,
  favoriteGames: PropTypes.array,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  handleChangePage: PropTypes.func,
  handleChangeRowsPerPage: PropTypes.func,
  setIsDeletingAccount: PropTypes.func,
}
