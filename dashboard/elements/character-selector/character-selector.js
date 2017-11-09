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
				this.xchar = this.selectedGame.images.dashboard.scaleX * this.colourIndex;
				this.ychar = this.selectedGame.images.dashboard.scaleY * this.characterIndex;
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

		_findVertOffset(item) {
			const index = this.selectedGame.characters.findIndex( char => char.name === item.name );
			return index * -24;
		}

		_selectCharacter(e) {
			console.log(e.model.item);
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
