// https://auth0.com/blog/authenticating-svelte-apps/

import { writable, derived } from "svelte/store";

export const isAuthenticated = writable(false);
export const user = writable({});
export const roles = writable({});
export const token = writable();
export const popupOpen = writable(false);
export const error = writable();