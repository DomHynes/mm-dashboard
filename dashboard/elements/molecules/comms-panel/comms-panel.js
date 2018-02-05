(function () {
	const commsinfo = nodecg.Replicant('comms-info', {
		defaultValue: [
			{
				name: 'Commentator 1',
				tw: 'asdf'
			},
			{
				name: 'Commentator 2',
				tw: 'asdf'
			},
			{
				name: 'Commentator 2',
				tw: 'asdf'
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
					type: Array,
					value: []
				}
			};
		}

		saveComms() {
			commsinfo.value = this.commsinfo;
		}

		addCom() {
			if (this.commsinfo && this.commsinfo.length) {
				this.push('commsinfo', {
					name: 'New Commentator',
					tw: 'New Twitter'
				});
			} else {
				this.set('commsinfo', [{
					name: 'New Commentator',
					tw: 'New Twitter'
				}]);
			}
		}

		deleteCom(e) {
      this.splice('commsinfo', e.model.index, 1);
		}

		upCom(e) {
			this.splice('commsinfo', e.model.index, 1);
      this.splice('commsinfo', e.model.index - 1, 0, e.model.item);
		}

		downCom(e) {
      this.splice('commsinfo', e.model.index, 1);
      this.splice('commsinfo', e.model.index + 1, 0, e.model.item);
		}

		ready() {
			super.ready();
			commsinfo.on('change', newData => {
				this.commsinfo = _.cloneDeep(newData);
			});
		}
	}

	customElements.define(CommsPanel.is, CommsPanel);
})();
