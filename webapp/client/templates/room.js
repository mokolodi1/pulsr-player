Template.room.helpers({
	searchResults: function () {
		return searchResults.get();
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
	},
});

Template.songItem.events({
	'click .upvote': function (event, instance) {
		Meteor.call("upvote", instance.data._id);
	},
	'click .downvote': function (event, instance) {
		Meteor.call("downvote", instance.data._id);
	},
});
