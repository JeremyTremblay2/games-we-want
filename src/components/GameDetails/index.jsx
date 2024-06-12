import { useParams } from "react-router-dom"
import useGameDetailData from "../../hooks/useGameDetailData.js"
import LinearProgress from "@mui/material/LinearProgress"
import View from "./View.jsx"
import { useIsLoading } from "../LoadingContext/index.jsx"
import { useEffect } from "react"

const GameDetails = () => {
  let { gameId } = useParams()
  const { game, isLoading } = useGameDetailData(gameId)
  const { setIsLoading } = useIsLoading()

  setIsLoading(isLoading)

  return <>{!isLoading && <View game={game} />}</>
}

export default GameDetails
