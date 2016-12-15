import {ReactiveDict} from 'meteor/reactive-dict';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {Template} from 'meteor/templating';
import {_} from 'meteor/underscore';
import {Profile, ProfileSchema} from '../../api/profile/profile.js';

Template.User_Home_Page.events({
  'click .about'(event) {
    event.preventDefault();
    FlowRouter.go('About');
  },
  'click .cas-logout': function casLogout(event) {
    event.preventDefault();
    Meteor.logout();
    FlowRouter.go('Public_Landing_Page');
    return false;
  },

});

Template.User_Home_Page.helpers({
  ProfileList() {
    var currentUser = Meteor.userId();
    if (Profile.find({ createdBy: currentUser }).fetch().length === 0) {
      Profile.insert({
        pic: 'http://i.imgur.com/LikUNLc.png',
        about: 'I enjoy ICS',
        firstLogin: true,
        sensei: 'ICS 332',
        grass: 'ICS 314',
        createdBy: currentUser,
        isAdmin: false,
      })
    }
    return Profile.find({ createdBy: currentUser });
  },
})

Template.User_Home_Page.onRendered(function tutorialUserHome() {
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
      if (first == true) {
        new Confirmation({
          message: "This is your home page! From here, you can edit your profile, read your about page and even check your current helper rating. When you\'re ready to explore, feel free to click any of the links in the navbar! Notifications will be displayed if you have something scheduled for today. Disable this tutorial in the edit profile page.",
          title: "Home",
          cancelText: "Disable Tutorial",
          okText: "Okay, thanks",
          success: true, // whether the button should be green or red
          focus: "ok" // which button to autofocus, "cancel" (default) or "ok", or "none"
        }, function (ok) {
          if (!ok) {
            FlowRouter.go('User_Profile_Page');
            return;
          }
        });
        return false;
      }
});
