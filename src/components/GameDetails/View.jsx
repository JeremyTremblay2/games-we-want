import PropTypes from "prop-types"
import CenterSlider from "../CenterSlider"

import "./index.css"
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import { Link } from "react-router-dom"

const View = ({ game }) => {
  return (
    <>
      {game && (
        <>
          <h1>{game.name}</h1>
          <p>{game.description}</p>
          <>
            {game.screenshots && game.screenshots.length > 1 ? (
              <CenterSlider>
                {game.screenshots?.map((screenshot, index) => (
                  <img key={index} src={screenshot} alt={`Screenshot ${index + 1}`} />
                ))}
              </CenterSlider>
            ) : (
              game.screenshots.length === 1 && (
                <img src={game.screenshots?.[0]} alt={`Screenshot 1`} style={{ width: "100%" }} />
              )
            )}
            {game.companies && game.companies.length > 0 && (
              <h2 style={{ fontSize: "24px" }}>Companies who developed this game</h2>
            )}
            {game.companies?.map((company, index) => (
              <Accordion key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
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
