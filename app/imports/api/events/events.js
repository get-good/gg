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
  'stime': {
    type: String,
    label: 'What time this event will start.'
  },
  'etime': {
    type: String,
    label: 'What time this event will end.'
  },
});

Events.attachSchema( EventsSchema );