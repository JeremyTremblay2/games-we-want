import PropTypes from 'prop-types'
import GameCard from '../GameCard';
import './index.css';

const View = ({ topGames }) => {
    return (
        <div className="container">
            <div className="row">
                {topGames.map((game) => (
                    <div className="col" key={game.id}>
                        <GameCard game={game} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default View

View.propTypes = { 
    topGames: PropTypes.arrayOf(PropTypes.object)
}

View.defaultProps = {
    topGames: []
}