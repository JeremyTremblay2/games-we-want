import useGameGeneralData from '../../hooks/useGameGeneralData.js'

import View from './view.jsx'

const GameCards = () => {
	const topGames = useGameGeneralData();

	return (
		<View
			topGames={topGames}
		/>
	)
}

export default GameCards