const firebase = require('firebase')
const FIREBASE_CONFIG = require('../FIREBASE_KEY.json')

firebase.initializeApp(FIREBASE_CONFIG)

const createUserWithEmailAndPassword = (email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
}

module.exports = {
  createUserWithEmailAndPassword: createUserWithEmailAndPassword
}
