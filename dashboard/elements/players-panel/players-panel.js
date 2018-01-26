(function() {
	const playerinfo = nodecg.Replicant('playerinfo', {
		defaultValue: {
			p1: {
				name: "asdf",
				characterIndex: 4,
				colourIndex: 2,
				sponsorRegion: null,
				sponsorRegionImage: null
			},
			p2: {
				name: "",
				characterIndex: 2,
				colourIndex: 2
			},
			scores: [ 0, 0 ]
		},
		persistent: false
	});

	const gameData = nodecg.Replicant('gameData');
	const sponsorImages = nodecg.Replicant('assets:sponsors');
	const regionImages = nodecg.Replicant('assets:regions');

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
			playerinfo.value = this.playerdata;
		}

		swapPlayers() {
			const p1 = _.cloneDeep(this.playerdata.p1);
			const p2 = _.cloneDeep(this.playerdata.p2);
			const tempscore = this.playerdata.scores[0];
			this.set('playerdata.p1', p2);
			this.set('playerdata.p2', p1);
			this.set('playerdata.scores.0', this.playerdata.scores[1]);
			this.set('playerdata.scores.1', tempscore);
		}

		ready() {
			super.ready();
			playerinfo.on('change', newData => {
				this.playerdata = _.cloneDeep(newData);
			});
			gameData.on('change', newData => {
				this.selectedGame = newData[0];
			});
			sponsorImages.on('change', newData => this.sponsorImages = newData);
			regionImages.on('change', newData => this.regionImages = newData);
		}
	}

	customElements.define(PlayersPanel.is, PlayersPanel);
})();
