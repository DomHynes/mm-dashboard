(function () {
	class PlayerInfo extends Polymer.Element {
		static get is() {
			return 'player-info';
		}

		static get properties() {
			return {
				characterIndex: {
					type: Number,
					value: 0,
					notify: true
				},
				colourIndex: {
					type: Number,
					value: 0,
					notify: true
				},
				name: {
					type: String,
					value: '',
					notify: true
				},
				reversed: {
					type: Boolean,
					value: false
				},
				sponsorRegion: {
					type: String,
					value: null,
					notify: true
				},
				sponsorRegionImage: {
					type: String,
					value: null,
					notify: true
				},
				sponsored: {
					type: Boolean,
					value: false,
					notify: true
				},
				playerDb: {
					type: Array,
					value: []
				},
				gameData: {
					type: Object,
					value() {
						return {};
					}
				},
				selectedGame: {
					type: Number
				}
			};
		}

		_computeReversed() {
			return this.reversed % 2 ? 'reversed' : '';
		}

		queryFn() {
			return (data, query) => data.filter((item =>
				item.tag
					.toLowerCase()
					.includes(query.toLowerCase())
			));
		}

		ready() {
			super.ready();

			this.$.autocomplete.queryFn = this.queryFn();
		}
	}

	customElements.define(PlayerInfo.is, PlayerInfo);
})();
