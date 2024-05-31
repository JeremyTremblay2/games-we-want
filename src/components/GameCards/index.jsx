import useGameGeneralData from "../../hooks/useGameGeneralData.js"
import View from "./View.jsx"

const GameCards = () => {
  const { topGames, isLoading } = useGameGeneralData()

  return (
    <>
      <View gamesList={topGames} isLoading={isLoading} />
    </>
  )
}

export default GameCards
