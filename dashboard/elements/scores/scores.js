(function() {
	class SetScores extends Polymer.Element {
		static get is() {
			return 'set-scores';
		}

		static get properties() {
			return {
				scores: {
					type: Array,
					notify: true
				}
			}
		}

		ready() {
			super.ready();
		}
	}

	customElements.define(SetScores.is, SetScores);
})();
