import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { ProfileInfo, ProfileInfoSchema } from '../../api/profile/profile.js';

const displayErrorMessages = 'displayErrorMessages';

Template.rating.onCreated(function onCreated() {
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = ProfileInfoSchema.namedContext('rating');
});

Template.rating.helpers({
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  displayFieldError(fieldName) {
    const errorKeys = Template.instance().context.invalidKeys();
    return _.find(errorKeys, (keyObj) => keyObj.name === fieldName);
  },
});

Template.rating.events({
  'click .about'(event) {
    event.preventDefault();
    FlowRouter.go('About');
  },
  'click .rating'(event) {
    event.preventDefault();
    FlowRouter.go('rating');
  },
  'click .edit'(event) {
    event.preventDefault();
    FlowRouter.go('Edit_Profile');
  },
  'submit rating-form'(event, instance) {
    event.preventDefault();
    // Get name (text field)
    const rating = event.target.rating.value;
    const newProfileInfo = { rating };
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newStudentData reflects what will be inserted.
    ProfileInfoSchema.clean(newProfileInfo);
    // Determine validity.
    instance.context.validate(newProfileInfo);
    if (instance.context.isValid()) {
      ProfileInfo.insert(newProfileInfo);
      instance.messageFlags.set(displayErrorMessages, false);
      FlowRouter.go('rating');
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});