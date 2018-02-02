const setinfo = nodecg.Replicant('set-info');

(function () {
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
			};
		}

		ready() {
			super.ready();

			setinfo.on('change', newData => {
				this.scores = newData.scores;
			});
		}
	}

	customElements.define(SetScores.is, SetScores);
})();
