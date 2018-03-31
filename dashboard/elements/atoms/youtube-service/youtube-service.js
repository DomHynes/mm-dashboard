(function () {
	const tokenStore = nodecg.Replicant('token-store');

	class YoutubeService extends Polymer.Element {
		static get is() {
			return 'youtube-service';
		}

		static get properties() {
			return {
				profile: {
					value() {
						return {};
					}
				}

			};
		}

		ready() {
			super.ready();
			tokenStore.on('change', newData => {
				this.profile = newData.youtube;
				this.updateStyles({
					'--youtube-profile-image': `url("${this.profile.profile._json.items[0].snippet.thumbnails.high.url}")`
				});
			});
		}
	}

	customElements.define(YoutubeService.is, YoutubeService);
})();
