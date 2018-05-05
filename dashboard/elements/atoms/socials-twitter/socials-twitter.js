const tokenStore = nodecg.Replicant('token-store');

(function () {
	class socialsPanel extends Polymer.Element {
		static get is() {
			return 'socials-twitter';
		}

		static get properties() {
			return {
				text: {
					type: String
				},
				posting: {
					type: Boolean,
					value: false
				},
				errors: {
					type: Array,
					value: () => []
				}
			};
		}

		post() {
			this.posting = true;
			nodecg.sendMessage('twitter:post', this.text, (err, data) => {
				this.posting = false;
				if (err) {
					this.errors = err;
					console.log(err);
				} else {
					this.text = '';
				}
				console.log(data);
			});
		}

		ready() {
			super.ready();

			tokenStore.on('change', newData => {
				console.log(newData);
				this.tokenStore = newData;
			});
		}
	}

	customElements.define(socialsPanel.is, socialsPanel);
})();
