(function () {
	const tournamentData = nodecg.Replicant('currentTournament');
	const tournamentDB = nodecg.Replicant('tournamentDB');

	class TournamentGeneratorPanel extends Polymer.Element {
		static get is() {
			return 'tournament-generator-panel';
		}

		static get properties() {
			return {
				tournamentSlug: {
					type: String
				},
				selectedTournament: {
					type: Object,
					value() {
						return {
							id: null,
							name: null,
							slug: null
						};
					}
				},
				tournamentDB: {
					type: Array,
					value: []
				},
				loading: {
					type: Boolean,
					value: false
				}
			};
		}

		tournamentCheck() {
			this.loading = true;
			this.checkTournamentName = null;
			nodecg.sendMessage('smashgg:checkTournament', this.tournamentSlug)
				.then(resp => {
					this.selectedTournament = resp;
					this.loading = false;
				})
				.catch(err => {
					this.loading = false;
					console.log(err);
				});
		}

		addNewTournament() {
			this.loading = true;
			nodecg.sendMessage('smashgg:addTournament', this.selectedTournament.slug, (err, data) => {
				console.log('farts');
				this.loading = false;
				if (err) {
					console.log(err);
				} else {
					this.$.newModal.close();
					this.tournamentSlug = '';
					this.selectedTournament = null;
				}
			});
		}

		createModal() {
			this.$.newModal.open();
		}

		closeNew() {
			this.loading = false;
			this.tournamentSlug = '';

			this.$.newModal.close();
		}

		deleteTournamentModal(e) {
			this.selectedTournament = _.cloneDeep(e.model.item);
			this.$.deleteTournamentModal.open();
		}

		deleteTournament() {
			this.loading = true;
			nodecg.sendMessage('smashgg:delTournament', this.selectedTournament, err => {
				this.loading = false;
				if (err) {
					console.log(err);
				} else {
					this.$.deleteTournamentModal.close();
				}
			});
		}

		closeDel() {
			this.$.deleteTournamentModal.close();
		}

		_makeTag(e) {
			return e.sponsor
				? `${e.sponsor} | ${e.tag}`
				: e.tag;
		}

		openAddPlayersFromTournamentModal(e) {
			this.selectedTournament = _.cloneDeep(e.model.item);
			this.$.addPlayersToDBModal.open();
		}

		addPlayersFromTournament() {
			nodecg.sendMessage('db:addPlayersFromTournament', this.selectedTournament._id)
				.then( resp => console.log(resp))
				.catch( e => console.log(e));
		}

		ready() {
			super.ready();

			tournamentData.on('change', newData => {
				this.tournamentData = newData;
			});
			tournamentDB.on('change', newData => {
				this.tournamentDB = newData;
			});
		}
	}

	customElements.define(TournamentGeneratorPanel.is, TournamentGeneratorPanel);
})();
