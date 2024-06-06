import PropTypes from 'prop-types'
import GameCard from '../GameCard'
import './index.css'

const View = ({ gamesList, isLoading }) => {
  return (
    <div className="cards-list">
      {gamesList.map((game) => (
        <GameCard key={game.id} game={game} isLoading={isLoading} />
      ))}
    </div>
  )
}

export default View

View.propTypes = {
  gamesList: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool
}

View.defaultProps = {
  gamesList: [],
  isLoading: false
}