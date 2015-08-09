Template.room.onCreated(function() {
	var instance = this;

	new YTPlayer("player", {
		height: '390',
		width: '640'
	});

	this.autorun(function() {
		console.log("Autorun called");
		var data = Template.currentData(self.view);
		if (data) {
			var songID = data.current_song_id;
			if (songID) {
				console.log(songID);
				var yt_id = Rooms.findOne(songID).url;
				if (yt.ready()) {
					yt.player.loadVideoById(yt_id);
				}
				this.stop();
			}
		}
	});
});

Template.room.helpers({
	searchResults: function () {
		return searchResults.get();
	}
});

Template.room.events({
	"click startButton": function(event, instance) {
		Meteor.call('setCurrentSong', instance.data.id);
	},
});
