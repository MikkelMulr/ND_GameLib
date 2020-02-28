import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Header from './components/header/Header.component';
import Home from './pages/home/Home.component';
import Game from './pages/game/Game.component';
import axios from 'axios';

// https://api-v3.igdb.com
// api key 2eb22685103f241e827ecc8d80a37538

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			trends: []
		};
		this.proxy = 'https://cors-anywhere.herokuapp.com/';
	}

	// getSearch = (searchTerm) => {
	// 	axios({
	// 		url: `${this.proxy}https://api-v3.igdb.com/games/`,
	// 		method: 'POST',
	// 		headers: {
	// 			Accept: 'application/json',
	// 			'user-key': '2eb22685103f241e827ecc8d80a37538'
	// 		},
	// 		data: `fields *; search "${searchTerm}";`
	// 	})
	// 		.then((response) => {
	// 			console.log(response.data);
	// 			return response.data;
	// 		})
	// 		.catch((err) => {
	// 			console.error(err);
	// 		});
	// };

	render() {
		return (
			<div className='App'>
				<Header />
				<Switch>
					<Route exact path='/' render={(props) => <Home {...props} search={this.getSearch} />} />

					<Route path='/game/:id' render={(props) => <Game {...props} />} />
					{/* <Route path='/404' render={(props) => <Game {...props} />} /> */}
				</Switch>
			</div>
		);
	}
}

export default App;
