(function () {
	class socialsPanel extends Polymer.Element {
		static get is() {
			return 'socials-twitch';
		}
		static get properties() {
		  return {
		    channel: {
		      type: String
        }
      }
    }

		getClip() {
			nodecg.sendMessage('twitch:getClip', this.channel, (err, data) => {
			  console.log(err, data);
      });
		}
	}

	customElements.define(socialsPanel.is, socialsPanel);
})();
