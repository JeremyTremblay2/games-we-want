import PropTypes from "prop-types"

import View from "./View.jsx"
import useGameCoverImage from "../../hooks/useGameCoverImage"
import { UserContext } from "../UserContext/index.jsx"
import { addFavorite, removeFavorite } from "../../services/favorites-games"
import "./index.css"
import { useContext } from "react"

const GameCard = ({ game = {}, isLoading = false }) => {
  const gameCover = useGameCoverImage({
    gameId: game?.id,
  })

  const { favoriteGames, setFavoriteGames, userInfo } = useContext(UserContext)
  const isFavorite = favoriteGames?.some(favoriteGame => favoriteGame.id === game.id)

  return (
    <View
      game={game}
      image={gameCover.image}
      isImageLoading={gameCover.isLoading}
      isLoading={isLoading}
      isFavorite={isFavorite}
      setFavoriteGames={setFavoriteGames}
      userInfo={userInfo}
    />
  )
}

export default GameCard

GameCard.propTypes = {
  game: PropTypes.object,
  isLoading: PropTypes.bool,
}
