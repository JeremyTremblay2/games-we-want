import useGameGeneralData from "../../hooks/useGameGeneralData.js";
import View from "./View.jsx";
import GameCardsLoading from "./GameCardsLoading.jsx";
import { SearchContext } from "../SearchContext";
import "./index.css";
import { useContext, useEffect } from "react";
import useSearchGames from "../../hooks/useSearchGames.js";

const GameCards = () => {
  const { topGames, isLoading } = useGameGeneralData();
  const { searchTerm, isSearching, setIsSearching } = useContext(SearchContext);
  useEffect(() =>
    console.log(
      data,
      isLoading,
      isLoadingSearch,
      searchTerm,
      isSearching,
      setIsSearching
    )
  );
  const { data, isLoading: isLoadingSearch } = useSearchGames({
    searchTerm,
    isSearching,
    setIsSearching,
  });

  return (
    <>
      {isLoading || isLoadingSearch ? (
        <GameCardsLoading itemNumber={10} />
      ) : searchTerm && searchTerm.trim() !== "" && data ? (
        <View gamesList={data} isLoading={isLoadingSearch} />
      ) : (
        <View gamesList={topGames} isLoading={isLoading} />
      )}
    </>
  );
};

export default GameCards;
