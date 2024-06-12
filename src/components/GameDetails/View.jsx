import PropTypes from "prop-types"
import CenterSlider from "../CenterSlider"

import "./index.css"

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
  },
}
