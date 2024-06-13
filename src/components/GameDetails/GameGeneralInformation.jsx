import { Button, Grid } from "@mui/material"
import PropTypes from "prop-types"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import advancedFormat from "dayjs/plugin/advancedFormat"

dayjs.extend(relativeTime)
dayjs.extend(advancedFormat)

const GameGeneralInformation = ({ game }) => {
  return (
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
          <Grid item>
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
          </Grid>
        )}
      </Grid>
    </>
  )
}

export default GameGeneralInformation

GameGeneralInformation.propTypes = {
  game: PropTypes.object,
}

GameGeneralInformation.defaultProps = {
  game: {},
}
