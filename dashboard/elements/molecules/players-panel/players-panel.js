(function () {
	const gameData = nodecg.Replicant('gameData');
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
					}

				}
			};
		}

		savePlayers() {
			setinfo.value = this.setinfo;
		}

		swapPlayers() {
			const p1 = _.cloneDeep(this.setinfo.players[0]);
			const p2 = _.cloneDeep(this.setinfo.players[1]);
			this.set('setinfo.players.0', p2);
			this.set('setinfo.players.1', p1);

			const tempscore = this.setinfo.scores[0];
			this.set('setinfo.scores.0', this.setinfo.scores[1]);
			this.set('setinfo.scores.1', tempscore);
		}

		ready() {
			super.ready();

			setinfo.on('change', newData => {
				console.log(newData);
				const data = _.cloneDeep(newData);
				this.setinfo = data;
			});
			gameData.on('change', newData => {
				this.selectedGame = newData[0];
			});
			sponsorImages.on('change', newData => {
				this.sponsorImages = newData;
			});
			regionImages.on('change', newData => {
				this.regionImages = newData;
			});
			playerDB.on('change', newData => {
				this.playerDB = newData;
			});
		}
	}

	customElements.define(PlayersPanel.is, PlayersPanel);
})();
