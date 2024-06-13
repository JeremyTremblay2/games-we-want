import GameCard from "../GameCard"
import PropTypes from "prop-types"

const GameCardsLoading = ({ itemNumber = 0 }) => {
  return (
    <div className="cards-list" data-testid="cards-list">
      {[...Array(itemNumber)].map((_, index) => (
        <GameCard key={index} isLoading />
      ))}
    </div>
  )
}

GameCardsLoading.propTypes = {
  itemNumber: PropTypes.number,
}

export default GameCardsLoading
