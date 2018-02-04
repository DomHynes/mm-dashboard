class PlayerInfo extends Polymer.Element {
	static get is() {
		return 'player-info';
	}

	static get properties() {
		return {
			name: {
				type: String,
				value: 'Player'
			},
			_name: {
				type: String
			}
		};
	}

	static get observers() {
		return [
			'_nameChanged(name)'
		];
	}

	_nameChanged() {
		new TimelineMax()
			.to(this.$.name, 0.5, {opacity: 0})
			.call(() => {
				this._name = this.name;
			})
			.to(this.$.name, 0.5, {opacity: 1});
	}
}

customElements.define(PlayerInfo.is, PlayerInfo);
