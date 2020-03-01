import React, { Component } from 'react';
import './Home.styles.scss';
import axios from 'axios';
import GameCard from '../../components/gamecard/GameCard.component';

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchTerm: '',
			trends: [],
			trending: [],
			resultData: [],
			results: []
		};

		this.proxy = 'https://cors-anywhere.herokuapp.com/';
	}

	componentDidMount() {
		if (localStorage.getItem('trending') === null) {
			axios({
				url: `${this.proxy}https://api-v3.igdb.com/games/`,
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'user-key': '2eb22685103f241e827ecc8d80a37538'
				},
				data: `fields *; sort popularity desc;`
			})
				.then((res) => {
					console.log(res.data);
					for (let i = 0; i <= 4; i++) {
						axios({
							url: `${this.proxy}https://api-v3.igdb.com/covers/`,
							method: 'POST',
							headers: {
								Accept: 'application/json',
								'user-key': '2eb22685103f241e827ecc8d80a37538'
							},
							data: `where id = ${res.data[i].cover}; fields *;`
						})
							.then((response) => {
								console.log(response.data);
								this.setState({
									trending: [
										...this.state.trending,
										<GameCard
											name={res.data[i].name}
											coverID={res.data[i].cover}
											gameID={res.data[i].id}
											key={res.data[i].id}
											cover={response.data[0].image_id}
											summary={res.data[i].summary}
											companies={res.data[i].involved_companies}
											platform={res.data[i].platform}
											release={res.data[i].release_dates}
											screenshots={res.data[i].screenshots}
											similar_games={res.data[i].similar_games}
											videos={res.data[i].videos}
										/>
									]
								});
								localStorage.setItem('trending', JSON.stringify(this.state.trending));
								// console.log(this.state.trending);
							})
							.catch((err) => {
								console.error(err);
							});
					}
				})
				.catch((err) => {
					console.error(err);
				});
		} else {
			// localStorage.getItem("trending")
			let data = JSON.parse(localStorage.getItem('trending'));
			let localData = data.map((item) => {
				return (
					<GameCard
						name={item.props.name}
						coverID={item.props.coverID}
						gameID={item.props.gameID}
						key={item.props.gameID}
						cover={item.props.cover}
						summary={item.props.summary}
						companies={item.props.companies}
						platform={item.props.platform}
						release={item.props.release}
						screenshots={item.props.screenshots}
						similar_games={item.props.similar_games}
						videos={item.props.videos}
					/>
				);
			});

			this.setState({ trending: localData });
		}
	}

	handleSearch = (e) => {
		e.preventDefault();
		this.setState({ results: [] });

		axios({
			url: `${this.proxy}https://api-v3.igdb.com/games/`,
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'user-key': '2eb22685103f241e827ecc8d80a37538'
			},
			data: `fields *; search "${this.state.searchTerm}";`
		})
			.then((response) => {
				console.log(response.data);
				console.log(response);
				// this.makeResults(response.data);
				response.data.forEach((res) => {
					axios({
						url: `${this.proxy}https://api-v3.igdb.com/covers/`,
						method: 'POST',
						headers: {
							Accept: 'application/json',
							'user-key': '2eb22685103f241e827ecc8d80a37538'
						},
						data: `where id = ${res.cover}; fields *;`
					})
						.then((response) => {
							// console.log(response.data);
							this.setState({
								results: [
									...this.state.results,

									<GameCard
										name={res.name}
										coverID={res.cover}
										gameID={res.id}
										key={res.id}
										cover={response.data[0].image_id}
										summary={res.summary}
										companies={res.involved_companies}
										platform={res.platform}
										release={res.release_dates}
										screenshots={res.screenshots}
										similar_games={res.similar_games}
										videos={res.videos}
									/>
								]
							});
						})
						.catch((err) => {
							console.error(err);
						});
				});
			})
			.catch((err) => {
				console.error(err);
			});
	};

	render() {
		return (
			<div className='Home'>
				<header className='Home--header'>
					<h1>NeverDusty</h1>
					<h2>Games Library</h2>

					<h4> Find the kind of games you want to play, fast and ez</h4>
					<div className='Home--search-area'>
						<input
							type='text'
							name='search'
							id='search-input'
							className='text-input'
							placeholder='search games...'
							onChange={(e) => this.setState({ searchTerm: e.target.value })}
						/>
						<button className='search-btn' onClick={(e) => this.handleSearch(e)}>
							Search
						</button>
					</div>
				</header>

				<section className='Home--results'>{this.state.results}</section>
				<h2>Popular Titles</h2>
				<section className='Home--trending'>{this.state.trending}</section>
			</div>
		);
	}
}

export default Home;
