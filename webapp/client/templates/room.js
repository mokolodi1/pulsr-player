Template.room.helpers({
	searchResults: function () {
		return searchResults.get();
	}
});

Template.searchResult.events({
	'click .listItem': function(event, instance) {
		window.addSongToPlaylist(instance.data);
	}
});