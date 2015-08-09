Accounts.onLogin(function(attempt) {
	var user = attempt.user;

	Meteor.users.update({_id: user._id}, {$set: {
      "profile.firstName": user.services.facebook.first_name,
      "profile.lastName": user.services.facebook.last_name
    }});
});
