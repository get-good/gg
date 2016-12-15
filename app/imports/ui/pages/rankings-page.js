import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { Profile, ProfileSchema } from '../../api/profile/profile.js';

Template.Rankings_Page.onRendered(function tutorialRankings() {
  if(Profile.find({ firstLogin: true })) {
    new Confirmation({
      message: "The rankings for all senseis are displayed here. Strive to be the top sensei!",
      title: "Rankings",
      cancelText: "Disable Tutorial",
      okText: "Okay, thanks",
      success: true, // whether the button should be green or red
      focus: "ok" // which button to autofocus, "cancel" (default) or "ok", or "none"
    }, function (ok) {
      if (!ok) {
        FlowRouter.go('User_Profile_Page', { _id: this._id });
        return;
      }
      //FlowRouter.go('Rankings_Page');
    });
    return false;
  }
});

Template.Rankings_Page.events({
  'click .cas-logout': function casLogout(event) {
    event.preventDefault();
    Meteor.logout();
    FlowRouter.go('Public_Landing_Page');
    return false;
  },
});

Template.Rankings_Page.helpers({
  user: function user() {
    return Meteor.user() ? Meteor.user().profile.name : 'No logged in user';
  },
  ProfileList() {
    var currentUser = Meteor.userId();
    return Profile.find({ createdBy: currentUser });
  },
});
