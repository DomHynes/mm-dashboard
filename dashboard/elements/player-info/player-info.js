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
				}
			};
		}

		ready() {
			super.ready();
		}

		_computeReversed(reversed) {
			return reversed ? 'reversed' : '';
		}
	}

	customElements.define(PlayerInfo.is, PlayerInfo);
})();
