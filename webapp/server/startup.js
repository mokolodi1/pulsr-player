function createDuration(hours, minutes, seconds) {
  return new Date(0, 0, 0, 0, 0, hours, minutes, seconds);
}

// On server startup, if the database is empty, create some initial data.
Meteor.startup(function () {

  //if (Rooms.find().count() === 0) {
  if (true) {
    Rooms.remove({});

    var meteorHackathonId = Rooms.insert({
      "name": "Meteor hackathon",
      "added_time": new Date(2015, 8, 8, 12, 3),
    });
    var coolCatsChillingId = Rooms.insert({
      "name": "Cool cats chilling",
      "added_time": new Date(),
    });

    // if rooms are empty, songs can't be associated with them
    Songs.remove({});

    Songs.insert({
      "room_id": meteorHackathonId,
      "name": "Dark Horse",
      "artist": "Katy Perry",
      "url": "https://www.youtube.com/watch?v=0KSOMA3QBU0",
      "added_by_user_id": "bfsTuy9ZTktFRY3qw",
      "added_time": new Date(),
      "duration": createDuration(0, 3, 45),
      "like_score": 0,
      "users_who_liked": [],
      "users_who_disliked": [],
    });

    Songs.insert({
      "room_id": meteorHackathonId,
      "name": "Bad Blood",
      "artist": "Katy Perry",
      "url": "https://www.youtube.com/watch?v=QcIy9NiNbmo",
      "added_by_user_id": "bfsTuy9ZTktFRY3qw",
      "added_time": new Date(),
      "duration": createDuration(0, 4, 4),
      "like_score": 0,
      "users_who_liked": [],
      "users_who_disliked": [],
    });

    Songs.insert({
      "room_id": coolCatsChillingId,
      "name": "Nyan Cat",
      "artist": "Nyan Cat",
      "url": "https://www.youtube.com/watch?v=QH2-TGUlwu4",
      "added_by_user_id": "bfsTuy9ZTktFRY3qw",
      "added_time": new Date(),
      "duration": createDuration(0, 3, 36),
      "like_score": 0,
      "users_who_liked": [],
      "users_who_disliked": [],
    });


  }
});
