(function() {

	const gameData = nodecg.Replicant('gameData');
	const currentGameData = nodecg.Replicant('currentGameData');

	class CharacterSelector extends Polymer.Element {
		static get is() {
			return 'character-selector';
		}

		static get properties() {
			return {
				characterFilter: {
					type: String,
					value: ""
				},
				characters: {
					type: Array,
					value: [{}]
				},
				characterIndex: {
					type: Number,
					value: 2
				},
				colourIndex: {
					type: Number,
					value: 5
				}
			};
		}

		ready() {
			super.ready();
			currentGameData.on('change', newData => {
				this.selectedGame = gameData.value[0];
			});
		}

		openCharacterDialog() {
			this.$.characterDialog.open();
		}

		onDialogOpen() {
			this.$.characterInput.focus();
		}

		onDialogClose() {
			this.characterFilter = "";
		}

		_findCharIndex(char) {
			return this.selectedGame.characters.findIndex( character => character.name === char.name );
		}

		_findItemOffset(item) {
			return `background-position: 0px ${this._findCharIndex(item) * -24}px;`
		}

		_findIndexOffset(index) {
			return `background-position: 0px ${index * -24}px;`
		}

		_selectCharacter(e) {
			this.characterIndex = this._findCharIndex(e.model.item);
		}

		_applyFilter(characterFilter) {
			if (!characterFilter) {
				return null;
			} else {
				characterFilter = characterFilter.toLowerCase();

				return function(character) {
					const first = character.name.toLowerCase();
					const last = character.longName.toLowerCase();

					return (
						first.indexOf(characterFilter) != -1 ||
						last.indexOf(characterFilter) != -1
					)
				}

			}
		}
	}

	customElements.define(CharacterSelector.is, CharacterSelector);
})();
