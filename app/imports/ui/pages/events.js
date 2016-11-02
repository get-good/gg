let isPast = ( date ) => {
  let today = moment().format();
  return moment( today ).isAfter( date );
};

Template.events.onCreated( () => {
  let template = Template.instance();
  template.subscribe( 'events' );
});

Template.events.onRendered( () => {
  $( '#events-calendar' ).fullCalendar({
    events( start, end, timezone, callback ) {
      let data = Events.find().fetch().map( ( event ) => {
        event.editable = !isPast( event.start );
        return event;
      });

      if ( data ) {
        callback( data );
      }
    },

    dayClick( date ) {
      FlowRouter.go('Add_Session');
      Session.set( 'eventModal', { type: 'add', date: date.format() } );
    },

    eventClick( event ) {
      Session.set( 'eventModal', { type: 'edit', event: event._id } );
      new Confirmation({
        message: "Are you sure you want to delete this event?",
        title: "Confirmation",
        cancelText: "Cancel",
        okText: "Ok",
        success: true, // whether the button should be green or red
        focus: "cancel" // which button to autofocus, "cancel" (default) or "ok", or "none"
      }, function (ok) {
        Events.remove(event._id);
      });
    },

  });

  Tracker.autorun( () => {
    Events.find().fetch();
    $( '#events-calendar' ).fullCalendar( 'refetchEvents' );
  });

});