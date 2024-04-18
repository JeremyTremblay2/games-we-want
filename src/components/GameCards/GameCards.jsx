import useGameGeneralData from '../../hooks/useGameGeneralData.js';

import View from './view.jsx';

const GameCards = () => {
	const topGame = useGameGeneralData();

	return (
		<View
			topGame={topGame}
		/>
	);
}

export default GameCards