import React from 'react';
import { Link } from 'react-router-dom';
import './Header.styles.scss';

export default function Header() {
	return (
		<div className='Header'>
			<Link to='/'>
				<h2>ND</h2>
			</Link>
		</div>
	);
}
