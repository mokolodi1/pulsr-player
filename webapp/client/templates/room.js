Template.room.onCreated(function() {
	var instance = this;

	instance.currentlyPlayingSong = new ReactiveVar("");

	var yt = new YTPlayer("player", {
		height: '390',
		width: '640'
	});

	this.autorun(function() {
		console.log("Autorun called");
		var data = Template.currentData(self.view);
		if (data) {
			var songID = data.room.current_song_id;
			if (songID && songID != instance.currentlyPlayingSong.get()) {
				var yt_id = Songs.findOne(songID).url.replace("https://www.youtube.com/watch?v=", "");
				console.log(yt_id);
				if (yt.ready()) {
					yt.player.loadVideoById(yt_id);
				}
			}
		}
	});
});

Template.room.helpers({
	searchResults: function () {
		return searchResults.get();
	},
	likeSum: function () {
		return this.like_count + this.dislike_count;
	},
});

Template.searchResult.events({
	'click .listItem': function(event, instance) {
		window.addSongToPlaylist(instance.data);
	}
});

Template.room.events({
	"click #startButton": function(event, instance) {
		Meteor.call('setCurrentSong', instance.data.room._id);
	},
	'click .searchButton': function() {
		window.searchSongs();
	},
	'keypress .searchBar': function(event) {
		if (event.keyCode == 13) {
			window.searchSongs();
		}
	}
});
