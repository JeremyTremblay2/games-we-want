import PropTypes from "prop-types";
import CenterSlider from "../CenterSlider";

import "./index.css";

const View = ({ game }) => {
  return (
    <div>
      {game && (
        <div>
          <h1>{game.name}</h1>
          <p>{game.description}</p>
          <div>
            {game.screenshots && game.screenshots.length > 0 && (
              <CenterSlider>
                {game.screenshots?.map((screenshot, index) => (
                  <img
                    key={index}
                    src={screenshot}
                    alt={`Screenshot ${index + 1}`}
                  />
                ))}
              </CenterSlider>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default View;

View.propTypes = {
  game: PropTypes.object,
};

View.defaultProps = {
  game: {
    name: "",
    description: "",
    screenshots: [],
  },
};
