(function () {
	const clipData = nodecg.Replicant('clipData');

	class socialsPanel extends Polymer.Element {
		static get is() {
			return 'socials-twitch';
		}

		static get properties() {
			return {
				channel: {
					type: String
				},
				editURL: {
					type: String
				},
				clipID: {
					type: String
				},
				clipDate: {
					type: String
				}
			};
		}

		getClip() {
			nodecg.sendMessage('twitch:getClip', this.channel, (err, data) => {
				console.log(err, data);
			});
		}

		ready() {
			super.ready();
			clipData.on('change', newData => {
				this.editURL = newData.edit_url;
				this.clipID = newData.id;
				this.clipDate = newData.timestamp;
			});
		}
	}

	customElements.define(socialsPanel.is, socialsPanel);
})();
