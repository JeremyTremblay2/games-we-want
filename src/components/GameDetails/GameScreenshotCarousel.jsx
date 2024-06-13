import { Paper } from "@mui/material"
import PropTypes from "prop-types"
import CenterSlider from "../CenterSlider"

const GameScreenshotCarousel = ({ screenshots }) => {
  return (
    <>
      {screenshots && screenshots.length > 1 ? (
        <Paper elevation={8}>
          <h2 style={{ fontSize: "24px", textAlign: "center" }}>Gallery</h2>
          <Paper style={{ margin: "0 28px" }}>
            <CenterSlider>
              {screenshots?.map((screenshot, index) => (
                <img key={index} src={screenshot} alt={`Screenshot ${index + 1}`} />
              ))}
            </CenterSlider>
          </Paper>
        </Paper>
      ) : (
        screenshots.length === 1 && (
          <img src={screenshots?.[0]} alt={`Screenshot 1`} style={{ width: "100%" }} />
        )
      )}
    </>
  )
}

export default GameScreenshotCarousel

GameScreenshotCarousel.propTypes = {
  screenshots: PropTypes.array,
}

GameScreenshotCarousel.defaultProps = {
  screenshots: [],
}
