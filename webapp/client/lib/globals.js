Template.registerHelper("print", function (object) {
  console.log(object);
});

Template.registerHelper("isPhone", function () {
  return Meteor.Device.isPhone();
});

Blaze.TemplateInstance.prototype.parentTemplate = function (levels) {
  var view = Blaze.currentView;
  if (typeof levels === "undefined") {
    levels = 1;
  }
  while (view) {
    if (view.name.substring(0, 9) === "Template." && !(levels--)) {
      return view.templateInstance();
    }
    view = view.parentView;
  }
};

// Setup the user presence state function on the client
Presence.state = function() {
  var state = {
    currentRoomId: Session.get('currentRoomId')
  };

  if (Meteor.user()) {
    state.firstName = Meteor.user().profile.firstName;
    state.lastName = Meteor.user().profile.lastName;
    state.profilePicture = Meteor.user().profile.profilePicture;
  }
  return state;
};