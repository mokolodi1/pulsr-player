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
