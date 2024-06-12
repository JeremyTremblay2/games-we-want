import { useParams } from "react-router-dom"
import useGameDetailData from "../../hooks/useGameDetailData"
import View from "./View.jsx"
import { useIsLoading } from "../LoadingContext"

const GameDetails = () => {
  let { gameId } = useParams()
  const { game, isLoading } = useGameDetailData(gameId)
  const { setIsLoading } = useIsLoading()

  setIsLoading(isLoading)

  return <>{!isLoading && <View game={game} />}</>
}

export default GameDetails
