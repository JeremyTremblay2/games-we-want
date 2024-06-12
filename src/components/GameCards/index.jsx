import useGameGeneralData from "../../hooks/useGameGeneralData.js"
import View from "./View.jsx"
import GameCardsLoading from "./GameCardsLoading.jsx"
import './index.css'

const GameCards = () => {
  const { topGames, isLoading } = useGameGeneralData()

  return (
    <>
      {isLoading ? (
        <GameCardsLoading itemNumber={10} />
      ) : (
        <View gamesList={topGames} isLoading={isLoading} />
      )}
    </>
  )
}

export default GameCards
