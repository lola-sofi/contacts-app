// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, setPersistence, browserSessionPersistence } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqooaqBwEZhNiyJUzWujhqr1cJUd7OGWE",
  authDomain: "lola-demo-1b496.firebaseapp.com",
  projectId: "lola-demo-1b496",
  storageBucket: "lola-demo-1b496.appspot.com",
  messagingSenderId: "975755909898",
  appId: "1:975755909898:web:c6f54f78975298a6a638f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
const firestoreDb = getFirestore(app)

// Set session persistence i.e.
// Existing and future Auth states will persist in the current
// session only. Closing the tab\window will clear existing
// auth state even if a user forgets to sign out
setPersistence(auth, browserSessionPersistence)
.catch((err) => {
  // Report errors via the app error handler
  console.log( "persistence error", err.message )
})

function getCurrentUser() {
  // Returns user or null if no current user - see router guard 'beforeEach'
  // Thanks to https://dev.to/gautemeekolsen/vue-guard-routes-with-firebase-authentication-f4l
  // for this neat solution
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged( auth, (user) => {
      unsubscribe()
      resolve(user)
    },
      reject
    )
  })
}

export { auth, firestoreDb, getCurrentUser }