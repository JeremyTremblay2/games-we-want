import { useState } from "react"
import { Button } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import { useFavoriteGames, useUserInfo } from "../UserContext"
import GameCards from "../GameCards/View"
import "./index.css"
import useDeleteAccount from "../../hooks/useDeleteAccount"

const Profile = () => {
  const [isDeletingAccount, setIsDeletingAccount] = useState(false)

  const user = useUserInfo()
  const { favoriteGames } = useFavoriteGames()

  useDeleteAccount(isDeletingAccount)

  return (
    <div className="profile">
      <h1>{user.name}</h1>
      {favoriteGames.length === 0 ? (
        <h2>You have no favorite games yet</h2>
      ) : (
        <>
          <h2>Your favorite games</h2>
          <GameCards gamesList={favoriteGames} />
        </>
      )}
      <h2>Manage Account</h2>
      <Button onClick={() => setIsDeletingAccount(true)} variant="contained" color="error" startIcon={<DeleteIcon />}
              size="large">Delete Account</Button>
    </div>
  )
}

export default Profile
