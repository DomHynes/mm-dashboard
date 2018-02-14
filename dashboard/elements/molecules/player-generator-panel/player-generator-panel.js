(function () {
	const playerDB = nodecg.Replicant('playerDB');

	class PlayerGeneratorPanel extends Polymer.Element {
		static get is() {
			return 'player-generator-panel';
		}

		static get properties() {
			return {
				player: {
					type: Object,
					value() {
						return {};
					}
				}
			};
		}

		insertPlayer() {
			console.log(this.player);
			playerDB.value.push(this.player);
		}

		ready() {
			super.ready();

			playerDB.on('change', players => {
				this.players = players;
			});
		}
	}

	customElements.define(PlayerGeneratorPanel.is, PlayerGeneratorPanel);
})();
