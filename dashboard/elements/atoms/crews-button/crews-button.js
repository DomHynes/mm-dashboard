(function () {
	class CrewsButton extends Polymer.Element {
		static get is() {
			return 'crews-button';
		}

		static get properties() {
			return {
				positive: {
					type: String,
					value: ''
				},
				negative: {
					type: String,
					value: ''
				},
				condition: {
					type: Boolean,
					value: true,
					notify: true
				},
				icons: {
					type: Boolean,
					value: false
				}
			};
		}

		_toggleCondition() {
			this.condition = !this.condition;
		}
	}

	customElements.define(CrewsButton.is, CrewsButton);
})();
