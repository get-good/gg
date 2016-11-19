Events = new Mongo.Collection( 'events' );

let EventsSchema = new SimpleSchema({
  'title': {
    type: String,
    label: 'The title of this event.'
  },
  'start': {
    type: String,
    label: 'When this event will start.'
  },
  'end': {
    type: String,
    label: 'When this event will end.'
  },
  'allDay': {
    type: Boolean,
    label: 'Not all day'
  },
  'type': {
    type: String,
    label: 'Check if student is grasshopper or sensei'
  }
});

Events.attachSchema( EventsSchema );