import {ReactiveDict} from 'meteor/reactive-dict';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {Template} from 'meteor/templating';
import {_} from 'meteor/underscore';
import {Profile, ProfileSchema} from '../../api/profile/profile.js';

const displayErrorMessages = 'displayErrorMessages';

Template.Edit_Profile.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Profile');
  });
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = ProfileSchema.namedContext('Edit_Profile');
});

Template.Edit_Profile.helpers({
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
});
Template.Edit_Profile.events({
  'click .cas-logout': function casLogout(event) {
    event.preventDefault();
    Meteor.logout();
    FlowRouter.go('Public_Landing_Page');
    return false;
  },
});

// Template.Edit_Profile.onRendered(function enableSemantic() {
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

Template.Edit_Profile.events({
  'submit .contact-data-form'(event, instance) {
    event.preventDefault();
    // Get name (text field)
    var currentUser = Meteor.userId();
    const pic = event.target.pic.value;
    const about = event.target.about.value;
    const popup = event.target.popup.value;
    const sensei = event.target.sensei.value;
    const grass = event.target.grass.value;
    const createdBy = currentUser;
    let isAdmin = false;
    let firstLogin = false;

    console.log(popup);

    if(popup == 'yes' || popup == 'Yes') {
      firstLogin = true;
    }
    //else firstLogin = false;

    const updatedProfile = { pic, about, firstLogin, sensei, grass, createdBy, isAdmin };
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newStudentData reflects what will be inserted.
    ProfileSchema.clean(updatedProfile);
    // Determine validity.
    instance.context.validate(updatedProfile);
    if (instance.context.isValid()) {
      // Profile.insert({
      //   pic: event.target.pic.value,
      //   about: event.target.about.value,
      //   firstLogin: true,
      //   sensei: event.target.sensei.value,
      //   grass: event.target.grass.value,
      //   createdBy: currentUser,
      // });
      Profile.update(FlowRouter.getParam('_id'), { $set: updatedProfile });
      instance.messageFlags.set(displayErrorMessages, false);
      console.log(Profile.find().fetch());
      FlowRouter.go('About');
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});

const picture = Profile.find();

Template.Edit_Profile.onRendered(function tutorialEditProfile() {
  let currentUser = Meteor.userId();
  if(Profile.find({ createdBy: currentUser }).fetch().firstLogin) {
    new Confirmation({
      message: "Here you can edit your profile. Edit your profile picture by providing a URL to it and edit other information by entering it the fields below. You can permanently disable the tutorial here too.",
      title: "Profile",
      cancelText: "Disable Tutorial",
      okText: "Okay, thanks",
      success: true, // whether the button should be green or red
      focus: "ok" // which button to autofocus, "cancel" (default) or "ok", or "none"
    }, function (ok) {
      if (!ok) {
        FlowRouter.go('Edit_Profile', { _id: this._id });
        return;
      }
      //FlowRouter.go('events');
    });
    return false;
  }
});
