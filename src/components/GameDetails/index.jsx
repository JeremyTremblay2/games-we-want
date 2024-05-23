import { useParams } from 'react-router-dom';
import useGameDetailData from '../../hooks/useGameDetailData.js';

import View from './View.jsx'

const GameDetails = () => {
    let { gameId } = useParams()
    const game = useGameDetailData(gameId)
    
    return (
        <View
			game={game}
		/>
    );
}

export default GameDetails