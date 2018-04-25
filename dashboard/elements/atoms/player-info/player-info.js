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
				event: {
					type: Number
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
				alive: {
					type: Boolean,
					value: true,
					notify: true
				},
				currentlyPlaying: {
					type: Boolean,
					value: false,
					notify: true
				},
				playerDb: {
					type: Array,
					value: []
				},
				crews: {
					type: Boolean,
					value: false
				},
				gameData: {
					type: Object,
					value() {
						return {};
					}
				},
				selectedGame: {
					type: Number
				},
				characters: {
					type: Boolean
				}
			};
		}

		static get observers() {
			return [
				'_checkCrews(event, gameData, selectedGame)',
				'_checkCharacters(gameData, selectedGame)'
			];
		}

		_checkCrews(event, gameData, selectedGame) {
			this.crews = gameData[selectedGame].events[event].name === 'crews';
		}

		_checkCharacters(gameData, selectedGame) {
			this.characters = gameData[selectedGame].characters;
			if (!this.characters) {
				this.characterIndex = null;
				this.colourIndex = null;
			}
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
