import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { Profile, ProfileSchema } from '../../api/profile/profile.js';

Template.User_Profile_Page.events({
  'click .about'(event) {
    event.preventDefault();
    FlowRouter.go('About');
  },
  'click .sensei'(event) {
    event.preventDefault();
    FlowRouter.go('Add_Sensei');
  },
  'click .grass'(event) {
    event.preventDefault();
    FlowRouter.go('Add_Grasshopper');
  },
  'click .rating'(event) {
    event.preventDefault();
    FlowRouter.go('Rankings_Page');
  },
  'click .edit'(event) {
    event.preventDefault();
    FlowRouter.go('Edit_Profile');
  },
  'click .cas-logout': function casLogout(event) {
    event.preventDefault();
    Meteor.logout();
    FlowRouter.go('Public_Landing_Page');
    return false;
  },
});

Template.User_Profile_Page.onRendered(function tutorialUserProfile() {
  if(showTutorial) {
    new Confirmation({
      message: "This is your profile! Here you may edit the courses you have taken and for which you are willing to provide help for! You may also select which classes you are currently taking and for which you may need help!",
      title: "Profile",
      cancelText: "Quit Tutorial",
      okText: "Next Page",
      success: true, // whether the button should be green or red
      focus: "ok" // which button to autofocus, "cancel" (default) or "ok", or "none"
    }, function (ok) {
      if (!ok) {
        FlowRouter.go('User_Profile_Page');
        showTutorial = false;
        return;
      }
      FlowRouter.go('events');
    });
    return false;
  }
});

Template.User_Profile_Page.helpers({
  ProfileList() {
    return Profile.find();
  },
});

Template.User_Profile_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Profile');
  });
});