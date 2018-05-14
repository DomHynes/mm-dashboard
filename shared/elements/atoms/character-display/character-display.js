class CharacterDisplay extends Polymer.Element {
	static get is() {
		return 'character-display';
	}

	static get properties() {
		return {
			colourIndex: {
				type: Number
			},
			characterIndex: {
				type: Number
			},
			selectedGame: {
				type: Number
			}

		};
	}

	_findColourOffset(x, y, selectedGame) {
		if (x === undefined || y === undefined || selectedGame === undefined) {
			return;
		}
		if (selectedGame !== undefined && selectedGame.images !== undefined && selectedGame.images.dashboard !== undefined) {
			this.updateStyles({
				'--character-image': `url('/bundles/mm-dashboard/shared/games/${selectedGame.name}/dashboard.png')`
			});
			return `background-position: ${x * -(selectedGame.images.dashboard.scaleX)}px ${y * -(selectedGame.images.dashboard.scaleY)}px;`;
		}
	}
}

customElements.define(CharacterDisplay.is, CharacterDisplay);
