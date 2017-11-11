(function() {

	class SponsorRegion extends Polymer.Element {
		static get is() {
			return 'sponsor-region';
		}

		static get properties() {
			return {
				regionImages: {
					type: Array,
					value: [{}]
				},
				sponsorRegionImage: {
					type: String,
					value: null,
					notify: true
				}
			};
		}

		ready() {
			super.ready();

		}
	}

	customElements.define(SponsorRegion.is, SponsorRegion);
})();
