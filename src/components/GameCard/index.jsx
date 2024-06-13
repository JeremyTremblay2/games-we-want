import PropTypes from "prop-types"
import * as React from "react"

import View from "./View.jsx"
import useGameCoverImage from "../../hooks/useGameCoverImage"
import "./index.css"

const GameCard = ({ game, isLoading }) => {
  const gameCover = useGameCoverImage({
    gameId: game?.id,
  })

  return (
    <View
      game={game}
      image={gameCover.image}
      isImageLoading={gameCover.isLoading}
      isLoading={isLoading}
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
