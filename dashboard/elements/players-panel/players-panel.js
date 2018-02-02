(function () {
	const gameData = nodecg.Replicant('gameData');
	const sponsorImages = nodecg.Replicant('assets:sponsors');
	const regionImages = nodecg.Replicant('assets:regions');
	const setinfo = nodecg.Replicant('set-info');

	class PlayersPanel extends Polymer.Element {
		static get is() {
			return 'players-panel';
		}

		static get properties() {
			return {
				playerdata: {
					type: Object
				}
			};
		}

		savePlayers() {
			setinfo.value = this.playerdata;
		}

		swapPlayers() {
			const p1 = _.cloneDeep(this.setinfo.p1);
			const p2 = _.cloneDeep(this.setinfo.p2);
			const tempscore = this.playerdata.scores[0];
			this.set('playerdata.p1', p2);
			this.set('playerdata.p2', p1);
			this.set('playerdata.scores.0', this.setinfo.scores[1]);
			this.set('playerdata.scores.1', tempscore);
		}

		ready() {
			super.ready();
			setinfo.on('change', newData => {
				this.setinfo = _.cloneDeep(newData);
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
		}
	}

	customElements.define(PlayersPanel.is, PlayersPanel);
})();
