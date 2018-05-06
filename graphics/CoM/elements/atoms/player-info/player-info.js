const gameData = nodecg.Replicant('gameData');
const selectedGame = nodecg.Replicant('selectedGame');

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
			},
			_characterIndex: {
				type: Number
			},
			_colourIndex: {
				type: Number
			},
			_selectedGame: {
				type: Object
			},
			characterIndex: {
				type: Number
			},
			colourIndex: {
				type: Number
			},
			selectedGame: {
				type: Object
			},
			reversed: {
				type: Boolean
			}
		};
	}

	static get observers() {
		return [
			'_nameChanged(name)',
			'_characterChanged(characterIndex, colourIndex, selectedGame)'
		];
	}

	_computeReversed() {
		return this.reversed
			? 'reversed'
			: '';
	}

	_nameChanged() {
		new TimelineMax()
			.to(this.$.name, 0.5, {opacity: 0})
			.call(() => {
				this._name = this.name;
				this._fitText();
			})
			.to(this.$.name, 0.5, {opacity: 1});
	}

	_characterChanged(characterIndex, colourIndex, selectedGame) {
		new TimelineMax()
			.delay(0.15)
			.to(this.$.character, 0.5, {opacity: 0})
			.call(() => {
				this._characterIndex = this.characterIndex;
				this._colourIndex = this.colourIndex;
				this._selectedGame = this.selectedGame;
			})
			.to(this.$.character, 0.5, {opacity: 1});
	}

	_fitText() {
		Polymer.flush();
		textFit(this.$.name, {
			maxFontSize: 28,
			alignVertWithFlexbox: true,
			alignHoriz: true
		});
	}

	_processName(name) {
		return `<div>${name}</div>`;
	}

	ready() {
		super.ready();

		selectedGame.on('change', selectedGame => {
			this.selectedIndex = selectedGame;
			nodecg.readReplicant('gameData', gameData => {
				this.selectedGame = gameData[selectedGame];
			});
		});
	}
}

customElements.define(PlayerInfo.is, PlayerInfo);
