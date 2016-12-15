import { Rating, RatingSchema } from '../../api/ratings/ratings.js';
import {_} from 'meteor/underscore';

const RatingSeeds = [
  {
    username: 'dppavao',
    rating: 0,
  }
];

if (Rating.find().count() === 0){
  _.each(RatingSeeds, function seedRating(stuff){
    Rating.insert(stuff);
  });
}