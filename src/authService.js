// src/authService.js

// https://auth0.com/blog/authenticating-svelte-apps/
// https://developer.auth0.com/resources/code-samples/spa/svelte

// Import the Auth0 Library
import { createAuth0Client } from '@auth0/auth0-spa-js';

// Import the auth store
import { user, isAuthenticated, token, roles, popupOpen } from './stores/authStore';

// A lib for decoding JWTs
import jwt_decode from "jwt-decode";

// import config settings
import  { config, API_ROLES } from "./auth_config";

// Create an Auth0 client
async function createClient() {
  let auth0Client = await createAuth0Client({
    domain: config.domain,
    clientId: config.clientId,
    authorizationParams: { 
      redirect_uri: config.redirectUri,
      audience: config.audience,
      responseType: 'id_token token'
    }
  });

  return auth0Client;
}


// A Function to manage Auth0 login and registration 
async function loginWithPopup(client, options) {
  popupOpen.set(true);
  try {
    // Login using a pop up dialog
    await client.loginWithPopup(options);

    // Set the user store after login
    user.set(await client.getUser());
    isAuthenticated.set(true);

    // Get the access token generated after authentication
    const jwt = await client.getTokenSilently(options); 
    token.set(jwt);

    // call set roles function
    setRoles(jwt);

  } catch (e) {
    // eslint-disable-next-line
    console.error(e);
  } finally {
    popupOpen.set(false);
  }
}

async function loginWithRedirect(client, options) {
  popupOpen.set(true);
  try {
    await client.loginWithRedirect(options);

    user.set(await client.getUser());
    isAuthenticated.set(true);
    const jwt = await client.getTokenSilently(options); 
    token.set(jwt);
    setRoles(jwt);

  } catch (e) {
    // eslint-disable-next-line
    console.error(e);
  } finally {
    popupOpen.set(false);
  }
}

// Logout - clears the session
function logout(client) {
  return client.logout();
}

// Read user roles from the access token using the npm_decode package.
// This does not verify the token - do that server side
function setRoles(jwt) {
  if (!jwt) {
    roles.set({
      showUpdate: false,
      showDelete: false,
      showAdd: false
    });

  } else {
    const decoded = jwt_decode(jwt);
    console.log('decode: ', decoded);

    // set the user roles in the store
    roles.set({
      showUpdate: decoded.permissions.includes(API_ROLES.UPDATE_PRODUCT),
      showDelete: decoded.permissions.includes(API_ROLES.DELETE_PRODUCT),
      showAdd: decoded.permissions.includes(API_ROLES.CREATE_PRODUCT)
    });
  }
}


const auth = {
  createClient,
  loginWithPopup,
  loginWithRedirect,
  logout
};

export default auth;


