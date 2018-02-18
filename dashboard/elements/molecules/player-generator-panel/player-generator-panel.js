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
				},
				playerCheckName: {
					type: String
				}
			};
		}

		_editPlayer(e) {
			this.player = _.cloneDeep(e.model.item);
			this.$.editModal.open();
		}

		newPlayer() {
			this.player = {};
			this.$.newModal.open();
		}

		closeEdit() {
			this.player = null;
			this.$.editModal.close();
		}

		closeNew() {
			this.player = null;
			this.$.newModal.close();
		}

		saveEditedPlayer() {
			console.log(this.player);
			nodecg.sendMessage('db:setDoc', this.player)
				.then(resp => {
					console.log(resp);
				}).catch(err => {
					console.log(err);
				});
			this.$.editModal.close();
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

		_delPlayer(e) {
			nodecg.sendMessage('db:delDoc', e.model.item)
				.then(resp => {
					console.log(resp);
				}).catch(err => {
					console.log(err);
				});
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
