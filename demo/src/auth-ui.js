import firebase from './firebase';

const uiConfig = {
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  signInSucces() {
    if (window.opener) {
      window.close();
    }
    return false;
  },
};

import firebaseui from 'firebaseui';

const authUi = new firebaseui.auth.AuthUI(firebase.auth());

export default function(id) {
  authUi.start(id, uiConfig);
};