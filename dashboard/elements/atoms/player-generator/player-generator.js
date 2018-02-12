(function () {
	class PlayerInfo extends Polymer.Element {
		static get is() {
			return 'player-generator';
		}

		static get properties() {
			return {
				name: {
					type: String,
					value: '',
					notify: true
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
				}
			};
		}
	}

	customElements.define(PlayerInfo.is, PlayerInfo);
})();
