import { Button, Grid, IconButton } from "@mui/material"
import PropTypes from "prop-types"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import advancedFormat from "dayjs/plugin/advancedFormat"
import FavoriteIcon from "@mui/icons-material/Favorite"
import { handleFavorite } from "../../services/favorites-games"

dayjs.extend(relativeTime)
dayjs.extend(advancedFormat)

const GameGeneralInformation = ({ game = {}, isFavorite = false, setFavoriteGames }) => (
  <>
    <h1 style={{ textAlign: "center" }}>{game.name}</h1>
    <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
      {game.releaseDate && (
        <Grid item>
          <p>
            Release on {dayjs(game.releaseDate).format("Do MMMM YYYY")} (
            {dayjs(game.releaseDate).year() === dayjs().year()
              ? "this year"
              : `${dayjs().to(dayjs(game.releaseDate))}`}
            )
          </p>
        </Grid>
      )}
      {game.url && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 20px",
            width: "100%",
            height: "36.5px",
          }}
        >
          <Button
            name="view-online"
            variant="contained"
            color="primary"
            target="_blank"
            rel="noreferrer"
            endIcon={<OpenInNewIcon />}
            href={game.url}
          >
            View Online
          </Button>
          <IconButton
            color={isFavorite ? "error" : ""}
            onClick={e => handleFavorite(e, game, isFavorite, setFavoriteGames)}
            aria-label="add to favorites"
            className="favorite-button"
          >
            <FavoriteIcon fontSize="large" />
          </IconButton>
        </div>
      )}
    </Grid>
  </>
)

export default GameGeneralInformation

GameGeneralInformation.propTypes = {
  game: PropTypes.object,
  isFavorite: PropTypes.bool,
  setFavoriteGames: PropTypes.func,
}
