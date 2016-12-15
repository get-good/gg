Template.About.events({
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
    FlowRouter.go('rating');
  },
  'click .edit'(event) {
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

import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { Profile, ProfileSchema } from '../../api/profile/profile.js';

Template.About.events({
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
    FlowRouter.go('rating');
  },
  'click .edit'(event) {
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


const displayErrorMessages = 'displayErrorMessages';

Template.About.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Profile');
  });
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = ProfileSchema.namedContext('About');
});


Template.About.helpers({
  contactField(fieldName) {
    const profile = Profile.findOne(FlowRouter.getParam('_id'));
    // See https://dweldon.silvrback.com/guards to understand '&&' in next line.
    return profile && profile[fieldName];
  },
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  displayFieldError(fieldName) {
    const errorKeys = Template.instance().context.invalidKeys();
    return _.find(errorKeys, (keyObj) => keyObj.name === fieldName);
  },
  ProfileList() {
    var currentUser = Meteor.userId();
    //console.log(Profile.find({ createdBy: currentUser }).fetch());
    //console.log(Profile.find().fetch());
    return Profile.find({ createdBy: currentUser });
  },
});

// Template.About.onRendered(function enableSemantic() {
//   const template = this;
//   template.subscribe('StudentData', () => {
//     // Use this template.subscribe callback to guarantee that the following code executes after subscriptions OK.
//     Tracker.afterFlush(() => {
//       // Use Tracker.afterFlush to guarantee that the DOM is re-rendered before calling JQuery.
//       template.$('select.ui.dropdown').dropdown();
//       template.$('.ui.selection.dropdown').dropdown();
//       template.$('select.dropdown').dropdown();
//       template.$('.ui.checkbox').checkbox();
//       template.$('.ui.radio.checkbox').checkbox();
//     });
//   });
// });

Template.About.events({
  'submit .contact-data-form'(event, instance) {
    event.preventDefault();
    // Get name (text field)
    const pic = event.target.pic.value;
    const about = event.target.about.value;
    const firstLogin = true;
    const sensei = event.target.sensei.value;
    const grass = event.target.grass.value;
    let isAdmin = false;
    const updatedProfile = { pic,about,firstLogin,sensei,grass, isAdmin };
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newStudentData reflects what will be inserted.
    ProfileSchema.clean(updatedProfile);
    // Determine validity.
    instance.context.validate(updatedProfile);
    if (instance.context.isValid()) {
      Profile.update(FlowRouter.getParam('_id'), { $set: updatedProfile });
      instance.messageFlags.set(displayErrorMessages, false);
      FlowRouter.go('About');
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});
Template.About.onRendered(function tutorialAbout() {
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
      message: "This is a page that disiplays information about you. You can edit the information in the profile page. Disable this tutorial in the edit profile page.",
      title: "About",
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