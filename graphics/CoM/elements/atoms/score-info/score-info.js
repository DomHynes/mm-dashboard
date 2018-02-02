class ScoreInfo extends Polymer.Element {
	static get is() {
		return 'score-info';
	}

	static get properties() {
		return {
			score: {
				type: Number,
				value: 0
			}
		};
	}
}

customElements.define(ScoreInfo.is, ScoreInfo);
