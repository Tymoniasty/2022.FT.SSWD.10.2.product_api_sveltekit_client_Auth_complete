
// auth_config.js

// App config for Auth0
export const config = {
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    redirectUri: 'http://localhost:5173',
    responseType: 'id_token token',
    audience: 'https://product-api'

  };


// api roles
export const API_ROLES = {
  CREATE_PRODUCT : 'create:products',
  READ_PRODUCT : 'read:products',
  UPDATE_PRODUCT : 'update:products',
  DELETE_PRODUCT : 'delete:products'
};
