var roomsSchema = new SimpleSchema({
  "name": { type: String },
  "added_time": { type: Date },
  "listening_user_ids": {
    type: [Meteor.ObjectID],
    optional: true
  },
  "current_song_id": { type: Meteor.ObjectID, optional: true },
  "current_song_started": { type: Date, optional: true },
  "has_started_playing": { type: Boolean, defaultValue: false },
});

var songsSchema = new SimpleSchema({
	"room_id": { type: Meteor.ObjectID },
	"title": { type: String }, // aka title
	"video_id": { type: String },
	"soundcloud_id": { type: String },
	"added_by_user_id": { type: Meteor.ObjectID },
	"added_time": { type: Date },
	"played": {
		type: Boolean,
		defaultValue: false,
	},
  "thumbnail": { type: String, optional: true },
  "channelTitle": { type: String, optional: true },
  "viewCount": { type: Number, optional: true },
  "dislikeCount": { type: Number, optional: true },
  "likeCount": { type: Number, optional: true },

  // users can only vote once for a song
  // users can only be in one of these lists
  // (can't upvote and downvote the same song)
  "like_score": {
    type: Number,
    defaultValue: 0,
  },
  "users_who_liked": { type: [Meteor.ObjectID], defaultValue: [] },
  "users_who_disliked": { type: [Meteor.ObjectID], defaultValue: [] },
});

Rooms = new Mongo.Collection("rooms");
Rooms.attachSchema(roomsSchema);

Songs = new Mongo.Collection("songs");
Songs.attachSchema(songsSchema);

// TODO: disallow updates/writes
