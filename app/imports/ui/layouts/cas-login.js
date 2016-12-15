import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

Template.Cas_Login.helpers({
  user: function user() {
    return Meteor.user() ? Meteor.user().profile.name : '  please login';
  },
})

Template.Cas_Login.events({
  /**
   * Handle the click on the logout link.
   * @param event The click event.
   * @returns {boolean} False.
   */
  'click .profile': function profile(event) {
    event.preventDefault();
    FlowRouter.go('User_Profile_Page');
  },
  'click .help': function help(event) {
    event.preventDefault();
    FlowRouter.go('Help_Page');
  },
  'click .cas-logout': function casLogout(event) {
    event.preventDefault();
    Meteor.logout();
    FlowRouter.go('Public_Landing_Page');
    return false;
  },

  /**
   * Handle the click on the login link.
   * @param event The click event.
   * @returns {boolean} False.
   */
  'click .cas-login': function casLogin(event, instance) {
    event.preventDefault();
    const callback = function loginCallback(error) {
      FlowRouter.go('User_Home_Page');
      if (error) {
        FlowRouter.go('Public_Landing_Page');
        console.log(error);
        return error;
      }
    };

    new Confirmation({
      message: "Please agree to the following before proceeding to the next page: " +
      "This application has been developed by students at the University of Hawaii. It is provided on a pilot basis and there are no guarantees regarding future access to this system. All users are expected to adhere to the principles specified in the University of Hawaii Systemwide Student Conduct Code.  The developers reserve the right to ban access to this system by any students who violate this code of conduct or otherwise display inappropriate behavior on the site.",
      title: "Terms of Use",
      cancelText: "Cancel",
      okText: "Agree",
      success: true, // whether the button should be green or red
      focus: "cancel" // which button to autofocus, "cancel" (default) or "ok", or "none"
    }, function (ok) {
      if (!ok) {
        FlowRouter.go('Public_Landing_Page');
        return;
      }
      console.log('ok');
      Meteor.call('delete', this._id);
      Meteor.loginWithCas(callback);
    });
    return false;
  },
});

// Here's how to do the required initialization for Semantic UI dropdown menus.
Template.Cas_Login.onRendered(function enableDropDown() {
  this.$('.dropdown').dropdown({
    action: 'select',
  });
});
