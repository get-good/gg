Template.Notify.onRendered(function enableDropDown() {
  this.$('.ui.dropdown')
      .dropdown()
  ;
});

Template.Notify.helpers({

  'event': function() {
    console.log(Events.find());
    // return Events.find();
    return Events.find().fetch().map((event) => {
        let isSame = (date) => {
          let today = moment().format();
          return moment(today).isSame(date, 'day');
        };

        //find count of collections in Events
        // var value = Events.find().count();
        //
        if (isSame(event.start) == true) {
          return event.title + ' will occur today!';
        }

        // for(i = 0; i < list.length; i++){
        //   alert(list[i] + ' will occur today!');
        // };
      });
    },

  'count':function(){
    // return Events.find();
    let i = 0;
    Events.find().fetch().map((event) => {
      let isSame = (date) => {
        let today = moment().format();
        return moment(today).isSame(date, 'day');
      };

      //find count of collections in Events
      // var value = Events.find().count();
      //
      if (isSame(event.start) == true) {
        i = i + 1;
      }

      // for(i = 0; i < list.length; i++){
      //   alert(list[i] + ' will occur today!');
      // };
    });
    return i;
  },

});
  // Events.find().fetch().map((event) => {
  //     let isSame = (date) => {
  //       let today = moment().format();
  //       return moment(today).isSame(date, 'day');
  //     };
  //
  //     //find count of collections in Events
  //     // var value = Events.find().count();
  //     //
  //     if (isSame(event.start) == true) {
  //       return event.title + 'will occur today!';
  //     }
  //
  //     // for(i = 0; i < list.length; i++){
  //     //   alert(list[i] + ' will occur today!');
  //     // };
  //
  //     return event.title;
  //   });
  // }
