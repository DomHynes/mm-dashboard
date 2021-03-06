(function () {
	class SetScores extends Polymer.Element {
		static get is() {
			return 'set-scores';
		}

		static get properties() {
			return {
				scores: {
					type: Array,
					notify: true,
					value: [
						0, 0
					]
				}
			};
		}
	}

	customElements.define(SetScores.is, SetScores);
})();
