import PropTypes from "prop-types"
import { Grid, IconButton, Paper } from "@mui/material"
import PlatformList from "./PlatformList"
import CompanyAccordions from "./CompanyAccordions"
import GameRating from "./GameRating"
import GameScreenshotCarousel from "./GameScreenshotCarousel"
import GameDescription from "./GameDescription"
import GameGeneralInformation from "./GameGeneralInformation"
import "./index.css"
import FavoriteIcon from "@mui/icons-material/Favorite"

const View = ({ game = {}, isFavorite = false, setFavoriteGames }) => {
  return (
    <Paper style={{ padding: "20px" }}>
      {game && (
        <>
          <div className="gameDetail-top">
            <Grid item xs={game.rating ? 9 : 12}>
              <GameGeneralInformation
                game={game}
                isFavorite={isFavorite}
                setFavoriteGames={setFavoriteGames}
              />
            </Grid>
            <Grid item xs={3}>
              <GameRating rating={game.rating} />
            </Grid>
          </div>
          <GameDescription description={game.description} />
          <>
            <GameScreenshotCarousel screenshots={game.screenshots} />

            <div className="gameDetail-bottom">
              <CompanyAccordions companies={game.companies} />
              <PlatformList platforms={game.platforms} companies={game.companies} />
            </div>
          </>
        </>
      )}
    </Paper>
  )
}

export default View

View.propTypes = {
  game: PropTypes.object,
  isFavorite: PropTypes.bool,
  setFavoriteGames: PropTypes.func,
}
