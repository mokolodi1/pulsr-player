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
	"submit #add_room": function(event, instance) {
    if (event.which === 1) { // left click
      event.preventDefault();
  		Rooms.insert({
  			name: event.target.new_room_name.value,
  			added_time: new Date(),
  		});
  		instance.hasClicked.set(false);
    }
	}
});

Template.logoutBox.onRendered(function() {
  $('#logout-link').click(function() {
    Meteor.logout();
  });
});
