import firebase from 'firebase/app';
require('firebase/auth');
require('firebase/database');

import config from './config';

firebase.initializeApp(config);

export default firebase;