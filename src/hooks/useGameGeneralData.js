import { useEffect, useState } from 'react'
import { API_TOP_10_GAMES_URL, API_SCREENSHOTS_URL, API_BASE_URL } from '../utils/constants'
import game_image from '../assets/images/game_image_placeholder.png'
import moment from 'moment'

const useWeather = () => {
	const [topGames, setTopGames] = useState([])

	useEffect(() => {
		async function getData() {
			// API call
			const result = await fetch(
				`${API_BASE_URL}${API_TOP_10_GAMES_URL}?pageSize=10&page=1`
			)

			if (!result.ok) {
				throw 'There was a problem while collecting data, please retry.'
			}

			const data = await result.json()

			// Formattage
			const gamesList = [];
			for (let i = 0; i < data.length; i++) {
				let image
				const screenshot = await fetch(
					`${API_BASE_URL}${API_SCREENSHOTS_URL}/${data[i].id}`
				)
				console.log(screenshot)
				console.log(`${API_BASE_URL}${API_SCREENSHOTS_URL}/${data[i].id}`)
				if (screenshot.ok && screenshot.status === 200) {
					image = (await screenshot.json())[0].url
				}
				if (!image) {
					image = game_image
				}
				gamesList.push({
					image: image,
                    firstReleaseDate: moment(data[i].firstReleaseDate).format('L'),
                    name: data[i].name
				})
			}

			setTopGames(gamesList)
		}

		getData()
	}, [])

	return topGames
}

export default useWeather