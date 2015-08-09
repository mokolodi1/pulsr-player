Meteor.methods({
	setCurrentSong: function (roomID) {
		var newCurrentSong = Songs.findOne({room_id: roomID, played: false}, {sort: {like_score: -1}});
		if (newCurrentSong) {
			Rooms.update(roomID, {"$set": {
				current_song_id: newCurrentSong._id,
				current_song_started: new Date()
			}});
			Songs.update(newCurrentSong._id, {"$set": {played: true}});
		}
	},
});
