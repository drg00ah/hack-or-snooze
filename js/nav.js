"use strict";

$(document).ready(function() {
  const $body = $("body");
  const $navLogin = $("#nav-login");
  const $navLogOut = $("#nav-logout");
  const $navUserProfile = $("#nav-user-profile");
  const $loginForm = $("#login-form");
  const $signupForm = $("#signup-form");

  /******************************************************************************
   * Handling navbar clicks and updating navbar
   */

  /** Show main list of all stories when click site name */
  function navAllStories(evt) {
    console.debug("navAllStories", evt);
    window.hidePageComponents();
    putStoriesOnPage();
  }

  $body.on("click", "#nav-all", navAllStories);

  /** Show login/signup on click on "login" */
  function navLoginClick(evt) {
    console.debug("navLoginClick", evt);
    window.hidePageComponents();
    $loginForm.show();
    $signupForm.show();
  }

  $navLogin.on("click", navLoginClick);

  /** When a user first logins in, update the navbar to reflect that. */
  function updateNavOnLogin() {
    console.debug("updateNavOnLogin");
    $(".main-nav-links").show();
    $navLogin.hide();
    $navLogOut.show();
    $navUserProfile.text(`${window.currentUser.username}`).show();
  }
});
