import GameCard from "../GameCard"
import PropTypes from "prop-types"


const GameCardsLoading = ({ itemNumber }) => {
  return (
    <div className="cards-list">
      {[...Array(itemNumber)].map((_, index) => (
        <GameCard key={index} isLoading />
      ))}
    </div>
  )
}

GameCardsLoading.defaultProps = {
  itemNumber: 10
}

GameCardsLoading.propTypes = {
  itemNumber: PropTypes.number
}

export default GameCardsLoading

