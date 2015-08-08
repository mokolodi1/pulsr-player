Template.dashboard.onCreated(function () {
  var instance = this;

  instance.hasClicked = new ReactiveVar(false);
});

// make a helper to get
Template.dashboard.helpers({
  hasClicked: function () {
    return Template.instance().hasClicked.get();
  },
  rooms: function() {
		return Rooms.find();
	},
});

Template.dashboard.events({
  "click #add_icon": function (event, instance) {
    instance.hasClicked.set(true);
  }
});
