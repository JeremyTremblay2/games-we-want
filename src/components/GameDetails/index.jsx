import { useParams } from "react-router-dom";
import useGameDetailData from "../../hooks/useGameDetailData.js";
import LinearProgress from "@mui/material/LinearProgress";

import View from "./View.jsx";

const GameDetails = () => {
  let { gameId } = useParams();

  const { game, isLoading } = useGameDetailData(gameId);

  return (
    <>
      {isLoading ? (
          <LinearProgress style={{ marginTop: "-20px", width: "100%" }} />
      ) : (
        <View game={game} />
      )}
    </>
  );
};

export default GameDetails;
