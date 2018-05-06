class CommentatorInfo extends Polymer.Element {
	static get is() {
		return 'commentator-info';
	}

	static get properties() {
		return {
			name: {
				type: String,
				value: ''
			},
			_name: {
				type: String
			},
			tw: {
				type: String,
				value: ''
			},
			_tw: {
				type: String
			}
		};
	}

	static get observers() {
		return [
			'_nameChanged(name)',
			'_twChanged(tw)'
		];
	}

	_nameChanged() {
		new TimelineMax()
			.to(this.$.name, 0.5, {opacity: 0})
			.call(() => {
				this._name = this.name;
				this._fitText(this.$.name);
			})
			.to(this.$.name, 0.5, {opacity: 1});
	}

	_twChanged() {
		new TimelineMax()
			.to(this.$.tw, 0.5, {opacity: 0})
			.call(() => {
				this._tw = '@' + this.tw;
				this._fitText(this.$.tw);
			})
			.to(this.$.tw, 0.5, {opacity: 1});
	}

	_fitText(ele) {
		Polymer.flush();
		textFit(ele, {
			maxFontSize: 28,
			alignVertWithFlexbox: true,
			alignHoriz: true
		});
	}

	_processTitle(title) {
		return `<div>${title}</div>`;
	}

	ready() {
		super.ready();
	}
}

customElements.define(CommentatorInfo.is, CommentatorInfo);
