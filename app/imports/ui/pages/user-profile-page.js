Template.User_Profile_Page.events({
  'click .about'(event) {
    event.preventDefault();
    FlowRouter.go('About');
  },
  'click .sensei'(event) {
    event.preventDefault();
    FlowRouter.go('Add_Sensei');
  },
  'click .grass'(event) {
    event.preventDefault();
    FlowRouter.go('Add_Grasshopper');
  },
  'click .rating'(event) {
    event.preventDefault();
    FlowRouter.go('rating');
  },
  'click .edit'(event) {
    event.preventDefault();
    FlowRouter.go('Edit_Profile');
  },
});

Template.User_Profile_Page.onRendered(function tutorialUserProfile() {
  if(showTutorial) {
    new Confirmation({
      message: "This is your profile! Here you may edit the courses you have taken and for which you are willing to provide help for! You may also select which classes you are currently taking and for which you may need help!",
      title: "Profile",
      cancelText: "quit Tutorial",
      okText: "Next Page",
      success: true, // whether the button should be green or red
      focus: "ok" // which button to autofocus, "cancel" (default) or "ok", or "none"
    }, function (ok) {
      if (!ok) {
        FlowRouter.go('User_Profile_Page');
        showTutorial = false;
        return;
      }
      FlowRouter.go('events');
    });
    return false;
  }
});