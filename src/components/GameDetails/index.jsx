import { useParams } from "react-router-dom"
import useGameDetailData from "../../hooks/useGameDetailData"
import View from "./View.jsx"
import { useIsLoading } from "../LoadingContext"
import { useContext } from "react"
import { UserContext } from "../UserContext"
import { addFavorite, removeFavorite } from "../../services/favorites-games"

const GameDetails = () => {
  let { gameId } = useParams()
  const { game, isLoading } = useGameDetailData(gameId)
  const { setIsLoading } = useIsLoading()

  setIsLoading(isLoading)

  const { favoriteGames, setFavoriteGames } = useContext(UserContext)
  const isFavorite = favoriteGames?.some(favoriteGame => favoriteGame.id === parseInt(gameId))
  return (
    <>
      {!isLoading && (
        <View game={game} isFavorite={isFavorite} setFavoriteGames={setFavoriteGames} />
      )}
    </>
  )
}

export default GameDetails
