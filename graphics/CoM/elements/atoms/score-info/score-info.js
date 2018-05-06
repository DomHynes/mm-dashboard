class ScoreInfo extends Polymer.Element {
	static get is() {
		return 'score-info';
	}

	static get properties() {
		return {
			score: {
				type: Number,
				value: 0,
				observer: '_scoreChanged'
			},
			_score: {
				type: Number
			}
		};
	}

	_scoreChanged() {
		new TimelineMax()
			.delay(0.3)
			.to(this.$.score, 0.5, {opacity: 0})
			.call(() => {
				this._score = this.score;
			})
			.to(this.$.score, 0.5, {opacity: 1});
	}
}

customElements.define(ScoreInfo.is, ScoreInfo);
