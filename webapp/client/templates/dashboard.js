Template.addView.onCreated(function () {
  var instance = this;

	Template.instance().hasClicked = new ReactiveVar(false);
});

Template.addView.rendered = function () {
  console.log("hmmm");

};

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
      setTimeout(function () {
        $("#new_room_name").focus();
      }, 10);
    }
  },
  "blur #new_room_name": function (event, instance) {
    event.preventDefault();
    instance.hasClicked.set(false);
  },
	"click #add-room-button": function(event, instance) {
    console.log("AAA");
    if (event.which === 1) { // left click
      event.preventDefault();
      Meteor.call('addRoom', $('#new_room_name').val());
  		instance.hasClicked.set(false);

      this.autorun(function () {
        console.log(document.activeElement);
      });
    }
	},
  "keypress input": function(event, instance) {
    if (event.charCode == 13) {
      Meteor.call('addRoom', $('#new_room_name').val());
      instance.hasClicked.set(false);
    }
  },
});


Template.logoutBox.onRendered(function() {
  $('#logout-link').click(function() {
    Meteor.logout();
  });
});
