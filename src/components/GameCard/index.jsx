import PropTypes from "prop-types"
import * as React from "react"

import View from "./View.jsx"
import useGameCoverImage from "../../hooks/useGameCoverImage"
import { useFavoriteGames } from "../UserContext/index.jsx"
import { addFavorite, removeFavorite } from "../../services/favorites-games"
import "./index.css"
import { enqueueSnackbar } from "notistack"

const GameCard = ({ game, isLoading }) => {
  const gameCover = useGameCoverImage({
    gameId: game?.id
  })

  const { favoriteGames, setFavoriteGames } = useFavoriteGames()
  const isFavorite = favoriteGames.some((favoriteGame) => favoriteGame.id === game.id)

  const handleFavorite = async (e) => {
    e.preventDefault()
    if (!isFavorite) {
      const isAdded = await addFavorite(game.id)
      if (isAdded) setFavoriteGames([...favoriteGames, game])
    } else {
      const isRemoved = await removeFavorite(game.id)
      if (isRemoved) setFavoriteGames(favoriteGames.filter((favoriteGame) => favoriteGame.id !== game.id))
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
    />
  )
}

export default GameCard

GameCard.propTypes = {
  game: PropTypes.object,
  isLoading: PropTypes.bool
}

GameCard.defaultProps = {
  game: {}
}
