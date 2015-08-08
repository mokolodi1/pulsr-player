/*function createDuration(hours, minutes, seconds) {
  return new Date(0, 0, 0, 0, 0, hours, minutes, seconds);
}

// On server startup, if the database is empty, create some initial data.
Meteor.startup(function () {

  if (Meteor.users.findOne({"username": "mokolodi1"}) === undefined) {
    Accounts.createUser({
      // username: 'mokolodi1',
      email: 'mokolodi1@gmail.com',
      password: 'asdfasdf',
      profile: {
        first_name: 'Teo',
        last_name: 'Fleming',
      }
    });

  }

  if (Rooms.find().count() === 0) {
    var meteorHackathonId = Rooms.insert({
      "name": "Meteor hackathon",
      "added_time": new Date(2015, 08, 08, 12, 03),
    });
    var coolCatsChillingId = Rooms.insert({
      "name": "Cool cats chilling",
      "added_time": new Date(),
    });

    // if rooms are empty, remove all the songs
    Songs.remove({});

    Songs.insert({
      "room_id": meteorHackathonId,
      "name": "Dark Horse",
      "artist": "Katy Perry",
      "url": "https://www.youtube.com/watch?v=0KSOMA3QBU0",
      "added_by_user_id": Meteor.users.findOne({"username": "mokolodi1"})._id,
      "added_time": new Date(),
      "duration": createDuration(0, 3, 45),
    });

    Songs.insert({
      "room_id": meteorHackathonId,
      "name": "Dark Horse",
      "artist": "Katy Perry",
      "url": "https://www.youtube.com/watch?v=0KSOMA3QBU0",
      "added_by_user_id": Meteor.users.findOne({"username": "mokolodi1"})._id,
      "added_time": new Date(),
      "duration": createDuration(0, 3, 45),
    });
  }
});*/
