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
				checkTournament: {
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
					this.checkTournament = resp;
					this.loading = false;
				})
				.catch(err => {
					this.loading = false;
					console.log(err);
				});
		}

		addNewTournament() {
			nodecg.sendMessage('smashgg:addTournament', this.checkTournament.slug, (err, data) => {
				console.log(err, data);
			});
		}

		createModal() {
			this.$.newModal.open();
		}

		closeNew() {
			this.loading = false;
			this.checkTournamentName = '';

			this.$.newModal.close();
		}

		saveNewTournament() {

		}

		_makeTag(e) {
			return e.sponsor
				? `${e.sponsor} | ${e.tag}`
				: e.tag;
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
