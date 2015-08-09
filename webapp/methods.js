Meteor.methods({
  upvote: function (songId) {

    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    console.log("upvote meteor method");
    console.log("songId: ", songId);

    var thisSong = Songs.findOne(songId);
    if (thisSong.users_who_liked) {
      // if they already like it, they want to unlike it
      Songs.update(songId, {
        $pull: { "users_who_liked": Meteor.userId() },
      });
    } else {
      Songs.update(songId, {
        $addToSet: { "users_who_liked": Meteor.userId() },
        $pull: { "users_who_disliked": Meteor.userId() },
      });
    }
  },
  downvote: function (songId) {

    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    console.log("downvote meteor method");
    console.log("songId: ", songId);

  },
});
