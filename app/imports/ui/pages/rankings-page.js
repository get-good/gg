Template.Rankings_Page.onRendered(function tutorialRankings() {
  if(showTutorial) {
    new Confirmation({
      message: "The rankings for all senseis are displayed here. Strive to be the top sensei!",
      title: "Rankings",
      cancelText: "Quit Tutorial",
      okText: "Got it!",
      success: true, // whether the button should be green or red
      focus: "ok" // which button to autofocus, "cancel" (default) or "ok", or "none"
    }, function (ok) {
      if (!ok) {
        FlowRouter.go('Rankings_Page');
        showTutorial = false;
        return;
      }
      FlowRouter.go('Rankings_Page');
      showTutorial = false;
    });
    return false;
  }
});
