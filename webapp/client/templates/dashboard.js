Template.dashboard.onCreated(function () {
  var instance = this;

  instance.innerTemplate = new ReactiveVar("plusSign");
});

// make a helper to get
Template.dashboard.helpers({
  getInnerTemplate: function () {
    return Template.instance().innerTemplate.get();
  },
});

Template.dashboard.events({
  "click .thingy": function (event, instance) {
    if (instance.innerTemplate.get() ==- "plusSign")
  }
});

Template.dashboard.helpers({
	rooms: function() {
		return Rooms.find();
	},
});

Template.dashboard.events({
	'click #add_icon': function(event) {
		//Switch out template
	},
});
