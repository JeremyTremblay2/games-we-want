import { useEffect, useState } from "react";
import { API_BASE_URL, API_COVER_URL } from "../utils/constants";
import placeholderImage from "../assets/images/game_image_placeholder.png";

const useGameCoverImage = ({ gameId }) => {
  const [gameCoverImage, setGameCoverImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!gameId) return;
    async function getData() {
      let image = null;

      try {
        const screenshot = await fetch(
          `${API_BASE_URL}${API_COVER_URL}/${gameId}`
        );

        if (screenshot.ok || screenshot.status === 200) {
          image = (await screenshot.json())?.[0]?.url;
        }
      } catch (error) {
        console.warn("Failed to get image cover for the game", gameId);
      }
      if (!image) {
        image = placeholderImage;
      }

      setGameCoverImage(image);
    }

    setIsLoading(true);

    getData().then(() => setIsLoading(false));
  }, []);

  return { image: gameCoverImage, isLoading };
};

export default useGameCoverImage;
