Meteor.methods({
	setCurrentSong: function (roomID) {
		var newCurrentSong = Songs.findOne({room_id: roomID}, {sort: {like_count: -1}});
	},
});
