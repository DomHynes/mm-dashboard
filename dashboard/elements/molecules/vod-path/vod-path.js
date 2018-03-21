(function () {
	class VodPath extends Polymer.Element {
		static get is() {
			return 'vod-path';
		}

		static get properties() {
			return {
				basePath: {
					type: String,
					notify: true
				},
				videoName: {
					type: String,
					notify: true
				},
				fileSize: {
					type: Number,
					notify: true
				},
				uploaded: {
					type: Number,
					notify: true
				}

			};
		}

		grabLatestVOD() {
			console.log(this.basePath);
			nodecg.sendMessage('yt:grabLatestVOD', this.basePath, (err, data) => {
				console.log(err, data);
				if (err) {
					console.log(err);
					return;
				}
				this.set('basePath', data.basePath);
				this.set('fileSize', data.fileSize);
				this.set('videoName', data.videoName);
				this.set('uploaded', 0);
			});
		}
	}

	customElements.define(VodPath.is, VodPath);
})();
