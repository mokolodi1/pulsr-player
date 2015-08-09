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
