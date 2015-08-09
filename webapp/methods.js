// TODO: add check()s

function contains(array, element) {
  return array.indexOf(element) > -1;
}

function checkLoggedIn(currentUserId) {
  if (! currentUserId) {
    throw new Meteor.Error("not-authorized");
  }
}

Meteor.methods({
  upvote: function (songId) {

    var currentUserId = Meteor.userId();
    checkLoggedIn(currentUserId);

    var thisSong = Songs.findOne(songId);

    if (contains(thisSong.users_who_liked, currentUserId)) {
      throw new Meteor.Error("already-upvoted");
    }

    if (contains(thisSong.users_who_disliked, currentUserId)) {
      Songs.update(songId, {
        $pull: { "users_who_disliked": currentUserId },
        $addToSet: { "users_who_liked": currentUserId },
        $inc: { "like_score": 2 },
      });
    } else {
      Songs.update(songId, {
        $addToSet: { "users_who_liked": currentUserId },
        $inc: { "like_score": 1 },
      });
    }
  },
  unupvote: function (songId) {
    var currentUserId = Meteor.userId();
    checkLoggedIn(currentUserId);

    var thisSong = Songs.findOne(songId);
    if (!contains(thisSong.users_who_liked, currentUserId) ||
        contains(thisSong.users_who_disliked, currentUserId)) {
      throw new Meteor.Error("wrong-vote-state");
    }

    Songs.update(songId, {
      $pull: { "users_who_liked": currentUserId },
      $inc: { "like_score": -1 },
    });
  },
  downvote: function (songId) {

    var currentUserId = Meteor.userId();
    checkLoggedIn(currentUserId);

    var thisSong = Songs.findOne(songId);

    if (contains(thisSong.users_who_disliked, currentUserId)) {
      throw new Meteor.Error("already-downvoted");
    }

    if (contains(thisSong.users_who_liked, currentUserId)) {
      Songs.update(songId, {
        $pull: { "users_who_liked": currentUserId },
        $addToSet: { "users_who_disliked": currentUserId },
        $inc: { "like_score": -2 },
      });
    } else {
      Songs.update(songId, {
        $addToSet: { "users_who_disliked": currentUserId },
        $inc: { "like_score": -1 },
      });
    }
  },
  undownvote: function (songId) {
    var currentUserId = Meteor.userId();
    checkLoggedIn(currentUserId);

    var thisSong = Songs.findOne(songId);
    if (!contains(thisSong.users_who_disliked, currentUserId) ||
        contains(thisSong.users_who_liked, currentUserId)) {
      throw new Meteor.Error("wrong-vote-state");
    }

    Songs.update(songId, {
      $pull: { "users_who_disliked": currentUserId },
      $inc: { "like_score": 1 },
    });
  },
  nextTrack: function (roomID) {
    checkLoggedIn(Meteor.userId());

    Songs.update(Rooms.findOne(roomID).current_song_id, {
      $set: { "played": true }
    });
		var newCurrentSong = Songs.findOne({
          room_id: roomID, played: false
        }, {
          sort: {like_score: -1, "added_time": 1}
        });
		if (newCurrentSong) {
			Rooms.update(roomID, {"$set": {
				current_song_id: newCurrentSong._id,
				current_song_started: new Date(),
        has_started_playing: true,
			}});
			Songs.update(newCurrentSong._id, {"$set": {played: true}});
		}
	},
  addSong: function (searchObject, room_id) {
    var currentUserId = Meteor.userId();
    checkLoggedIn(currentUserId);

    Songs.insert({
      "room_id": room_id,
      "title": searchObject.title,
      "video_id": searchObject.videoId,
      "added_by_user_id": currentUserId,
      "added_time": new Date(),
      "thumbnail": searchObject.thumbnail,
      "channelTitle": searchObject.channelTitle,
    });
  },
  addRoom: function (roomName) {
    if (roomName) {
      Rooms.insert({
        name: roomName,
        added_time: new Date(),
      });
    }
  }
});
