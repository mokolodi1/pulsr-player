var roomsSchema = new SimpleSchema({
  "name": { type: String },
  "added_time": { type: Date },
  "listening_user_ids": {
    type: [Meteor.ObjectID],
    optional: true
  },
  "current_song_id": { type: Meteor.ObjectID, optional: true },
  "current_song_started": { type: Date, optional: true },
});

var songsSchema = new SimpleSchema({
	"room_id": { type: Meteor.ObjectID },
	"name": { type: String },
	"artist": { type: String },
	"url": { type: String },
	"added_by_user_id": { type: Meteor.ObjectID },
	"added_time": { type: Date },
	"duration": { type: Date },
	"played": {
		type: Boolean,
		autoValue: function() {
			if (!this.field("played").isSet) {
				return false;
			}
		},
	},

  // users can only vote once for a song
  // users can only be in one of these lists
  // (can't upvote and downvote the same song)
  "like_score": {
    type: Number,
  },
  "users_who_liked": { type: [Meteor.ObjectID] },
  "users_who_disliked": { type: [Meteor.ObjectID] },
});

Rooms = new Mongo.Collection("rooms");
Rooms.attachSchema(roomsSchema);

Songs = new Mongo.Collection("songs");
Songs.attachSchema(songsSchema);

// TODO: disallow updates/writes
