// $(document).ready(function(){
//   alert('This is your home page! From here, you can edit your profile,read your about page and even check your current helper rating. When you\'re ready to explore, feel free to click any of the links up top!');
// });
showTutorial = true;
Template.User_Home_Page.events({
  'click .about'(event) {
    event.preventDefault();
    FlowRouter.go('About');
  },

});

// Template.User_Home_Page.check = function(){
//   setTimeout(function() {
//     alert('This is your home page! From here, you can edit your profile,read your about page and even check your current helper rating. When you\'re ready to explore, feel free to click any of the links up top!');
//   }, 10);
  // if(!this._rendered) {
  //   this._rendered = true;
  //   alert('This is your home page! From here, you can edit your profile,read your about page and even check your current helper rating. When you\'re ready to explore, feel free to click any of the links up top!');  }
  // };

Template.User_Home_Page.onRendered(function tutorialUserHome() {
  if(showTutorial) {
    new Confirmation({
      message: "This is your home page! From here, you can edit your profile,read your about page and even check your current helper rating. When you\'re ready to explore, feel free to click any of the links in the navbar!",
      title: "Home",
      cancelText: "Quit Tutorial",
      okText: "Next Page",
      success: true, // whether the button should be green or red
      focus: "ok" // which button to autofocus, "cancel" (default) or "ok", or "none"
    }, function (ok) {
      if (!ok) {
        FlowRouter.go('User_Home_Page');
        showTutorial = false;
        return;
      }
      FlowRouter.go('User_Profile_Page');
    });
    return false;
  }
});