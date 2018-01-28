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

		handleDeleteCom(e) {
			this.dispatchEvent(new CustomEvent(
				'deletecom', { bubbles: true, composed: true }
			))
		}

		handleUpCom(e) {
			this.dispatchEvent(new CustomEvent(
				'upcom', { bubbles: true, composed: true }
			))
		}

		handleDownCom(e) {
			this.dispatchEvent(new CustomEvent(
				'downcom', { bubbles: true, composed: true }
			))
		}

		ready() {
			super.ready();
		}
	}

	customElements.define(CommsInfo.is, CommsInfo);
})();
