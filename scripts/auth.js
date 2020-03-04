authProvider = new firebase.auth.OAuthProvider('microsoft.com');
var provider = new firebase.auth.GoogleAuthProvider();

microsoftSignIn = () => {
    firebase.auth().signInWithPopup(authProvider).then(function(result){
        console.log(result);
        console.log("Successfull Sign In with Microsoft Account");
    }).catch(function(err){
        console.log(err);
        console.log("Failed to Sign In with Microsoft Account");
    });
}


microsoftSignOut = () => {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log("Successfull Log Out")
      }).catch(function(error) {
        // An error happened.
      });
    }

