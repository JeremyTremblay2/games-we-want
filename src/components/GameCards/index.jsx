import useGameGeneralData from '../../hooks/useGameGeneralData.js'

import View from './View.jsx'

const GameCards = () => {
	const topGames = useGameGeneralData();

	return (
		<View
			topGames={topGames}
		/>
	)
}

export default GameCards