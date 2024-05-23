import { useParams } from "react-router-dom";
import { useState } from "react";
import useGameDetailData from "../../hooks/useGameDetailData.js";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import CircularProgress from "@mui/material/CircularProgress";

import View from "./View.jsx";

const GameDetails = () => {
  let { gameId } = useParams();

  const { game, isLoading } = useGameDetailData(gameId);

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <View game={game} />
      )}
    </>
  );
};

export default GameDetails;
