import PropTypes from "prop-types"
import { Grid, Paper } from "@mui/material"
import PlatformList from "./PlatformList"
import CompanyAccordions from "./CompanyAccordions"
import GameRating from "./GameRating"
import GameScreenshotCarousel from "./GameScreenshotCarousel"
import GameDescription from "./GameDescription"
import GameGeneralInformation from "./GameGeneralInformation"

import "./index.css"

const View = ({ game }) => {
  return (
    <Paper style={{ padding: "20px" }}>
      {game && (
        <>
          <Grid container spacing={2}>
            <Grid item xs={game.rating ? 9 : 12}>
              <GameGeneralInformation game={game} />
            </Grid>

            <Grid item xs={3}>
              <GameRating rating={game.rating} />
            </Grid>
          </Grid>
          <GameDescription description={game.description} />
          <>
            <GameScreenshotCarousel screenshots={game.screenshots} />

            <Grid container spacing={2}>
              <Grid item xs={game.platforms && game.platforms.length > 0 ? 9 : 12}>
                <CompanyAccordions companies={game.companies} />
              </Grid>
              <Grid item xs={game.companies && game.companies.length > 0 ? 3 : 12}>
                <PlatformList platforms={game.platforms} companies={game.companies} />
              </Grid>
            </Grid>
          </>
        </>
      )}
    </Paper>
  )
}

export default View

View.propTypes = {
  game: PropTypes.object,
}

View.defaultProps = {
  game: {
    name: "",
    description: "",
    screenshots: [],
    companies: [],
  },
}
