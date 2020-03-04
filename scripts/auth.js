
// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        // return data from firebase if the user is logged in
        db.collection('guides').get().then(snapshot => {
            setupGuides(snapshot.docs);
            setupUI(user);
        });
    } else {
        // return and empty array if they are logged out
      setupGuides([]);
      setupUI();
}});


// Sign In with Microsoft OAuth
const authProvider = new firebase.auth.OAuthProvider('microsoft.com');
    microsoftSignIn = () => {
        firebase.auth().signInWithRedirect(authProvider).then(function(result){
            console.log(result);
            console.log("Successfull Sign In with Microsoft Account");
        }).catch(function(err){
            console.log(err);
            console.log("Failed to Sign In with Microsoft Account");
        });
    }

// Sign Out
microsoftSignOut = () => {
firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
}
