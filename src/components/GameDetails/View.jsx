import PropTypes from "prop-types"
import CenterSlider from "../CenterSlider"

import "./index.css"
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Paper,
  Typography,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import SportsEsportsIcon from "@mui/icons-material/SportsEsports"
import AndroidIcon from "@mui/icons-material/Android"
import AppleIcon from "@mui/icons-material/Apple"
import LaptopIcon from "@mui/icons-material/Laptop"
import DevicesOtherIcon from "@mui/icons-material/DevicesOther"
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset"
import GamepadIcon from "@mui/icons-material/Gamepad"
import { useState } from "react"
import { List, ListItem, ListItemIcon, ListItemText, Avatar } from "@mui/material"
import { Link } from "react-router-dom"
import Rating from "@mui/material/Rating"
import { formatDistanceToNow, format } from "date-fns"

const View = ({ game }) => {
  const [expanded, setExpanded] = useState(game.description.split("\n").length <= 5)

  function getPlatformIcon(platform, name) {
    console.log(platform, name)
    switch (platform) {
      case "Console":
        return <SportsEsportsIcon />
      case "PortableConsole":
        return <VideogameAssetIcon />
      case "OperatingSystem":
        if (name === "Android") {
          return <AndroidIcon />
        } else if (name === "iOS") {
          return <AppleIcon />
        } else if (name === "Mac") {
          return <AppleIcon />
        } else {
          return <LaptopIcon />
        }
      case "Arcade":
        return <GamepadIcon />
      default:
        return <DevicesOtherIcon />
    }
  }

  console.log(game)

  return (
    <Paper style={{ padding: "20px" }}>
      {game && (
        <>
          <Grid container spacing={2}>
            <Grid item xs={game.rating ? 9 : 12}>
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
            </Grid>
            {game.rating && (
              <Grid item xs={3}>
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
                    value={game.rating / 20}
                    precision={0.1}
                    readOnly
                    size="large"
                    style={{ fontSize: "3rem" }}
                  />
                  <Typography variant="body1">{(game.rating / 20).toFixed(1)} / 5</Typography>
                </div>
              </Grid>
            )}
          </Grid>
          {game.description && (
            <Accordion
              elevation={8}
              sx={{ borderRadius: 0.35, "&:before": { display: "none" }, marginBottom: 2 }}
              expanded={expanded}
              onChange={(event, isExpanded) => setExpanded(isExpanded)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="game-description-content"
                id="game-description-header"
                style={{ fontSize: "20px" }}
              >
                Description
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{game.description}</Typography>
              </AccordionDetails>
            </Accordion>
          )}
          <>
            {game.screenshots && game.screenshots.length > 1 ? (
              <Paper elevation={8}>
                <h2 style={{ fontSize: "24px", textAlign: "center" }}>Gallery</h2>
                <Paper style={{ margin: "0 28px" }}>
                  <CenterSlider>
                    {game.screenshots?.map((screenshot, index) => (
                      <img key={index} src={screenshot} alt={`Screenshot ${index + 1}`} />
                    ))}
                  </CenterSlider>
                </Paper>
              </Paper>
            ) : (
              game.screenshots.length === 1 && (
                <img src={game.screenshots?.[0]} alt={`Screenshot 1`} style={{ width: "100%" }} />
              )
            )}

            <Grid container spacing={2}>
              {game.companies && game.companies.length > 0 && (
                <Grid item xs={game.platforms && game.platforms.length > 0 ? 9 : 12}>
                  <Paper elevation={8}>
                    <h2 style={{ fontSize: "24px", textAlign: "center" }}>Companies involved</h2>
                    {game.companies?.map((company, index) => (
                      <Accordion
                        key={index}
                        elevation={20}
                        sx={{ borderRadius: 0.35, "&:before": { display: "none" }, marginTop: 0.2 }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls={`panel${index + 1}-content`}
                          id={`panel${index + 1}-header`}
                          style={{ fontSize: "20px" }}
                        >
                          {company.name}
                        </AccordionSummary>
                        {company.description ? (
                          <AccordionDetails>
                            <Typography>{company.description}</Typography>
                          </AccordionDetails>
                        ) : (
                          <AccordionDetails>
                            <Typography>
                              We have no further information about this company.
                            </Typography>
                          </AccordionDetails>
                        )}
                        <AccordionActions>
                          <Button
                            href={company.url}
                            target="_blank"
                            rel="noreferrer"
                            endIcon={<OpenInNewIcon />}
                          >
                            See more
                          </Button>
                        </AccordionActions>
                      </Accordion>
                    ))}
                  </Paper>
                </Grid>
              )}

              {game.platforms && game.platforms.length > 0 && (
                <Grid item xs={game.companies && game.companies.length > 0 ? 3 : 12}>
                  <Paper elevation={8}>
                    <h2
                      style={{
                        fontSize: "24px",
                        textAlign: "center",
                        paddingBottom: 0,
                      }}
                    >
                      Platforms
                    </h2>
                    <List>
                      {game.platforms.map((platform, index) => (
                        <Paper
                          key={index}
                          elevation={index % 2 === 0 ? 8 : 4}
                          square
                          style={{ border: "none", boxShadow: "none" }}
                        >
                          <Link
                            to={platform.url}
                            target="_blank"
                            rel="noreferrer"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <ListItem button key={index}>
                              <ListItemIcon sx={{ fontSize: "40rem" }}>
                                {getPlatformIcon(platform.category, platform.name)}
                              </ListItemIcon>
                              <ListItemText primary={platform.name} />
                            </ListItem>
                          </Link>
                        </Paper>
                      ))}
                    </List>
                  </Paper>
                </Grid>
              )}
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
