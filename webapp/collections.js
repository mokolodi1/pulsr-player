var roomsSchema = new SimpleSchema({
  "name": { type: String },
  "added_time": { type: Date },
  "listening_user_ids": { type: [Meteor.ObjectID] },
  "current_song_id": { type: Meteor.ObjectID },
  "current_song_started": { type: Date },
});

var songsSchema = new SimpleSchema({
  "name": { type: String },
  "url": { type: String },
  "added_by_user_id": { type: Meteor.ObjectID },
  "added_time": { type: Date },
  "duration": { type: Date },

  // users can only vote once for a song
  // users can only be in one of these lists
  // (can't upvote and downvote the same song)
  "users_who_liked": { type: [Meteor.ObjectID] },
  "users_who_disliked": { type: [Meteor.ObjectID] },
});

Rooms = new Meteor.collection("rooms");
Rooms.attachSchema(roomsSchema);

Songs = new Meteor.collection("songs");
Songs.attachSchema(songsSchema);

// TODO: disallow updates/writes
