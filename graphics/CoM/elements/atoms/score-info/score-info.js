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
			}
		};
	}

	_scoreChanged(newValue) {
		console.log(newValue);
	}

	ready() {
		super.ready();
		this.addEventListener('score-changed', change => console.log(change));
	}
}

customElements.define(ScoreInfo.is, ScoreInfo);
