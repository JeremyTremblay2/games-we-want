import { Button, Grid } from "@mui/material"
import { format, formatDistanceToNow } from "date-fns"
import PropTypes from "prop-types"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"

const GameGeneralInformation = ({ game }) => {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>{game.name}</h1>
      <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
        {game.releaseDate && (
          <Grid item>
            <p>
              Release on {format(new Date(game.releaseDate), "do MMMM yyyy")} (
              {new Date(game.releaseDate).getFullYear() === new Date().getFullYear()
                ? "this year"
                : `${formatDistanceToNow(new Date(game.releaseDate))} ago`}
              )
            </p>
          </Grid>
        )}
        {game.url && (
          <Grid item>
            <Button
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
