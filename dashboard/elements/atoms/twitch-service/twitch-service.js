(function () {
	const tokenStore = nodecg.Replicant('token-store');
	const streamInfo = nodecg.Replicant('stream-info');

	class TwitchService extends Polymer.Element {
		static get is() {
			return 'twitch-service';
		}

		ready() {
			super.ready();
			streamInfo.on('change', newData => {
				this.streamInfo = _.cloneDeep(newData);
			});
			tokenStore.on('change', newData => {
				this.profile = newData.twitch.profile;
				this.updateStyles({
					'--twitch-profile-image': `url(${newData.twitch.profile._json.logo})`
				});
			});
		}
	}

	customElements.define(TwitchService.is, TwitchService);
})();
