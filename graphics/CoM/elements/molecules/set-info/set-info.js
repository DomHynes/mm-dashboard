const setinfo = nodecg.Replicant('set-info', {
	defaultValue: {
		p1: {
			name: 'asdf',
			characterIndex: 4,
			colourIndex: 2,
			sponsored: false,
			sponsorRegion: null,
			sponsorRegionImage: null
		},
		p2: {
			name: '',
			characterIndex: 2,
			colourIndex: 2,
			sponsored: false,
			sponsorRegion: null,
			sponsorRegionImage: null
		},
		scores: [0, 0]
	}
});

class SetInfo extends Polymer.Element {
	static get is() {
		return 'set-info';
	}

	static get properties() {
		return {
			players: [
				[
					{
						name: 'Player 1',
						tw: '@player'
					}
				]
			],
			scores: [
				0, 0
			]
		};
	}

	ready() {
		setinfo.on('change', newData => {
			this.scores = newData;
		});
	}
}

customElements.define(SetInfo.is, SetInfo);
