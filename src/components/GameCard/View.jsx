import PropTypes from "prop-types"
import dayjs from "dayjs"
import { Link } from "react-router-dom"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import { CardActions, IconButton, Skeleton } from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"
import { red } from '@mui/material/colors'
import "./index.css"

const View = ({ game, isLoading, image, isImageLoading, isFavorite, handleFavorite }) => (
  <Link to={`/game/${game.id}`} style={{ textDecoration: "none", width: "300px" }}>
    <Card
      sx={{
        position: "relative",
        width: "300px",
        height: "500px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)"
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
            height: "400px",
            objectFit: "cover",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px"
          }}
        />
      )}
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            fontWeight: "bold",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {isLoading ? <Skeleton animation="wave" /> : game.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="right"
          sx={{
            fontStyle: "italic",
            color: "gray"
          }}
        >

          {isLoading ? (
            <Skeleton width={"50%"} animation="wave" sx={{ marginLeft: "auto" }} />
          ) : (
            game.firstReleaseDate ?
            `Released on ${dayjs(game.firstReleaseDate).format("YYYY-MM-DD")}` : " "
          )}
        </Typography>
        {!isLoading && (
          <IconButton color={isFavorite ? "error" : ""} onClick={handleFavorite} aria-label="add to favorites"
                      sx={{ position: "absolute", left: "10px", bottom: "10px" }}>
            <FavoriteIcon />
          </IconButton>
        )}
      </CardContent>
    </Card>
  </Link>
)

export default View

View.propTypes = {
  game: PropTypes.object,
  isLoading: PropTypes.bool,
  image: PropTypes.string,
  isImageLoading: PropTypes.bool,
  isFavorite: PropTypes.bool,
  handleFavorite: PropTypes.func
}

View.defaultProps = {
  game: {},
  isLoading: false,
  image: "",
  isImageLoading: false,
  isFavorite: false,
  handleFavorite: () => {
  }
}
