import { runWithAdal } from 'react-adal';
import { authContext } from './adalconfig';

/*
  - adalconfig and runWithAdal are relating to the auhtentication with Azure AD
  - DO_NOT_LOGIN = true enables the user to see the landing page without the need to login first
*/

runWithAdal(authContext, () => {

  // eslint-disable-next-line
  require('./indexApp.js');

},true);



