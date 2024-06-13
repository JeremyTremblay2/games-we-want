import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Paper,
  Typography,
} from "@mui/material"
import PropTypes from "prop-types"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

const CompanyAccordions = ({ companies }) => {
  return (
    <>
      {companies && companies.length > 0 && (
        <Paper elevation={8}>
          <h2 style={{ fontSize: "24px", textAlign: "center" }}>Companies involved</h2>
          {companies?.map((company, index) => (
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
        </Paper>
      )}
    </>
  )
}

export default CompanyAccordions

CompanyAccordions.propTypes = {
  companies: PropTypes.array,
}

CompanyAccordions.defaultProps = {
  companies: [],
}
