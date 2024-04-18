import { useEffect, useState } from 'react'
import { API_TOP_10_GAMES_URL } from '../utils/constants'
import moment from 'moment'

const useWeather = () => {
	const [topGames, setTopGames] = useState([])

	useEffect(() => {
		async function getData() {
			// API call
			const result = await fetch(
				API_TOP_10_GAMES_URL
			)

			if (!result.ok) {
				throw 'There was a problem while collecting data, please retry.'
			}

			const data = await result.json()
			console.log(data)

			// Formattage
			const gamesList = [];
			for (let i = 0; i < data.length; i++) {
				gamesList.push({
					image: 'https://cdn.akamai.steamstatic.com/steam/apps/413150/capsule_616x353.jpg',
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