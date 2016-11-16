let isPast = (date) => {
  let today = moment().format();
  return moment(today).isAfter(date);
};

Template.events.onCreated(() => {
  let template = Template.instance();
  template.subscribe('events');
});

Template.events.onRendered(() => {
  $('#events-calendar').fullCalendar({
    events(start, end, timezone, callback, allDay) {
      let data = Events.find().fetch().map((event) => {
        event.editable = !isPast(event.start);
        return event;
      });

      if (data) {
        callback(data);
      }
    },

    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'agendaDay,month,listWeek'
    },

    allDaySlot: false,
    displayEventTime: {
      agendaDay: true,
      month: true,
      "default": true
    },

    eventDrop(event, delta, revert) {
      let date = event.start.format();
      let update = {
        _id: event._id,
        start: date,
        end: date,
      };

      Meteor.call('editEvent', update, (error) => {

      });
    },

    dayClick(date, start, end, jsEvent, view) {

      $('#events-calendar').fullCalendar('changeView', 'agendaDay');
      $('#events-calendar').fullCalendar('gotoDate', date)

      Session.set('eventModal', { type: 'add', date: date.format() });
      $('#add-edit-event-modal').modal('show');
    },

    eventClick(event) {
      Session.set('eventModal', { type: 'edit', event: event._id });
      $('#add-edit-event-modal').modal('show');
    },

  });

  Tracker.autorun(() => {
    Events.find().fetch();
    $('#events-calendar').fullCalendar('refetchEvents');
  });
});

