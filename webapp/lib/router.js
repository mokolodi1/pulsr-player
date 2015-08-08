// router stuff

/*

routes: /url ==> templateName
/login ==> loginPage
/ ==> dashboard
/room/roomName ==> room

redirects:
if not logged in ==> /login

*/

Router.configure({
  // the appNotFound template is used for unknown routes and missing lists
  notFoundTemplate: 'pageNotFound',

  // show the appLoading template whilst the subscriptions below load their data
  loadingTemplate: 'appLoading', // TODO: spinner
});

Router.map(function() {
  // TODO: force to log in if not logged in already
  // redirect to 

  this.route('patientReport', {
    path: '/PatientCare/patientReport/:patient_label',
    waitOn: function () {
      console.log("waitOn: we'll wait for the subscriptions to be ready");
    },
    subscriptions: function () {
      return Meteor.subscribe("PatientReport",
        this.params.patient_label,
        function () {
          console.log("loaded PatientReport subscription");
        }
      );
    },
    data: function () {
      var currentLabel = this.params.patient_label;
      var currentReport = PatientReports.findOne({
        "patient_label": currentLabel
      });
      return currentReport;
    },
    onStop: function () {
      console.log("onStop (router.js)");
    },
  });

});
