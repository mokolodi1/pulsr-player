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
    waitOn: function () {
      console.log("waitOn: we'll wait for the subscriptions to be ready");
    },
    // subscriptions: function () {
    //   return Meteor.subscribe("Room",
    //     this.params.patient_label,
    //     function () {
    //       console.log("loaded PatientReport subscription");
    //     }
    //   );
    // },
    data: function () {
      // TODO: if room doesn't exist...
      return { "rooms": Rooms.find() };
    },
    onStop: function () {
      console.log("onStop called");
    },
  });

  this.route('room', {
    path: '/room/:roomName',
    waitOn: function () {
      console.log("waitOn: we'll wait for the subscriptions to be ready");
    },
    // subscriptions: function () {
    //   return Meteor.subscribe("Room",
    //     this.params.patient_label,
    //     function () {
    //       console.log("loaded PatientReport subscription");
    //     }
    //   );
    // },
    data: function () {
      // TODO: if room doesn't exist...
      return Rooms.findOne({"name": this.params.roomName});
    },
    onStop: function () {
      console.log("onStop called");
    },
  });
});
