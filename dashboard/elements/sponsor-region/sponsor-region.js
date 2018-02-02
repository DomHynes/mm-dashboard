(function () {
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
				},
				sponsored: {
					type: Boolean,
					value: false,
					notify: true
				}
			};
		}

		ready() {
			super.ready();
		}

		_bothAssets(region, sponsor) {
			const regionValid = region && region.length;
			const sponsorValid = sponsor && sponsor.length;
			return (regionValid && sponsorValid) ? '' : 'display: none;';
		}

		getBgImage(asset) {
			return `background-image: url('${asset.url}');`;
		}

		_rowHidden(rowType, sponsored) {
			return (rowType === 'sponsor' && !sponsored) || (rowType === 'region' && sponsored) ? 'hidden' : '';
		}
	}

	customElements.define(SponsorRegion.is, SponsorRegion);
})();
