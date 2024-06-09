import useGameGeneralData from "../../hooks/useGameGeneralData.js";

import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import CircularProgress from "@mui/material/CircularProgress";

import View from "./View.jsx";

const GameCards = () => {
  const { topGames, isLoading } = useGameGeneralData();

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "160px",
          }}
        >
          <CircularProgress size={100} />
          <p style={{ fontStyle: "italic", color: "lightgray" }}>
            We are putting the games into slots, please wait...
          </p>
        </Box>
      ) : (
        <View topGames={topGames} />
      )}
    </>
  );
};

export default GameCards;
