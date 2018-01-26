(function() {
	const commsinfo = nodecg.Replicant('commsinfo', {
		defaultValue: [
			{
				name: "Commentator 1",
				tw: "asdf"
			},
			{
				name: "Commentator 2",
				tw: "asdf"
			}
		]
	});

	class CommsPanel extends Polymer.Element {
		static get is() {
			return 'comms-panel';
		}

		static get properties() {
			return {
				commsinfo: {
					type: Object
				}
			};
		}

		saveComms() {
			commsinfo.value = this.commsinfo;
		}

		swapComms() {
			const comms = this.commsinfo.forEach( com => _.cloneDeep(com));
			comms.reverse();
			comms.forEach( ( com, index ) => this.set( `commsinfo.${index}`, com ));
		}

		ready() {
			super.ready();
			commsinfo.on('change', newData => this.commsinfo = _.cloneDeep(newData));
		}
	}

	customElements.define(CommsPanel.is, CommsPanel);
})();
