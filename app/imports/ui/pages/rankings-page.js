import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { Profile, ProfileSchema } from '../../api/profile/profile.js';
import { Rating } from '../../api/ratings/ratings.js';

let currentUser = Meteor.userId();
Template.Rankings_Page.onRendered(function tutorialRankings() {
  var currentUser = Meteor.userId();
  var pro = Profile.find({ createdBy: currentUser }).fetch()
  var first = true;
  _.each(pro, function (value, key) {
        _.each(value, function (val, k) {
          if (k == 'firstLogin') {
            first = val;
          }
        })
      }
  )

  if(first == true) {
    new Confirmation({
      message: "The rankings for all senseis are displayed here. Strive to be the top sensei! Disable this tutorial in the edit profile page.",
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
  ratingsList() {
    return Rating.find();
  },
  ProfileList() {
    var currentUser = Meteor.userId();
    return Profile.find({ createdBy: currentUser });
  },
});
