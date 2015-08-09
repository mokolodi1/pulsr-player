Meteor.publish("allRooms", function () {
  return Rooms.find({});
});

Meteor.publish("singleRoom", function (roomName) {
  var roomsCursor = Rooms.find({"name": roomName});

  var currentRoom = roomsCursor.fetch()[0];

  if (currentRoom) {
    return [
      roomsCursor,
      Songs.find({"room_id": currentRoom._id}),
    ];
  } else {
    return []; // this.ready()
  }
});

Meteor.publish('userPresence', function() {
  // Setup some filter to find the users your user
  // cares about. It's unlikely that you want to publish the 
  // presences of _all_ the users in the system.

  // If for example we wanted to publish only logged in users we could apply:
  // filter = { userId: { $exists: true }};
  var filter = {}; 

  return Presences.find(filter, { fields: { state: true, userId: true }});
});