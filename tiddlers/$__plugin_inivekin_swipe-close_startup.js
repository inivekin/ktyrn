/*\
title: $:/plugins/yourname/swipe-close/startup.js
type: application/javascript
tags: $:/tags/Startup
\*/

(function($) {

  var animating = false;
  var decisionVal = 80;
  var pullDeltaX = 0;
  var deg = 0;
  var $card, $cardReject, $cardLike;

  function pullChange() {
    animating = true;
    deg = pullDeltaX / 10;
    $card.css("transform",
      "translateX(" + pullDeltaX + "px) rotate(" + deg + "deg)"
    );

    var opacity = pullDeltaX / 100;
    var rejectOpacity = (opacity >= 0) ? 0 : Math.abs(opacity);
    var likeOpacity = (opacity <= 0) ? 0 : opacity;

    $cardReject.css("opacity", rejectOpacity);
    $cardLike.css("opacity", likeOpacity);
  }

  function release() {
    if (Math.abs(pullDeltaX) >= decisionVal) {
      closeTiddler($card);
    }

    $card.attr("style", "");
    pullDeltaX = 0;
    animating = false;
  }

  function closeTiddler($el) {
    $tw.rootWidget.dispatchEvent({ type: "tm-close-tiddler", tiddlers title: title });
  }

  $(document).on("mousedown touchstart", ".swipe-card", function(e) {
    if (animating) return;
    $card = $(this);
  });

  $(document).on("mousemove touchmove", function(e) {
    if (!$card) return;
    pullDeltaX = e.pageX || e.originalEvent.touches[0].pageX;
    pullChange();
  });

  $(document).on("mouseup touchend", function() {
    if (!$card) return;
    release();
    $card = null;
  });

})(jQuery);
