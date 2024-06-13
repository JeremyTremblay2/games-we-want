import { Rating, Typography } from "@mui/material"
import PropTypes from "prop-types"

const GameRating = ({ rating = 0 }) => {
  return (
    <>
      {rating && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <Typography variant="h6">Note globale</Typography>
          <Rating
            name="game-rating"
            value={rating / 20}
            precision={0.1}
            readOnly
            size="large"
            style={{ fontSize: "3rem" }}
          />
          <Typography variant="body1">{(rating / 20).toFixed(1)} / 5</Typography>
        </div>
      )}
    </>
  )
}

export default GameRating

GameRating.propTypes = {
  rating: PropTypes.number,
}
