(function() {

	class PlayerInfo extends Polymer.Element {
		static get is() {
			return 'player-info';
		}

		static get properties() {
			return {
				char: {
					type: Number,
					value: 0
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
