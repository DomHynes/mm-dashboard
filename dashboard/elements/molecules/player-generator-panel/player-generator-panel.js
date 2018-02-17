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
			this.player = {index: e.model.index, player:_.cloneDeep(e.model.item)};
			this.$.editModal.open();
		}

		saveEditedPlayer() {
			playerDB.value[this.player.index] = this.player.player;
			this.$.editModal.close();
		}

		newPlayer(e) {
			this.player = {};
			this.$.newModal.open();
		}

		saveNewPlayer(e) {
			console.log('asdfasdf');
			console.log(this.player);
			playerDB.value.push(this.player);
			this.$.newModal.close();
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
