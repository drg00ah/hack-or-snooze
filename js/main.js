"use strict";

$(document).ready(function() {
  const $storiesLoadingMsg = $("#stories-loading-msg");
  const $allStoriesList = $("#all-stories-list");
  const $loginForm = $("#login-form");
  const $signupForm = $("#signup-form");

  /** To make it easier for individual components to show just themselves, this
   * is a useful function that hides pretty much everything on the page. After
   * calling this, individual components can re-show just what they want.
   */
  function hidePageComponents() {
    const components = [$allStoriesList, $loginForm, $signupForm];
    components.forEach(c => c.hide());
  }

  /** Overall function to kick off the app. */
  async function start() {
    console.debug("start");

    // "Remember logged-in user" and log in, if credentials in localStorage
    await window.checkForRememberedUser();
    await window.getAndShowStoriesOnStart();

    // if we got a logged-in user
    if (window.currentUser) window.updateUIOnUserLogin();
  }

  // Make sure these functions are accessible from other scripts
  window.hidePageComponents = hidePageComponents;

  // Once the DOM is entirely loaded, begin the app
  $(start);
});
