// Sets the API key and stuff
ServiceConfiguration.configurations.upsert({
    service:"facebook"
}, {
    $set: {
        "appId" : "995791350453194",
        "secret" : "64206cdd5b02e60598c82eec2f2cd4c6",
        "loginStyle" : "popup"
    }
});

function Facebook(accessToken) {
  this.fb = Meteor.npmRequire('fbgraph');
  this.accessToken = accessToken;
  this.fb.setAccessToken(this.accessToken);
  this.options = {
    timeout: 3000,
    pool: {maxSockets: Infinity},
    headers: {connection: "keep-alive"}
  }
  this.fb.setOptions(this.options);
}

Facebook.prototype.query = function(query, method) {
  var self = this;
  var method = (typeof method === 'undefined') ? 'get' : method;
  var data = Meteor.sync(function(done) {
      self.fb[method](query, done);
  });
  return data.result;
}

Facebook.prototype.getUserData = function() {
  return this.query('me');
}

Facebook.prototype.getFriendsData = function() {
  return this.query('/me/friends');
}

Facebook.prototype.getProfilePicture = function() {
  return this.query('/me/picture');
}

Meteor.methods({
  getUserData: function() {
    var fb = new Facebook(Meteor.user().services.facebook.accessToken);
    var data = fb.getUserData();
    return data;
  },
  getFriendsData: function() {
    var fb = new Facebook(Meteor.user().services.facebook.accessToken);
    var data = fb.getFriendsData();
    return data;
  },
  getProfilePicture: function() {
    var fb = new Facebook(Meteor.user().services.facebook.accessToken);
    var data = fb.getProfilePicture();
    Meteor.users.update({_id: Meteor.userId()}, {$set: {
      "profile.profilePicture": data.location
    }});
    return data;
  }
});