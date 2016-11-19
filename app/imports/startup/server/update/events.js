Meteor.methods({
  editEvent( event ) {
    check( event, {
      _id: String,
      title: Match.Optional( String ),
      start: Match.Optional( String ),
      end: Match.Optional( String ),
      allDay: Match.Optional( Boolean ),
      type: Match.Optional( String ),
    });

    try {
      return Events.update( event._id, {
        $set: event
      });
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  }
});