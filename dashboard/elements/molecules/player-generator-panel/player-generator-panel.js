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
			this.player = {index: e.model.index, player: _.cloneDeep(e.model.item)};
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
			nodecg.sendMessage('db:addDoc', {
				doc: this.player,
				type: 'player'
			}).then(resp => {
				console.log(resp);
			}).catch(err => {
				console.log(err);
			});

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
