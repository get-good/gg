Template.Agreement_Page.events({
  'click .agree'(event) {
    event.preventDefault();
    FlowRouter.go('User_Home_Page');
  },
  'click .disagree'(event) {
    event.preventDefault();
    FlowRouter.go('Public_Landing_Page');
  },
});