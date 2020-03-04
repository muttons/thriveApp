

function signIn(){
    var provider = new firebase.auth.OAuthProvider('microsoft.com');
    provider.setCustomParameters({
        tenant: 'common'
    });
    firebase.auth().signInWithRedirect(provider)
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

    firebase.auth().getRedirectResult()
  .then(function(result) {
    // User is signed in.
    // IdP data available in result.additionalUserInfo.profile.
    // OAuth access token can also be retrieved:
    // result.credential.accessToken
    // OAuth ID token can also be retrieved:
    // result.credential.idToken
  })
  .catch(function(error) {
    // Handle error.
  });

    function signOut(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log("Successfull Log Out")
      }).catch(function(error) {
        // An error happened.
      });
    }