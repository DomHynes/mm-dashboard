(function() {
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
					value: ''
				},
				reversed: {
					type: Boolean,
					value: false
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
