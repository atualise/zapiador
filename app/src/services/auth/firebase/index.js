import { setAuthUser, setForgetPassMailSent, updateLoadUser } from '../../../redux/actions/Auth';
import { auth } from './config';
import { fetchError, fetchStart, fetchSuccess } from '../../../redux/actions';

const Firebase = {
  onRegister: ({ email, password }) => {
    return dispatch => {
      dispatch(fetchStart());
      try {
        auth
          .createUserWithEmailAndPassword(email, password)
          .then(data => {
            dispatch(fetchSuccess());
            dispatch(setAuthUser(data));
          })
          .catch(error => {
            dispatch(fetchError(error.message));
          });
      } catch (error) {
        dispatch(fetchError(error.message));
      }
    };
  },

  onLogin: ({ email, password }) => {
    return dispatch => {
      try {
        dispatch(fetchStart());
        auth
          .signInWithEmailAndPassword(email, password)
          .then(data => {
            dispatch(setAuthUser(data));
            dispatch(fetchSuccess());
            // window.location.reload();
          })
          .catch(error => {
            dispatch(fetchError(error.message));
          });
      } catch (error) {
        dispatch(fetchError(error.message));
      }
    };
  },

  onLogout: () => {
    console.log('Logout');
    return dispatch => {
      dispatch(fetchStart());
      try {
        auth
          .signOut()
          .then(data => {
            dispatch(fetchSuccess());
            dispatch(setAuthUser(null));
          })
          .catch(error => {
            dispatch(fetchError(error.message));
          });
      } catch (error) {
        dispatch(fetchError(error.message));
      }
    };
  },

  onRefreshAuthUser: () => {
    //console.log('abriu 2');
    return dispatch => {
      auth.onIdTokenChanged(function(authUser) {
        if (authUser) {
          authUser.getIdTokenResult().then(result => {
            console.log(result.token);
            dispatch(
              setAuthUser({
                uid: authUser.uid,
                displayName: authUser.displayName,
                email: authUser.email,
                photoURL: authUser.photoURL,
                token: authUser.refreshToken,
                idToken: result.token,
                is_admin: result.claims.admin,
                is_operator: result.claims.operator,
              }),
            );
          });
        }
      });
    };
  },

  getAuthUser: () => {
    return dispatch => {
      dispatch(fetchStart());
      dispatch(updateLoadUser(false));
      try {
        auth.onAuthStateChanged(authUser => {
          if (authUser) {
            dispatch(fetchSuccess());
            authUser.getIdTokenResult().then(result => {
              //console.log(result.token);
              dispatch(
                setAuthUser({
                  uid: authUser.uid,
                  displayName: authUser.displayName,
                  email: authUser.email,
                  photoURL: authUser.photoURL,
                  token: authUser.refreshToken,
                  idToken: result.token,
                  is_admin: result.claims.admin,
                  is_operator: result.claims.operator,
                }),
              );
            });
          } else {
            dispatch(updateLoadUser(true));
            // dispatch(updateLoadUser(true));
          }
        });
      } catch (error) {
        dispatch(updateLoadUser(true));
        dispatch(fetchError(error.message));
      }
    };
  },

  onForgotPassword: email => {
    return dispatch => {
      try {
        dispatch(fetchStart());
        auth
          .sendPasswordResetEmail(email)
          .then(() => {
            dispatch(setForgetPassMailSent(true));
            dispatch(fetchSuccess());
          })
          .catch(error => {
            dispatch(fetchError(error.message));
          });
      } catch (error) {
        dispatch(fetchError(error.message));
      }
    };
  },
};

export default Firebase;
