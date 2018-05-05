(function () {
	class socialsPanel extends Polymer.Element {
		static get is() {
			return 'socials-twitch';
		}

		makeClip() {
			nodecg.sendMessage('')
		}
	}

	customElements.define(socialsPanel.is, socialsPanel);
})();
