// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD4_2VAduqORrVZFZbnH6O8leQ72lqtF_o",
    authDomain: "dtc13-ara-chat.firebaseapp.com",
    databaseURL: "https://dtc13-ara-chat.firebaseio.com",
    projectId: "dtc13-ara-chat",
    storageBucket: "dtc13-ara-chat.appspot.com",
    messagingSenderId: "185600928233",
    appId: "1:185600928233:web:5426ac3b6a12cf3a408378"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

/**
 * Handles the sign in button press.
 */
function toggleSignIn() {
    if (firebase.auth().currentUser) {
        firebase.auth().signOut();
    } else {
        var email = document.getElementById('sign-in-email').value;
        var password = document.getElementById('sign-in-password').value;
        if (email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (password.length < 4) {
            alert('Please enter a password.');
            return;
        }
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
        document.getElementById('sign-in').disabled = false;
        });
    }
    document.getElementById('sign-in').disabled = true;
}

function handleSignUp() {
    var email = document.getElementById('sign-up-email').value;
    var password = document.getElementById('sign-up-password').value;
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
}

function sendPasswordReset() {
    var email = document.getElementById('reset-email').value;
    firebase.auth().sendPasswordResetEmail(email).then(function() {
      alert('Password Reset Email Sent!');
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/invalid-email') {
        alert(errorMessage);
      } else if (errorCode == 'auth/user-not-found') {
        alert(errorMessage);
      }
      console.log(error);
    });
  }

function initApp() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            window.location.href = '/account';
        } else {

        }
    });

    document.getElementById('sign-in').addEventListener('click', toggleSignIn, false);
    document.getElementById('sign-up').addEventListener('click', handleSignUp, false);
    document.getElementById('password-reset').addEventListener('click', sendPasswordReset, false);
}

window.onload = function() {
    initApp();
};
