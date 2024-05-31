import { useUserInfo } from "../UserContext"
import GameCards from "../GameCards/View"

const Profile = () => {

  const user = useUserInfo()
  const { name, favorites } = user
  return (
    <>
      <h1>{name}</h1>
      <h2>Favorites</h2>
      <GameCards gamesList={favorites} />
    </>
  )
}

export default Profile
