import { Profile, ProfileSchema } from '../../api/profile/profile.js';
import {_} from 'meteor/underscore';

const ProfileSeeds = [
  {
    pic: 'http://i.imgur.com/LikUNLc.png',
    about: 'I like cats',
    firstLogin: true,
    sensei: 'ICS 332',
    grass: 'ICS 314',
    createdBy: 'mdDJK3GNT2r8dEXBB',
  }
];

// if (Profile.find().count() === 0){
//   _.each(ProfileSeeds, function seedProfile(stuff){
//     Profile.insert(stuff);
//   });
// }