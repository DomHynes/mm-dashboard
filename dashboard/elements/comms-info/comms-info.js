(function() {
	class CommsInfo extends Polymer.Element {
		static get is() {
			return 'comms-info';
		}

		static get properties() {
			return {
				name: {
					type: String,
					value: '',
					notify: true
				},
				tw: {
					type: String,
					value: '',
					notify: true
				}
			};
		}

		ready() {
			super.ready();
		}
	}

	customElements.define(CommsInfo.is, CommsInfo);
})();
