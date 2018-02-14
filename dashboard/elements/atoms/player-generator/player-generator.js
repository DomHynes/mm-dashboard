(function () {
	class PlayerInfo extends Polymer.Element {
		static get is() {
			return 'player-generator';
		}

		static get properties() {
			return {
				name: {
					type: String,
					notify: true
				},
				twitter: {
					type: String,
					notify: true
				}
			};
		}
	}

	customElements.define(PlayerInfo.is, PlayerInfo);
})();
