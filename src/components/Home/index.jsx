import GameCards from "../GameCards"
import useGameGeneralData from "../../hooks/useGameGeneralData.js"
import GameCardsLoading from "../GameCards"
import "./index.css"

import "./index.css"

const Home = () => {
  const { topGames, isLoading } = useGameGeneralData()

  return (
    <>
      <h1>Top Games</h1>
      <p>Here you can find the best top 10 games of all time!</p>
      <GameCards />
      {isLoading ? (
        <GameCardsLoading itemNumber={10} />
      ) : (
        <GameCards gamesList={topGames} isLoading={isLoading} />
      )}
    </>
  )
}

export default Home
