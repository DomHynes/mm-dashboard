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
				}
			};
		}

		ready() {
			super.ready();
		}
	}

	customElements.define(PlayerInfo.is, PlayerInfo);
})();
