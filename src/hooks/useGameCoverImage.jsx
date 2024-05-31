import { useEffect, useState } from 'react'
import { API_BASE_URL, API_COVER_URL } from '../utils/constants'
import placeholderImage from '../assets/images/game_image_placeholder.png'
import moment from 'moment'

const useGameCoverImage = ({ gameId }) => {
  const [gameCoverImage, setGameCoverImage] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getData() {

      let image = null
      const screenshot = await fetch(
        `${API_BASE_URL}${API_COVER_URL}/${gameId}`
      )

      console.log("screenshot", screenshot)

      if (screenshot.ok || screenshot.status === 200) {
        image = (await screenshot.json())?.[0]?.url
        console.log("image", image)
      }
      if (!image) {
        image = placeholderImage
      }

      setGameCoverImage(image)
    }

    setIsLoading(true)

    getData().then(() => setIsLoading(false))
  }, [])

  return { image: gameCoverImage, isLoading }
}

export default useGameCoverImage