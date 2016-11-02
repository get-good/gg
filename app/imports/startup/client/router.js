import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.route('/', {
  name: 'Public_Landing_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Public_Landing_Page' });
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

FlowRouter.route('/Add_Session', {
  name: 'Add_Session',
  action() {
    BlazeLayout.render('App_Body', { main: 'Add_Session' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_Body', { main: 'App_Not_Found' });
  },
};
