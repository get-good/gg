import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

/* eslint-disable object-shorthand */

Template.Header.helpers({
  /**
   * @returns {String} Returns the user who's logged in
   */
  user: function user() {
    return Meteor.user() ? Meteor.user().profile.name : 'No logged in user';
  },
});


Template.Header.onRendered(function enableDropDown() {
  this.$('.dropdown').dropdown({
    action: 'select',
  });
});