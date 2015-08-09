// router stuff

/*

routes: /url ==> templateName
/login ==> loginPage
/ ==> dashboard
/room/roomName ==> room

redirects:
if not logged in ==> /login

*/

Router.configure({
  // the appNotFound template is used for unknown routes and missing lists
  notFoundTemplate: 'pageNotFound',

  // show the appLoading template whilst the subscriptions below load their data
  loadingTemplate: 'appLoading', // TODO: spinner
});

Router.map(function() {
  // TODO: force to log in if not logged in already
  // redirect to

  this.route('loginPage', {
    path: '/login',
  });

  this.route('dashboard', {
    path: '/',
    subscriptions: function () {
      return Meteor.subscribe("allRooms", function () {
        console.log("loaded allRooms subscription");
      });
    },
    data: function () {
      return { "rooms": Rooms.find() };
    },
  });

  this.route('room', {
    path: '/room/:roomName',
    subscriptions: function () {
      return Meteor.subscribe("singleRoom",
        this.params.roomName,
        function () {
          console.log("loaded singleRoom subscription");
        }
      );
    },
    data: function () {
      // TODO: if room doesn't exist...

      var currentRoom = Rooms.findOne({"name": this.params.roomName});
      console.log("currentRoom: ", currentRoom);
      if (currentRoom) {
        return {
          "room": currentRoom,
          "songs": Songs.find({
                "room_id": currentRoom._id
              }, {
                sort: {"like_score": -1, "added_time": 1}
              }),
        };
      } else {
        return undefined;
      }
    },
    onStop: function () {
      console.log("onStop called");
    },
  });
});

var mustBeSignedIn = function(pause) {
  if (!(Meteor.user() || Meteor.loggingIn())) {
    Router.go('loginPage');
  }

  this.next();
};

Router.onBeforeAction(mustBeSignedIn, {except: ['loginPage']});
