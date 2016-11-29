// Template.Help_Page.onCreated(function tutorialHelp() {
//   new Confirmation({
//     message: "Here you can view what each page does in case you forget!",
//     title: "Help",
//     cancelText: "Don't Show",
//     okText: "Finish Tutorial",
//     success: true, // whether the button should be green or red
//     focus: "ok" // which button to autofocus, "cancel" (default) or "ok", or "none"
//   }, function (ok) {
//     if (!ok) {
//       FlowRouter.go('Help_Page');
//       return;
//     }
//     FlowRouter.go('Help_Page');
//   });
//   return false;
// });