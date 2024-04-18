import { useEffect, useState } from 'react'
import { API_GAMES_TOP_10 } from '../Constants'

const useWeather = () => {
	const [topGames, setTopGames] = useState([])

	useEffect(() => {
		async function getData() {
			// API call
			const result = await fetch(
				API_GAMES_TOP_10
			);

			if (!result.ok) {
				throw 'There was a problem while collecting data, please retry.';
			}

			const data = await result.json();

			// Formattage
			const gamesList = [];
			for (let i = 0; i < data.length; i++) {
				gamesList.push({
					image: null,
                    firstReleaseDate: data[i].firstReleaseDate,
                    name: data[i].name
				})
			}

			setTopGames(gamesList);
		}

		getData()
	}, [])

	return topGames;
}

export default useWeather