import PropTypes from 'prop-types'
import * as React from 'react'
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

import './index.css'
import View from "./View.jsx"
import useGameCoverImage from "../../hooks/useGameCoverImage.jsx"

const GameCard = ({ game, isLoading }) => {

  const gameCover = useGameCoverImage({
    gameId: game?.id
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
  isLoading: PropTypes.bool
}

GameCard.defaultProps = {
  game: {
    id: 'default-id',
    name: 'Default Game',
    image: 'https://via.placeholder.com/350x150',
    firstReleaseDate: '2022-01-01'
  },
  isLoading: false
}