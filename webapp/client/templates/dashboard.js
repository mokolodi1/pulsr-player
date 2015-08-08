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
