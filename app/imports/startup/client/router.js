import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.route('/', {
  name: 'Public_Landing_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Public_Landing_Page' });
  },
});

FlowRouter.route('/admin', {
  name: 'Admin_Home_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Admin_Home_Page' });
    setTimeout(function () {
      alert('As admin, you may edit all sessions or delete them if they\'re inappropriate. Also, you can edit and delete rankings when users graduate or switch majors.');
    }, 400);
  },
});

FlowRouter.route('/home', {
  name: 'User_Home_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'User_Home_Page' });
  },
});

FlowRouter.route('/agreement', {
  name: 'Agreement_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Agreement_Page' });
  },
});

FlowRouter.route('/profile', {
  name: 'User_Profile_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'User_Profile_Page' });
  },
});

FlowRouter.route('/calendar', {
  name: 'events',
  action() {
    BlazeLayout.render('App_Body', { main: 'events' });
  },
});

FlowRouter.route('/rankings', {
  name: 'Rankings_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Rankings_Page' });
  },
});

// FlowRouter.route('/sessions', {
//   name: 'Sessions_Page',
//   action() {
//     BlazeLayout.render('App_Body', { main: 'Sessions_Page' });
//   },
// });

// FlowRouter.route('/Add_Session', {
//   name: 'Add_Session',
//   action() {
//     BlazeLayout.render('App_Body', { main: 'Add_Session' });
//   },
// });

FlowRouter.route('/about', {
  name: 'About',
  action() {
    BlazeLayout.render('App_Body', { main: 'About' });
  },
});

FlowRouter.route('/add-grasshopper', {
  name: 'Add_Grasshopper',
  action() {
    BlazeLayout.render('App_Body', { main: 'Add_Grasshopper' });
  },
});

FlowRouter.route('/add-sensei', {
  name: 'Add_Sensei',
  action() {
    BlazeLayout.render('App_Body', { main: 'Add_Sensei' });
  },
});

FlowRouter.route('/user-rating', {
  name: 'rating',
  action() {
    BlazeLayout.render('App_Body', { main: 'rating' });
  },
});

FlowRouter.route('/edit-profile/:_id', {
  name: 'Edit_Profile',
  action() {
    BlazeLayout.render('App_Body', { main: 'Edit_Profile' });
  },
});

FlowRouter.route('/help', {
  name: 'Help_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Help_Page' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_Body', { main: 'App_Not_Found' });
  },
};
