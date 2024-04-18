import PropTypes from 'prop-types'
import GameCard from '../GameCard';
import './index.css';

const View = ({ topGames }) => {
    const rows = [];
    for (let i = 0; i < topGames.length; i += 2) {
        const games = topGames.slice(i, i + 2);
        rows.push(
            <div className="row" key={i}>
                {games.map((game, index) => (
                    <GameCard game={game} key={index} />
                ))}
            </div>
        );
    }

    return (
        <div className="container">
            {rows}
        </div>
    )
}

export default View

View.propTypes = { 
    topGames: PropTypes.arrayOf(PropTypes.object)
}

View.defaultProps = {
    topGames: []
}