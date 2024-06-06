import PropTypes from 'prop-types'
import * as React from 'react'
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

import './index.css'
import { Skeleton } from "@mui/material"
import moment from "moment/moment.js"

const View = ({ game, isLoading, image, isImageLoading }) => {
  return (
    <Link to={`/game/${game.id}`} style={{ textDecoration: 'none', width: "300px" }}>
      <Card
        sx={{
          width: '300px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)'
          }
        }}
      >
        {isImageLoading ? (
          <Skeleton sx={{ height: 400 }} animation="wave" variant="rectangular" />
        ) : (
          <CardMedia
            component="img"
            image={image}
            title={game.name}
            sx={{
              height: '400px',
              objectFit: 'cover',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px'
            }}
          />
        )}
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {isLoading ? (
              <Skeleton animation="wave" />
            ) : (
              game.name
            )}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="right"
            sx={{
              fontStyle: 'italic',
              color: 'gray'
            }}
          >
            {isLoading ? (
              <Skeleton width={"50%"} animation="wave" sx={{ marginLeft: "auto" }} />
            ) : (
              `Released on ${moment(game.firstReleaseDate).format('L')}`
            )}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}

export default View

View.propTypes = {
  game: PropTypes.object,
  isLoading: PropTypes.bool,
  image: PropTypes.string,
  isImageLoading: PropTypes.bool
}

View.defaultProps = {
  game: {},
  isLoading: false,
  image: "",
  isImageLoading: false
}