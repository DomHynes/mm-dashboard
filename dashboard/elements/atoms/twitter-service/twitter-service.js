(function () {
	const tokenStore = nodecg.Replicant('token-store');

	class TwitterService extends Polymer.Element {
		static get is() {
			return 'twitter-service';
		}

		ready() {
			super.ready();
			tokenStore.on('change', newData => {
				this.profile = newData.twitter;
				this.updateStyles({
					'--twitter-profile-image': `url(https://twitter.com/${newData.twitter.profile.username}/profile_image?size=original)`
				});
			});
		}
	}

	customElements.define(TwitterService.is, TwitterService);
})();
