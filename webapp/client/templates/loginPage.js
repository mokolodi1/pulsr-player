Template.loginPage.rendered = function() {
  document.getElementById('background-video').playbackRate = 0.5;
};

Template.loginPage.events({
  'click #fb-login-button': function(e) {
    console.log("Logging in...");
    Meteor.loginWithFacebook({
      requestPermissions: ['email', 'user_friends'],
    }, function(err) {
      if (err) {
        throw err;
      }

      Meteor.call('getProfilePicture', function(err, data) {
        if (err) {
          throw err;
        }

        Router.go("dashboard");
      });
    });
  },
  'submit form': function(event) {
    event.preventDefault();
    var email = $('[name=email]').val();
    var password = $('[name=password]').val();
    Meteor.loginWithPassword(email, password, function(error){
      console.log(error);
    });
  }
});
