"use strict";

$(document).ready(function() {
  // global to hold the User instance of the currently-logged-in user
  let currentUser;

  const $loginForm = $("#login-form");
  const $signupForm = $("#signup-form");
  const $navLogOut = $("#nav-logout");
  const $allStoriesList = $("#all-stories-list");

  /******************************************************************************
   * User login/signup/login
   */

  /** Handle login form submission. If login ok, sets up the user instance */
  async function login(evt) {
    console.debug("login", evt);
    evt.preventDefault();

    const username = $("#login-username").val();
    const password = $("#login-password").val();

    currentUser = await User.login(username, password);

    $loginForm.trigger("reset");

    saveUserCredentialsInLocalStorage();
    updateUIOnUserLogin();
  }

  $loginForm.on("submit", login);

  /** Handle signup form submission. */
  async function signup(evt) {
    console.debug("signup", evt);
    evt.preventDefault();

    const name = $("#signup-name").val();
    const username = $("#signup-username").val();
    const password = $("#signup-password").val();

    try {
      currentUser = await User.signup(username, password, name);

      saveUserCredentialsInLocalStorage();
      updateUIOnUserLogin();

      $signupForm.trigger("reset");
    } catch (err) {
      console.error("Signup failed", err);
      if (err.response && err.response.status === 409) {
        alert("Username already exists. Please choose a different username.");
      } else {
        alert("An error occurred during signup. Please try again.");
      }
    }
  }

  $signupForm.on("submit", signup);

  /** Handle click of logout button
   * Remove their credentials from localStorage and refresh page
   */
  function logout(evt) {
    console.debug("logout", evt);
    localStorage.clear();
    location.reload();
  }

  $navLogOut.on("click", logout);

  /******************************************************************************
   * Storing/recalling previously-logged-in-user with localStorage
   */

  /** If there are user credentials in local storage, use those to log in
   * that user. This is meant to be called on page load, just once.
   */
  async function checkForRememberedUser() {
    console.debug("checkForRememberedUser");
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (!token || !username) return false;

    currentUser = await User.loginViaStoredCredentials(token, username);
  }

  /** Sync current user information to localStorage.
   * We store the username/token in localStorage so when the page is refreshed
   * (or the user revisits the site later), they will still be logged in.
   */
  function saveUserCredentialsInLocalStorage() {
    console.debug("saveUserCredentialsInLocalStorage");
    if (currentUser) {
      localStorage.setItem("token", currentUser.loginToken);
      localStorage.setItem("username", currentUser.username);
    }
  }

  /******************************************************************************
   * General UI stuff about users
   */

  /** When a user signs up or registers, we want to set up the UI for them:
   * - show the stories list
   * - update nav bar options for logged-in user
   * - generate the user profile part of the page
   */
  function updateUIOnUserLogin() {
    console.debug("updateUIOnUserLogin");
    $allStoriesList.show();
    updateNavOnLogin();
  }

  // Define updateNavOnLogin to update the navigation bar after login
  function updateNavOnLogin() {
    console.debug("updateNavOnLogin");
    $(".main-nav-links").show();
    $("#nav-login").hide();
    $navLogOut.show();
    $("#nav-user-profile").text(`${currentUser.username}`).show();
  }

  // Make sure these functions and variables are accessible from other scripts
  window.currentUser = currentUser;
  window.checkForRememberedUser = checkForRememberedUser;
  window.saveUserCredentialsInLocalStorage = saveUserCredentialsInLocalStorage;
  window.updateUIOnUserLogin = updateUIOnUserLogin;
  window.updateNavOnLogin = updateNavOnLogin; // Ensure this is available globally if needed
});
