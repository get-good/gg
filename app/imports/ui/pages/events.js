let isPast = (date) => {
  let today = moment().format();
  return moment(today).isAfter(date);
};

//function to calculate window height
function get_calendar_height() {
  return $(window).height() - 30;
}

Template.events.onCreated(() => {
  let template = Template.instance();
  template.subscribe('events');
});

Template.events.onRendered(() => {
  $(document).ready(function () {
    $(window).resize(function () {
      $('#calendar').fullCalendar('option', 'height', get_calendar_height());
    });

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

      eventRender: function (event, element) {
        if (event.type == 'Grasshopper') {
          element.css('background-color', '#61b2a7')
        }
        else {
          element.css('background-color', '#999900')
          element.css('color', 'black')
        }
      },

      height: get_calendar_height,

      eventDurationEditable: true,

      schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',

      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'agendaDay,month,listWeek'
      },

      allDaySlot: false,

      displayEventTime: {
        agendaDay: true,
        month: true,
        list: true,
      },

      displayEventEnd: true,

      eventDrop(event, delta, revert) {
        let start = event.start.format();
        let end = event.end;
        if (end != null) {
          end = event.end.format();
        }
        else {
          end = event.start.format();
        }
        let update = {
          _id: event._id,
          start: start,
          end: end,
        };

        Meteor.call('editEvent', update, (error) => {

        });
      },

      eventResize(event, delta, revert) {
        let start = event.start.format();
        let end = event.end.format();
        let update = {
          _id: event._id,
          start: start,
          end: end,
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
  if(showTutorial) {
    new Confirmation({
      message: "Here you can add, edit and remove a session from your current calendar! To begin, please select a date.",
      title: "Calendar",
      cancelText: "Quit Tutorial",
      okText: "Next Page",
      success: true, // whether the button should be green or red
      focus: "ok" // which button to autofocus, "cancel" (default) or "ok", or "none"
    }, function (ok) {
      if (!ok) {
        FlowRouter.go('events');
        showTutorial = false;
        return;
      }
      FlowRouter.go('Rankings_Page');
    });
    return false;
  }
  });
