import React from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';
// import Game from '../../pages/game/Game.component';
import './GameCard.styles.scss';

export default function GameCard({ name, gameID, coverID, cover }) {
	return (
		<div
			className='GameCard'
			style={{ backgroundImage: `url(https://images.igdb.com/igdb/image/upload/t_cover_big/${cover}.jpg)` }}
		>
			<Link
				to={{
					pathname: `/game/${gameID}`,
					state: {
						gameID: gameID,
						name: name,
						img: `https://images.igdb.com/igdb/image/upload/t_cover_big/${cover}.jpg`
					}
				}}
			>
				<div className='GameCard--link'>
					<h2>{name}</h2>
				</div>
			</Link>
		</div>
	);
}
