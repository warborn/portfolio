/**
 * Theme Name: Two Up
 * Version: 1.0.0
 * Theme URL: http://sequencejs.com/themes/two-up/
 *
 * A full-screen, two column layout for showing a featured image and description
 *
 * This theme is powered by Sequence.js - The
 * responsive CSS animation framework for creating unique sliders,
 * presentations, banners, and other step-based applications.
 *
 * Author: Ian Lunn
 * Author URL: http://ianlunn.co.uk/
 *
 * Theme License: http://sequencejs.com/licenses/#free-theme
 * Sequence.js Licenses: http://sequencejs.com/licenses/
 *
 * Copyright © 2015 Ian Lunn Design Limited unless otherwise stated.
 */

import sequence from 'sequencejs/scripts/sequence';

export default function startSequence(id) {
  // Get the Sequence element
  var sequenceElement = document.getElementById(id);

  // Place your Sequence options here to override defaults
  // See: http://sequencejs.com/documentation/#options
  var options = {
    animateCanvas: true,
    phaseThreshold: false,
    preloader: true,
    fadeStepWhenSkipped: false,
    reverseWhenNavigatingBackwards: true,
    swipeEvents: {
      left: function (sequence) {
        sequence.next();
      },
      right: function (sequence) {
        sequence.prev();
      },
      up: function (sequence) {
        sequence.next();
      },
      down: function (sequence) {
        sequence.prev();
      }
    },
    fallback: {
      speed: 300
    }
  }

  var mouseWheel = {

    // Only allow mousewheel navigation every x amount of ms
    quietPeriod: 1000,

    // Set this to the same length as the longest transition in Sequence
    animationTime: 300
  }

  // Launch Sequence on the element, and with the options we specified above
  var mySequence = sequence(sequenceElement, options);


  function getWindowWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  }

  // Determine Hammer directions required based on window width
  // A window greater than 768 allows up/down/left/right swiping
  // A window less than 769 allows left/right swiping
  function enableSwiping() {

    if (mySequence.hammerTime === false) {
      return;
    }

    var windowWidth = getWindowWidth();

    if (windowWidth > 769) {
      mySequence.hammerTime.get("swipe").set({ direction: Hammer.DIRECTION_ALL });
    } else {
      mySequence.hammerTime.get("swipe").set({ direction: Hammer.DIRECTION_HORIZONTAL });
    }

    return windowWidth;
  }

  mySequence.ready = function () {

    var windowWidth,
      lastAnimation = 0,
      delta,
      timeNow;

    // Get the windowWidth each time the window is resized
    var windowWidth = enableSwiping();
    mySequence.throttledResize = function () {
      windowWidth = enableSwiping();
    }

    function scroll(e) {

      // Only allow mousewheel navigation above 769px
      if (windowWidth < 769) {
        return;
      }

      e.preventDefault();

      delta = e.wheelDelta || -e.detail;

      var deltaOfInterest = delta;
      timeNow = new Date().getTime();

      // Cancel scroll if currently animating or within quiet period
      if (timeNow - lastAnimation < mouseWheel.quietPeriod + mouseWheel.animationTime) {
        e.preventDefault();
        return;
      }

      if (deltaOfInterest < 0) {
        mySequence.next();
      } else {
        mySequence.prev();
      }

      var lastAnimation = timeNow;
    }

    mySequence.utils.addEvent(document, "mousewheel", scroll);
    mySequence.utils.addEvent(document, "DOMMouseScroll", scroll);

    // Navigate between steps when certain buttons are pressed
    mySequence.utils.addEvent(document.body, "keyup", function (e) {

      switch (e.keyCode) {

        // If any of the following keys are pressed, go to the next slide:

        // space, right arrow
        case 32:
        case 39:
          e.preventDefault();
          mySequence.next();
          break;

        // page down, down arrow (Large layout only)
        case 34:
        case 40:
          if (windowWidth > 768) {
            e.preventDefault();
            mySequence.next();
          }
          break;

        // If any of the following keys are pressed, go to the previous slide:

        // left arrow
        case 37:
          e.preventDefault();
          mySequence.prev();
          break;

        // page up, up arrow (Large layout only)
        case 33:
        case 38:
          if (windowWidth > 768) {
            e.preventDefault();
            mySequence.prev();
          }
          break;
      }
    });
  };
}
