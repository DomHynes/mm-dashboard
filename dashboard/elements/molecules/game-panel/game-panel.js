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
			console.log(gameData[game].events.length, event);
			if (ready && gameData[game].events.length <= event) {
				this.event = 0;
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
