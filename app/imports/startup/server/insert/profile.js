Meteor.methods({
  addRating( event ) {
    check( event, {
      rating: Number,
    });

    try {
      return ProfileInfo.insert( event );
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  }
});