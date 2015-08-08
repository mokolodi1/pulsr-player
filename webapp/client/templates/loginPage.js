Template.loginPage.events({
  'click #btn-user-data': function(e) {
    Meteor.call('getFriendsData', function(err, data) {
      $('#result').text(JSON.stringify(data, undefined, 4));
    });
  }
});