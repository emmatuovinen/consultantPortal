import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';

export const adalConfig = {
  tenant: 'fa115574-a2e3-4c35-9b98-e8741745b477',
  clientId: 'f11783ce-a772-4fc5-bab1-17952707a83b',
  endpoints: {
    api: 'https://graph.microsoft.com',
  },
  cacheLocation: 'localStorage',
};

export const authContext = new AuthenticationContext(adalConfig);

export const adalApiFetch = (fetch, url, options) =>
  adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);

export const getToken = () => {
  return authContext.getCachedToken(authContext.config.clientId);
 };