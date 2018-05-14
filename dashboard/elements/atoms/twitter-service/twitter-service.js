(function () {
	const twitterActions = nodecg.Replicant('twitter-actions');
	const tokenStore = nodecg.Replicant('token-store');

	class TwitterService extends Polymer.Element {
		static get is() {
			return 'twitter-service';
		}

		static get properties() {
			return {
				twitterActions: {
					type: Array,
					value: []
				}
			};
		}

		tweetAction(e) {
			nodecg.sendMessage('twitter:post', e.model.item.status, (err, data) => {
				if (err) {
					console.log(err);
					return;
				}
				console.log(data);
			});
		}

		delTweet(e) {
			nodecg.sendMessage('db:delDoc', e.model.item, err => {
				if (err) {
					console.log(err);
				}
			});
		}

		ready() {
			super.ready();
			twitterActions.on('change', newData => {
				console.log(newData);
				this.twitterActions = newData;
			});
			tokenStore.on('change', newData => {
				this.profile = newData.twitter.profile;
				this.updateStyles({
					'--twitter-profile-image': `url(${newData.twitter.profile.photos[0].value})`
				});
			});
		}
	}

	customElements.define(TwitterService.is, TwitterService);
})();
