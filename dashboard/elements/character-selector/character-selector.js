(function () {
	class CharacterSelector extends Polymer.Element {
		static get is() {
			return 'character-selector';
		}

		static get properties() {
			return {
				characterFilter: {
					type: String,
					value: ''
				},
				characters: {
					type: Array,
					value: [{}]
				},
				characterIndex: {
					type: Number,
					notify: true
				},
				colourIndex: {
					type: Number,
					notify: true
				},
				selectedGame: {
					type: Object,
					value: {
						characters: [{}],
						images: {
							dashboard: {
								scaleX: 24,
								scaleY: 24
							}
						}
					}
				}
			};
		}

		ready() {
			super.ready();
		}

		openCharacterDialog() {
			this.$.characterDialog.open();
		}

		onCharacterDialogOpen() {
			this.$.characterInput.focus();
		}

		onCharacterDialogClose() {
			this.characterFilter = '';
		}

		onColourDialogOpen() {
			this.colourIndex = 0;
		}

		onColourDialogClose() {
		}

		_findCharIndex(char) {
			return this.selectedGame.characters.findIndex(character => character.name === char.name);
		}

		_findItemOffset(item) {
			return `background-position: 0px ${this._findCharIndex(item) * -(this.selectedGame.images.dashboard.scaleY)}px;`;
		}

		_findColourOffset(x, y, selectedGame) {
			if (selectedGame !== undefined) {
				return `background-position: ${x * -(selectedGame.images.dashboard.scaleX)}px ${y * -(selectedGame.images.dashboard.scaleY)}px;`;
			}
		}

		_selectCharacter(e) {
			this.characterIndex = this._findCharIndex(e.model.item);
			this.$.characterDialog.close();
			this.$.colourDialog.open();
		}

		_selectColor(e) {
			this.colourIndex = e.model.index;
			this.$.colourDialog.close();
		}

		_selectedCharacterColours(selectedGame, characterIndex) {
			if (selectedGame.characters[characterIndex] !== undefined) {
				return selectedGame.characters[characterIndex].colours;
			}
		}

		_applyFilter(characterFilter) {
			if (!characterFilter) {
				return null;
			}
			characterFilter = characterFilter.toLowerCase();

			return function (character) {
				const first = character.name.toLowerCase();
				const last = character.longName.toLowerCase();

				return (
						first.indexOf(characterFilter) !== -1 ||
						last.indexOf(characterFilter) !== -1
				);
			};
		}
	}

	customElements.define(CharacterSelector.is, CharacterSelector);
})();
