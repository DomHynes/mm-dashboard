(function () {
	const gameData = nodecg.Replicant('gameData');

	class GamePanel extends Polymer.Element {
		static get is() {
			return 'game-panel';
		}

		static get properties() {
			return {
				gameData: {
					type: Array
				}
			};
		}

		ready() {
			gameData.on('change', newData => {
				this.gameData = newData;
			});
		}
	}

	customElements.define(GamePanel.is, GamePanel);
})();
