class TitleDisplay extends Polymer.Element {
	static get is() {
		return 'title-display';
	}

	static get properties() {
		return {
			title: {
				type: String,
				value: ''
			},
			_title: {
				type: String
			}
		};
	}

	static get observers() {
		return [
			'_titleChanged(title)',
		];
	}

	_titleChanged() {
		new TimelineMax()
			.to(this.$.title, 0.5, {opacity: 0})
			.call(() => {
			console.log(this.title);
				this._title = this.title;
			this._fitText();
			})
			.to(this.$.title, 0.5, {opacity: 1});
	}

	_fitText() {
		Polymer.flush();
		textFit(this.$.title, {
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

customElements.define(TitleDisplay.is, TitleDisplay);
