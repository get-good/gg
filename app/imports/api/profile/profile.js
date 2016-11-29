import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const ProfileInfo = new Mongo.Collection('ProfileInfo');

/**
 * Create the schema for Profile Information
 */
export const ProfileInfoSchema = new SimpleSchema({
  rating: {
    label: 'rating',
    type: Number,
    optional: false,
  },
});

ProfileInfo.attachSchema(ProfileInfoSchema);
