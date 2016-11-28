// $(document).ready(function(){
//   alert('This is your home page! From here, you can edit your profile,read your about page and even check your current helper rating. When you\'re ready to explore, feel free to click any of the links up top!');
// });

Template.User_Home_Page.events({
  'click .about'(event) {
    event.preventDefault();
    FlowRouter.go('About');
  },
});

Template.User_Home_Page.events({
  'click .rating'(event) {
    event.preventDefault();
    FlowRouter.go('rating');
  },
});

Template.User_Home_Page.events({
  'click .edit'(event) {
    event.preventDefault();
    FlowRouter.go('Edit_Profile');
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