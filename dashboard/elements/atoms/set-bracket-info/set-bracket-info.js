(function () {
	const tournamentDB = nodecg.Replicant('tournamentDB');
	const currentTournament = nodecg.Replicant('currentTournament');

	class SetBracketInfo extends Polymer.Element {
		static get is() {
			return 'set-bracket-info';
		}

		static get properties() {
			return {
				tournamentIndex: {
					type: Number,
					observer: '_tournamentChange'
				},
				tournamentDB: {
					type: Array,
					value: []
				},
				tournament: {
					type: Object,
					notify: true,
					value() {
						return {};
					},
					observer: '_tournamentObjectChange'
				}
			};
		}

		_tournamentChange(e) {
			currentTournament.value = tournamentDB.value[e];
			this.tournament = {
				_id: tournamentDB.value[e]._id,
				slug: tournamentDB.value[e].data.entities.tournament.shortSlug
			};
		}

		_tournamentObjectChange(e) {
			if (e) {
				nodecg.readReplicant('tournamentDB', tournamentDB => {
					this.tournamentIndex = tournamentDB.findIndex(tournament => tournament._id === e._id);
				});
			}
		}

		ready() {
			super.ready();

			tournamentDB.on('change', newData => {
				this.tournamentDB = newData;
			});

			currentTournament.on('change', newData => {
			});
		}
	}

	customElements.define(SetBracketInfo.is, SetBracketInfo);
})();
