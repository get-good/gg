Template.User_Home_Page.events({
  'click .about'(event) {
    event.preventDefault();
    FlowRouter.go('About');
  },
});