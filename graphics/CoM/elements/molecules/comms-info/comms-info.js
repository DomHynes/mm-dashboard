const commsinfo = nodecg.Replicant('comms-info');

class CommsInfo extends Polymer.Element {
	static get is() {
		return 'comms-info';
	}

	static get properties() {
		return {
			comms: [
				{
					name: 'Commentator 1',
					tw: '@player'
				},
				{
					name: 'Commentator 2',
					tw: '@player'
				}
			]
		};
	}

	ready() {
		super.ready();
		commsinfo.on('change', newData => {
			console.log(newData);
			this.comms = newData;
		});
	}
}

customElements.define(CommsInfo.is, CommsInfo);
