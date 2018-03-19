(function () {
	const setDB = nodecg.Replicant('setDB');
	const gameData = nodecg.Replicant('gameData');

	class setList extends Polymer.Element {
		static get is() {
			return 'set-list';
		}

		static get properties() {
			return {
				selectedSet: {
					type: Object,
					value() {
						return {
							id: null,
							name: null,
							slug: null
						};
					}
				},
				setDB: {
					type: Array,
					value: []
				},
				loading: {
					type: Boolean,
					value: false
				}
			};
		}

		createModal() {
			this.$.newModal.open();
		}

		closeNew() {
			this.loading = false;
			this.tournamentSlug = '';

			this.$.newModal.close();
		}

		_makeTag(e) {
			return e.sponsor
				? `${e.sponsor} | ${e.tag}`
				: e.tag;
		}

		_getNames(e) {
			let names = '';
			e.players.forEach(team => {
				team.forEach(player => {
					names += `${player.name}, `;
				});
			});

			return names;
		}

		openEditSetModal(e) {
			this.set('selectedSet', e.model.item);
			this.$.editSetModal.open();
		}

		onEditSetOpen() {
			this.game = gameData.value[this.selectedSet.game];
		}

		_getCharacter(index, game) {
			if (game && index >= 0) {
				return game.characters[index].longName;
			}
			return '';
		}

		_getTeamName(team) {
			return team.map((player, index, array) => {
				if (index !== array.length - 1) {
					return `${player.name}, `;
				}
				return player.name;
			});
		}

		_getEventName(event, game) {
			if (gameData.value) {
				return gameData.value[game].events[event].name;
			}
		}

		_getGameName(game) {
			return gameData.value[game].name;
		}

		deleteSet() {
			this.loading = true;
			nodecg.sendMessage('db:delDoc', this.selectedSet, (err, data) => {
				console.log(err, data);
				this.loading = false;
				this.$.editSetModal.close();
			});
		}

		_getProgress(set) {
			if (set.video.fileSize && set.video.uploaded) {
				console.log(set.video.fileSize / set.video.uploaded * 100);
				return set.video.fileSize / set.video.uploaded * 100;
			}
		}

		uploadSet(e) {
			nodecg.sendMessage('yt:uploadSet', e.model.item, (err, data) => {

			});
		}

		ready() {
			super.ready();

			setDB.on('change', newData => {
				this.setDB = newData;
			});
		}
	}

	customElements.define(setList.is, setList);
})();
