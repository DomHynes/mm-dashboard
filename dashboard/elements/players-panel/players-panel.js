(function() {
	const playerinfo = nodecg.Replicant('playerinfo', {
		defaultValue: {
			p1: {
				name: "asdf",
				characterIndex: 4,
				colourIndex: 2
			},
			p2: {
				name: "",
				characterIndex: 2,
				colourIndex: 2
			},
			scores: [ 0, 0 ]
		},
		persistent: false,
	});


	const gameData = nodecg.Replicant('gameData');

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

		ready() {
			super.ready();
			playerinfo.on('change', newData => {
				this.playerdata = _.cloneDeep(newData);
			});
			gameData.on('change', newData => {
				this.selectedGame = newData[0];
			})
		}
	}

	customElements.define(PlayersPanel.is, PlayersPanel);
})();
