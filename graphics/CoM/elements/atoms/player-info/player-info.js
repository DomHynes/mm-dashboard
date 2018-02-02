class PlayerInfo extends Polymer.Element {
	static get is() {
		return 'player-info';
	}

	static get properties() {
		return {
			name: {
				type: String,
				value: 'Player'
			}
		};
	}
}

customElements.define(PlayerInfo.is, PlayerInfo);
