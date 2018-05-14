(function () {
	const gameData = nodecg.Replicant('gameData');
	const selectedGame = nodecg.Replicant('selectedGame');
	const sponsorImages = nodecg.Replicant('assets:sponsors');
	const regionImages = nodecg.Replicant('assets:regions');
	const setinfo = nodecg.Replicant('set-info');
	const playerDB = nodecg.Replicant('playerDB');

	class PlayersPanel extends Polymer.Element {
		static get is() {
			return 'players-panel';
		}

		static get properties() {
			return {
				setinfo: {
					type: Object,
					value() {
						return {};
					},
					players: {
						type: Array,
						items: {
							type: Array
						}
					},
					scores: {
						type: Array,
						items: {
							type: Number
						}
					},
					bracketPlace: {
						type: String,
						value: ''
					},
					tournament: {
						type: Object,
						value() {
							return {};
						}
					},
					game: {
						type: Object,
						value() {
							return {};
						}
					},
					event: {
						type: Number
					},
					video: {
						type: Object,
						value() {
							return {};
						}
					}
				},
				gameIndex: {
					type: Number,
					value: 0,
					observer: '_gameIndexChange'
				},
				sponsorImages: {
					type: Array
				},
				regionImages: {
					type: Array
				},
				observers: [
					'_gameChange(setinfo.game)'
				]
			};
		}

		static get observers() {
			return [
				'_eventChange(setinfo.event)'
			];
		}

		_gameChange(a) {
			this.gameIndex = gameData.value.findIndex(game => game._id === this.setinfo.game._id);
		}

		_eventChange(e) {
			console.log(e);
		}

		_gameIndexChange(a) {
			if (a >= 0) {
				this.setinfo.game = a;
			}
		}

		deleteSet() {
			this.setinfo.players.forEach((team, teamIndex) => {
				team.forEach((player, playerIndex) => {
					this.set(`setinfo.players.${teamIndex}.${playerIndex}.name`, '');
					this.set(`setinfo.players.${teamIndex}.${playerIndex}.characterIndex`, 0);
					if (player.colourIndex) {
						this.set(`setinfo.players.${teamIndex}.${playerIndex}.colourIndex`, 0);
					}
				});
			});
			this.setinfo.scores.forEach((score, scoreIndex) => {
				this.set(`setinfo.scores.${scoreIndex}`, 0);
			});
		}

		editSet() {
			selectedGame.value = this.selectedIndex;

			nodecg.sendMessage('db:setDoc', this.setinfo)
				.then(resp => {
					setinfo.value = Object.assign(this.setinfo, {
						_rev: resp.rev
					});
				})
				.catch(err => {
					console.log(err);
				});
		}

		addSet() {
			this.setinfo._id = null;
			this.setinfo._rev = null;
			this.setinfo.video.uploaded = 0;
			nodecg.sendMessage('db:addDoc', {
				doc: this.setinfo,
				type: 'set'
			}).then(resp => {
				console.log(resp);
				setinfo.value = Object.assign(this.setinfo, {
					_id: resp.id,
					_rev: resp.rev
				});
			}).catch(err => {
				console.log(err);
			});
		}

		swapPlayers() {
			const p1 = _.cloneDeep(this.setinfo.players[0]);
			const p2 = _.cloneDeep(this.setinfo.players[1]);

			console.log(p1, p2);
			this.set('setinfo.players.0', p2);
			this.set('setinfo.players.1', p1);

			const tempscore = this.setinfo.scores[0];
			this.set('setinfo.scores.0', this.setinfo.scores[1]);
			this.set('setinfo.scores.1', tempscore);
		}

		ready() {
			super.ready();

			setinfo.on('change', newData => {
				this.set('setinfo', _.cloneDeep(newData));
				console.log(newData);
			});
			sponsorImages.on('change', newData => {
				this.set('sponsorImages', newData);
			});
			regionImages.on('change', newData => {
				this.set('regionImages', newData);
				console.log(newData);
			});
			playerDB.on('change', newData => {
				this.playerDB = newData;
			});
			selectedGame.on('change', selectedGame => {
				this.selectedIndex = selectedGame;
				this.selectedGame = this.gameData[selectedGame];
			});
			gameData.on('change', gameData => {
				this.gameData = gameData;
			});
		}
	}

	customElements.define(PlayersPanel.is, PlayersPanel);
})();
