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
			scores: {
				type: Array,
				value() {
					return [];
				}
			},
			currentPlayer1: {
				type: Object,
				value() {
					return {};
				}
			},
			currentPlayer2: {
				type: Object,
				value() {
					return {};
				}
			}
		};
	}

	_getAliveClass(e) {
		return e
			? 'alive'
			: 'dead';
	}

	crewsVisible(players) {
		console.log(players);
		return players && !(players[0].length > 2)
			? 'hidden'
			: 'visible';
	}

	crewsInvisible(players) {
		console.log(players);
		return players && !(players[0].length > 2)
			? 'visible'
			: 'hidden';
	}

	bgClass(players) {
		return players && !(players[0].length > 2)
			? 'containerbgSingles'
			: 'containerbgCrews';
	}

	ready() {
		super.ready();
		setinfo.on('change', async newData => {
			this.scores = _.cloneDeep(newData.scores);
			this.players = newData.players;
			this.bracketPlace = newData.bracketPlace;
			console.log(newData);

			nodecg.readReplicant('gameData', data => {
				this.eventName = data[newData.game].events[newData.event].name;
			});

			if (this.players[0].length > 2) {
				this.players.forEach((team, teamIndex) => {
					team.forEach((player, playerIndex) => {
						if (player.currentlyPlaying) {
							this[`currentPlayer${teamIndex + 1}`] = _.cloneDeep(player);
						}
					});
				});
			} else {
				this.players.forEach((team, teamIndex) => {
					this[`currentPlayer${teamIndex + 1}`] = _.cloneDeep(team[0]);
				});
			}
			console.log(this.currentPlayer1);
		});
	}
}

customElements.define(SetInfo.is, SetInfo);
