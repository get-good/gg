import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Rating = new Mongo.Collection( 'Rating' );

export const RatingSchema = new SimpleSchema({
  'username': {
    type: String,
    label: 'Rating for profile.'
  },
  'rating': {
    type: Number,
    label: 'Rating for profile.'
  },
});

Rating.attachSchema(RatingSchema);