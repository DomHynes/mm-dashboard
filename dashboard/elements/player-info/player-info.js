(function() {

	class PlayerInfo extends Polymer.Element {
		static get is() {
			return 'player-info';
		}

		static get properties() {
			return {};
		}

		ready() {
			super.ready();

		}
	}

	customElements.define(PlayerInfo.is, PlayerInfo);
})();
