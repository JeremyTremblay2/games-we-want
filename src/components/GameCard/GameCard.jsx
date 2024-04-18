import PropTypes from 'prop-types'

const GameCard = ({ game }) => {
    return (
        <div className="game-card">
            <img src={game.image} alt={game.name} />
            <h3>{game.name}</h3>
            <p>{game.firstReleaseDate}</p>
        </div>
    )
}

export default GameCard

GameCard.propTypes = { 
    game: PropTypes.object
}

GameCard.defaultProps = {
    game: {}
}