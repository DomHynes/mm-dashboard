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
				}
			};
		}
	}

	customElements.define(GamePanel.is, GamePanel);
})();
