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

	// users can only vote once for a song
	// users can only be in one of these lists
	// (can't upvote and downvote the same song)
	"like_count": {
		type: Number,
		autoValue: function () {
			var liked = this.field("users_who_liked").value;
			var disliked = this.field("users_who_liked").value;
			if (liked) {
				if (disliked) {
					return liked.length - disliked.length;
				} else {
					return liked.length;
				}
			}
			return 0;
		},
	},
	"users_who_liked": { type: [Meteor.ObjectID], optional: true },
	"users_who_disliked": { type: [Meteor.ObjectID], optional: true },
});

Rooms = new Mongo.Collection("rooms");
Rooms.attachSchema(roomsSchema);

Songs = new Mongo.Collection("songs");
Songs.attachSchema(songsSchema);

// TODO: disallow updates/writes
