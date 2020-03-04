
function microsoftSignIn(){
var provider = new firebase.auth.OAuthProvider('microsoft.com');
firebase.auth().signInWithPopup(provider)
  .then(function(result) {
    // User is signed in.
    // IdP data available in result.additionalUserInfo.profile.
    // OAuth access token can also be retrieved:
    // result.credential.accessToken
    // OAuth ID token can also be retrieved:
    // result.credential.idToken
    console.log("Success");
  })
  .catch(function(error) {
    // Handle error.
    console.log("Failure");
  });
}


function microsoftSignOut(){
firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
}