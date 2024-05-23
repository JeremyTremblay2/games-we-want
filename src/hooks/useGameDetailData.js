import { useEffect, useState } from 'react'
import { API_BASE_URL, API_GAME_DETAIL, API_SCREENSHOTS_URL } from '../utils/constants'

const useGameDetailData = (gameId) => {
    const [game, setGame] = useState(null)
    useEffect(() => {
        async function getData() {
            const result = await fetch(
                `${API_BASE_URL}${API_GAME_DETAIL}/${gameId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                    }
                }
            )

            if (!result.ok) {
				throw 'There was a problem while collecting data, please retry.'
			}

            const data = await result.json()

            const imageResults = await fetch(
                `${API_BASE_URL}${API_SCREENSHOTS_URL}/${gameId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                    }
                }
            )

            if (!imageResults.ok) {
                throw 'There was a problem while collecting data, please retry.'
            }

            const imageResultsData = await imageResults.json()

            const screenshots = imageResultsData.map((screenshot) => {
                return screenshot.url
            })

            const game = {
                name: data.name,
                description: data.summary,
                screenshots: screenshots
            }
            console.log(game)
            setGame(game)
        }

        getData()
    }, [gameId])
    return game
}

export default useGameDetailData