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
	'click .searchButton': function() {
		window.searchSongs();
	},
	'keypress .searchBar': function(event) {
		if (event.keyCode == 13) {
			window.searchSongs();
		}
	}

});
