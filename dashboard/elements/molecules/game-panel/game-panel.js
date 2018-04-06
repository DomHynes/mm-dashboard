(function () {
	class GamePanel extends Polymer.Element {
		static get is() {
			return 'game-panel';
		}

		static get properties() {
			return {
				gameData: {
					type: Array
				},
				game: {
					type: Number,
					notify: true
				},
				event: {
					type: Number,
					notify: true
				},
				players: {
					type: Object,
					notify: true
				}
			};
		}

		static get observers() {
			return [
				'checkEvent(game, gameData, event)'
			];
		}

		checkEvent(game, gameData, event) {
			const ready = game !== undefined && gameData !== undefined && event !== undefined;
			if (ready && gameData[game].events.length <= event) {
				this.event = 0;
			} else if (ready) {
				this.players.forEach((team, index) => {
					while (team.length < gameData[game].events[event].players) {
						this.push(['players', index], ({
							characterIndex: 0,
							colourIndex: 0,
							name: 'Player',
							sponsored: {},
							region: {}
						}));
					}
					while (team.length > gameData[game].events[event].players) {
						this.pop(['players', index]);
					}
				});
			}
		}

		_getEvents(gameData, game) {
			if (gameData && game >= 0) {
				return gameData[game].events;
			}
		}
	}

	customElements.define(GamePanel.is, GamePanel);
})();
