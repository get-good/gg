Template.Agreement_Page.events({
  'submit .agree'(event) {
    event.preventDefault();
    FlowRouter.go('User_Home_Page');
  },
  'submit .disagree'(event) {
    event.preventDefault();
    FlowRouter.go('Public_Landing_Page');
  },
});
