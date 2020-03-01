import React from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';
// import Game from '../../pages/game/Game.component';
import './GameCard.styles.scss';

export default function GameCard({
	name,
	gameID,
	cover,
	summary,
	companies,
	platform,
	release,
	screenshots,
	similar_games,
	videos
}) {
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
						img: `https://images.igdb.com/igdb/image/upload/t_cover_big/${cover}.jpg`,
						summary: summary,
						playform: platform,
						companies: companies,
						release: release,
						screenshots: screenshots,
						similar_games: similar_games,
						videos: videos
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
