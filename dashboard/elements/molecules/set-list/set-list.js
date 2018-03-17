(function () {
	const setDB = nodecg.Replicant('setDB');

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

		ready() {
			super.ready();

			setDB.on('change', newData => {
				this.setDB = newData;
			});
		}
	}

	customElements.define(setList.is, setList);
})();
