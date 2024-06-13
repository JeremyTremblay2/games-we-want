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
  Typography,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import { Link } from "react-router-dom"
import { useState } from "react"

const View = ({ game }) => {
  const [expanded, setExpanded] = useState(game.description.split("\n").length <= 5)
  return (
    <>
      {game && (
        <>
          <h1>{game.name}</h1>
          {game.description && (
            <Accordion
              sx={{ borderRadius: 0.35, "&:before": { display: "none" }, marginTop: 0.2 }}
              expanded={expanded}
              onChange={(event, isExpanded) => setExpanded(isExpanded)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="game-description-content"
                id="game-description-header"
              >
                <Typography>Description</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{game.description}</Typography>
              </AccordionDetails>
            </Accordion>
          )}
          <>
            {game.screenshots && game.screenshots.length > 1 ? (
              <Grid item xs={12} md={6}>
                <CenterSlider>
                  {game.screenshots?.map((screenshot, index) => (
                    <img key={index} src={screenshot} alt={`Screenshot ${index + 1}`} />
                  ))}
                </CenterSlider>
              </Grid>
            ) : (
              game.screenshots.length === 1 && (
                <img src={game.screenshots?.[0]} alt={`Screenshot 1`} style={{ width: "100%" }} />
              )
            )}
            {game.companies && game.companies.length > 0 && (
              <h2 style={{ fontSize: "24px" }}>Companies who developed this game</h2>
            )}
            {game.companies?.map((company, index) => (
              <Accordion
                key={index}
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
                    <Typography>We have no further information about this company.</Typography>
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
          </>
        </>
      )}
    </>
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
