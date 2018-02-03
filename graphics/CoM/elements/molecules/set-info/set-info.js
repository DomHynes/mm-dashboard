const setinfo = nodecg.Replicant('set-info');

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
				],
				[
					{
						name: 'Player 2',
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
		super.ready();
		setinfo.on('change', newData => {
			console.log(newData.scores);
			this.scores = newData.scores;
		});
	}
}

customElements.define(SetInfo.is, SetInfo);
