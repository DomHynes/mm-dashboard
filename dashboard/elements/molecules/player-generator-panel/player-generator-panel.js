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
			playerDB.value.push(this.player);
		}

		_editPlayer(e) {
			this.player = e.model.item;
			this.$.editModal.open();
		}

		ready() {
			super.ready();

			playerDB.on('change', playerDB => {
				this.playerDB = playerDB;
				this.$.grid.clearCache();
			});
		}
	}

	customElements.define(PlayerGeneratorPanel.is, PlayerGeneratorPanel);
})();
