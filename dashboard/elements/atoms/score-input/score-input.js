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
					notify: true,
					observer: '_scoreChange'
				}
			};
		}

		ready() {
			super.ready();
		}

		_scoreChange(score) {
			if (isNaN(parseInt(score, 10))) {
				this.score = 0;
			} else if (typeof score !== 'number') {
				this.score = parseInt(score, 10);
			}
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
