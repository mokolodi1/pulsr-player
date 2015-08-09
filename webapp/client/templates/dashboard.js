Template.addView.onCreated(function () {
  var instance = this;

	Template.instance().hasClicked = new ReactiveVar(false);
});

// make a helper to get
Template.dashboard.helpers({
	rooms: function() {
		return Rooms.find();
	},
});

Template.addView.helpers({
	hasClicked: function () {
		return Template.instance().hasClicked.get();
	},
});

Template.addView.events({
  "click #add_icon": function (event, instance) {
    if (event.which === 1) { // left click
      event.preventDefault();
      instance.hasClicked.set(true);
    }
  },
	"click #add-room-button": function(event, instance) {
    console.log("AAA");
    if (event.which === 1) { // left click
      event.preventDefault();
      Meteor.call('addRoom', $('#new_room_name').val())
  		instance.hasClicked.set(false);
    }
	},
  "keypress input": function(event, instance) {
    if (event.charCode == 13) {
      Meteor.call('addRoom', $('#new_room_name').val())
      instance.hasClicked.set(false);
    }
  },
});


Template.logoutBox.onRendered(function() {
  $('#logout-link').click(function() {
    Meteor.logout();
  });
});
