Template.room.onCreated(function() {
	var instance = this;

	new YTPlayer("player", {
		height: '390',
		width: '640'
	});

	this.autorun(function() {
		console.log("Autorun called");
		if (this.data) {
			var songID = this.data.current_song_id;
			console.log(songID);
			var yt_id = Meteor.findOne(songId).url;
			if (yt.ready()) {
				yt.player.loadVideoById(yt_id);
			}
			this.stop();
		}
	});
});

Template.room.helpers({
	searchResults: function () {
		return searchResults.get();
	}
})
