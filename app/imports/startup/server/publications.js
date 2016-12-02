import { Profile } from '../../api/profile/profile.js';
import { Meteor } from 'meteor/meteor';

Meteor.publish('Profile', function publishProfileData() {
  return Profile.find();
});
