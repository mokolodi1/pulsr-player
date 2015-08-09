Template.loginPage.events({
  'click #fb-login-button': function(e) {
    console.log("Logging in...");
    Meteor.loginWithFacebook({
      requestPermissions: ['email', 'user_friends'],
    }, function(err) {
      // TODO: Go to dashboard
    });
  },
  'click #btn-user-data': function(e) {
    Meteor.call('getFriendsData', function(err, data) {
      $('#result').text(JSON.stringify(data, undefined, 4));
    });
  }
});