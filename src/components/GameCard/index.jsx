import PropTypes from "prop-types"

import View from "./View.jsx"
import useGameCoverImage from "../../hooks/useGameCoverImage"
import { UserContext } from "../UserContext/index.jsx"
import { addFavorite, removeFavorite } from "../../services/favorites-games"
import "./index.css"
import { useContext } from "react"

const GameCard = ({ game, isLoading }) => {
  const gameCover = useGameCoverImage({
    gameId: game?.id,
  })

  const { favoriteGames, setFavoriteGames, userInfo } = useContext(UserContext)
  const isFavorite = favoriteGames?.some(favoriteGame => favoriteGame.id === game.id)

  const handleFavorite = async e => {
    e.preventDefault()
    if (!isFavorite) {
      const isAdded = await addFavorite(game.id)
      if (isAdded) setFavoriteGames(prev => [...prev, game])
    } else {
      const isRemoved = await removeFavorite(game.id)
      if (isRemoved)
        setFavoriteGames(prev => prev.filter(favoriteGame => favoriteGame.id !== game.id))
    }
  }

  return (
    <View
      game={game}
      image={gameCover.image}
      isImageLoading={gameCover.isLoading}
      isLoading={isLoading}
      isFavorite={isFavorite}
      handleFavorite={handleFavorite}
      userInfo={userInfo}
    />
  )
}

export default GameCard

GameCard.propTypes = {
  game: PropTypes.object,
  isLoading: PropTypes.bool,
}

GameCard.defaultProps = {
  game: {},
}
