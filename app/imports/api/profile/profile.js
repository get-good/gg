import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Profile = new Mongo.Collection( 'Profile' );

export const ProfileSchema = new SimpleSchema({
  'pic': {
    type: String,
    label: 'The title of this event.'
  },
  'about': {
    type: String,
    label: 'When this event will start.'
  },
  'firstLogin': {
    type: Boolean,
    label: 'Not all day'
  },
  'sensei': {
    type: String,
    label: 'When this event will start.'
  },
  'grass': {
    type: String,
    label: 'When this event will start.'
  },
  'createdBy': {
    type: String,
    label: 'The title of this event.'
  },
});

Profile.attachSchema(ProfileSchema);