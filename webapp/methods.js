
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

    console.log("at the end:", Songs.findOne(songId));
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

    console.log("at the end:", Songs.findOne(songId));
  },
  downvote: function (songId) {

    var currentUserId = Meteor.userId();
    checkLoggedIn(currentUserId);

    var thisSong = Songs.findOne(songId);

    if (contains(thisSong.users_who_disliked, currentUserId)) {
      throw new Meteor.Error("already-downvoted");
    }

    if (contains(thisSong.users_who_liked, currentUserId)) {
      console.log("decrease by 2");
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

    console.log("at the end:", Songs.findOne(songId));
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

    console.log("at the end:", Songs.findOne(songId));
  },
  setCurrentSong: function (roomID) {
		console.log(roomID);
		var newCurrentSong = Songs.findOne({room_id: roomID}, {sort: {like_score: -1}});
		Rooms.update(roomID, {"$set": {current_song_id: newCurrentSong._id}});
	},
});
