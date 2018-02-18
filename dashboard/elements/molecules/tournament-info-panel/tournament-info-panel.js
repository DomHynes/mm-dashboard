(function () {
	const tournamentData = nodecg.Replicant('currentTournament');

	class TournamentInfoPanel extends Polymer.Element {
		static get is() {
			return 'tournament-info-panel';
		}

		static get properties() {
			return {
				tournamentSlug: {
					type: String
				},
				loading: {
					type: Boolean,
					value: false
				}
			};
		}

		getTournament() {
			this.loading = true;
			nodecg.sendMessage('smashgg:getTournament', this.tournamentSlug)
				.then(resp => {
					this.loading = false;
				})
				.catch(err => {
					this.loading = false;
					console.log(err);
				});
		}

		_makeTag(e) {
			return e.sponsor
				? `${e.sponsor} | ${e.tag}`
				: e.tag;
		}

		ready() {
			super.ready();

			tournamentData.on('change', newData => {
				console.log(newData);
				this.tournamentData = newData;
			});
		}
	}

	customElements.define(TournamentInfoPanel.is, TournamentInfoPanel);
})();
