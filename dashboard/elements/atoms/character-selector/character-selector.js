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
				gameIndex: {
					type: Number,
					observer: '_gameChange'
				},
				selectedGame: {
					type: Object,
					value() {
						return {
							characters: [{}],
							images: {
								dashboard: {
									scaleX: 24,
									scaleY: 24
								}
							}
						};
					}
				}
			};
		}

		_gameChange(gameIndex) {
			nodecg.readReplicant('gameData', newData => {
				if (gameIndex >= 0) {
					this.selectedGame = newData[gameIndex];
					this.updateStyles({
						'--character-image': `url('/bundles/mm-dashboard/shared/games/${this.selectedGame.name}/dashboard.png')`,
						'--character-image-width': `${this.selectedGame.images.dashboard.scaleX}px`,
						'--character-image-height': `${this.selectedGame.images.dashboard.scaleY}px`
					});
				}
			});
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
			this.colourIndex = 0;
			this.$.characterDialog.close();
			if (this.selectedGame.colors) {
				this.$.colourDialog.open();
			}
		}

		_selectColor(e) {
			this.colourIndex = e.model.index;
			this.$.colourDialog.close();
		}

		_selectedCharacterColours(selectedGame, characterIndex) {
			console.log(selectedGame, characterIndex);
			if (selectedGame !== undefined && selectedGame.characters[characterIndex] !== undefined) {
				return selectedGame.characters[characterIndex].colours;
			}
		}

		_applyFilter(characterFilter) {
			if (!characterFilter) {
				return null;
			}
			characterFilter = characterFilter.toLowerCase();

			return character => {
				const first = character.name.toLowerCase();
				const last = character.longName.toLowerCase();
				console.log(character, characterFilter, first, last);
				console.log(first.indexOf(characterFilter) !== -1 ||
					last.indexOf(characterFilter) !== -1);

				return (
						first.indexOf(characterFilter) !== -1 ||
						last.indexOf(characterFilter) !== -1
				);
			};
		}
	}

	customElements.define(CharacterSelector.is, CharacterSelector);
})();
