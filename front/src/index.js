import { runWithAdal } from 'react-adal';
import { authContext } from './adalconfig';

/*
  - adalconfig and runWithAdal are relating to the auhtentication with Azure AD
  - DO_NOT_LOGIN = true enables the user to see the landing page without the need to login first
*/

const DO_NOT_LOGIN = true;

runWithAdal(authContext, () => {

  // eslint-disable-next-line
  require('./indexApp.js');

},DO_NOT_LOGIN);



