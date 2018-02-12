(function () {
	class ScoreInput extends Polymer.Element {
		static get is() {
			return 'score-input';
		}

		static get properties() {
			return {
				score: {
					type: Number,
					value: 0,
					notify: true
				}
			};
		}

		ready() {
			super.ready();
		}

		scoreUp() {
			this.score = parseInt(this.score, 10) + 1;
		}

		scoreDown() {
			this.score = this.score > 0 ? parseInt(this.score - 1, 10) : parseInt(this.score, 10);
		}
	}

	customElements.define(ScoreInput.is, ScoreInput);
})();
