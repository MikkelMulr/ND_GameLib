import React, { Component } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './Game.styles.scss';

export class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			resp: {},
			img: ''
		};
		this.proxy = 'https://cors-anywhere.herokuapp.com/';
		this.newProps = this.props.location.state; // gets information passed in from link on homepage
	}

	componentDidMount = () => {
		if (!this.props.location.state) {
			axios({
				url: `${this.proxy}https://api-v3.igdb.com/games/`,
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'user-key': '2eb22685103f241e827ecc8d80a37538'
				},
				data: `fields *; where id = ${this.props.match.params.id};`
			})
				.then((response) => {
					axios({
						url: `${this.proxy}https://api-v3.igdb.com/covers/`,
						method: 'POST',
						headers: {
							Accept: 'application/json',
							'user-key': '2eb22685103f241e827ecc8d80a37538'
						},
						data: `where id = ${response.data[0].cover}; fields *;`
					})
						.then((res) => {
							console.log(response.data);
							this.setState({
								resp: response.data[0],
								img: `https://images.igdb.com/igdb/image/upload/t_cover_big/${res.data[0].image_id}.jpg`
							});
						})
						.catch((err) => {
							console.error(err);
						});
				})
				.catch((err) => {
					console.error(err);
				});
		} else {
			this.setState({
				resp: { name: this.newProps.name, id: this.newProps.gameID },
				img: this.newProps.img
			});
		}
	};

	render() {
		return (
			<div className='Game'>
				<header className='Game--header'>
					<h2>{this.state.resp.name}</h2>
				</header>
				<main className='Game--main'>
					<div className='Game--main--cover'>
						<img className='Game--main--cover--img' src={this.state.img} alt='cover of game' />
					</div>
				</main>
			</div>
		);
	}
}

export default Game;
