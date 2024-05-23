import PropTypes from 'prop-types'
import CenterSlider from '../CenterSlider'

import './index.css'

const View = ({ game }) => {
    console.log(game);
    return(
        <div>
            {game && (
                <div>
                    <h1>{game.name}</h1>
                    <p>{game.description}</p>
                    <div>
                        {game.screenshots && game.screenshots.length > 0 && (
                            <CenterSlider>
                                {game.screenshots.map((screenshot, index) => (
                                    <img key={index} src={screenshot} alt={`Screenshot ${index + 1}`} />
                                ))}
                            </CenterSlider>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default View

View.propTypes = { 
    game: PropTypes.object
}

View.defaultProps = {
    game: {
        name: 'A random game',
        description: 'This is a description of a random game.',
        screenshots: ['https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Frandom&psig=AOvVaw0uBJnF6-c7atYke8rWWR3M&ust=1716541589197000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPCd-u61o4YDFQAAAAAdAAAAABAE']
    }
}