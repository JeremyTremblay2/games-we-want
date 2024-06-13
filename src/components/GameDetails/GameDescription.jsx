import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material"
import PropTypes from "prop-types"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { useState } from "react"

const GameDescription = ({ description }) => {
  const [expanded, setExpanded] = useState(description.split("\n").length <= 5)
  return (
    <>
      {description && (
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
            <Typography>{description}</Typography>
          </AccordionDetails>
        </Accordion>
      )}
    </>
  )
}

export default GameDescription

GameDescription.propTypes = {
  description: PropTypes.string,
}

GameDescription.defaultProps = {
  description: "",
}
