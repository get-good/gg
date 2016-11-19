Meteor.methods({
  addEvent( event ) {
    check( event, {
      title: Match.Optional( String ),
      start: String,
      end: String,
      allDay: Boolean,
      type: String,
    });

    try {
      return Events.insert( event );
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  }
});