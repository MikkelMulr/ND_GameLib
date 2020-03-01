import React, { Component } from 'react';
// import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './Game.styles.scss';

export class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			resp: {},
			img: '',
			release: ''
		};
		this.proxy = 'https://cors-anywhere.herokuapp.com/';
		this.newProps = this.props.location.state; // gets information passed in from link on homepage
	}

	componentDidMount = () => {
		console.log(this.newProps);
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
					this.setState({ resp: response.data });
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

	getReleaseDate = () => {
		axios({
			url: `${this.proxy}https://api-v3.igdb.com/release_dates/`,
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'user-key': '2eb22685103f241e827ecc8d80a37538'
			},
			data: `fields *; where game = ${this.props.match.params.id};`
		})
			.then((response) => {
				console.log(response);
				// this.setState({ release: response.data[0].human });
			})
			.catch((err) => {
				console.error(err);
			});
	};

	render() {
		this.getReleaseDate();
		return (
			<div className='Game'>
				<header className='Game--header' />
				<main className='Game--main'>
					<div className='Game--main--cover'>
						<img className='Game--main--cover--img' src={this.state.img} alt='cover of game' />
					</div>
					<section className='Game--main--details'>
						<ul>
							<li className='Game--main--details--title'>{this.newProps.name}</li>
							<li className='Game--main--details--company'>Summary: {this.newProps.summary}</li>
							<li className='Game--main--details--release'>Release Date: {this.state.release}</li>
							<li className='Game--main--details--company'>Company: {this.newProps.companies}</li>
						</ul>
					</section>
				</main>
			</div>
		);
	}
}

export default Game;
