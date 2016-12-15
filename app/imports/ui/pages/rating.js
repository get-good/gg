import {ReactiveDict} from 'meteor/reactive-dict';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {Template} from 'meteor/templating';
import {_} from 'meteor/underscore';
import {Profile} from '../../api/profile/profile.js';
import {Rating, RatingSchema} from '../../api/ratings/ratings.js';

const displayErrorMessages = 'displayErrorMessages';

Template.rating.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Rating');
  });
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = RatingSchema.namedContext('rating');
});

Template.rating.helpers({
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
    console.log(Profile.find({ createdBy: currentUser }).fetch());
    console.log(Profile.find().fetch());
    return Profile.find({ createdBy: currentUser });
  },
});

Template.rating.events({
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
    FlowRouter.go('Edit_Profile');
  },
  'submit .contact-data-form'(event, instance) {
    event.preventDefault();
    // Get name (text field)
    const username = event.target.username.value;
    const rating = event.target.rating.value;
    const updatedRating = { username, rating, };
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newStudentData reflects what will be inserted.
    RatingSchema.clean(updatedRating);
    // Determine validity.
    instance.context.validate(updatedRating);
    if (instance.context.isValid()) {
      Rating.update(username, { $inc: rating });
      instance.messageFlags.set(displayErrorMessages, false);
      FlowRouter.go('About');
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});