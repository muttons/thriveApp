
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
}
});


// create new info
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('guides').add({
    fullName: createForm.fullName.value,
    location: createForm.location.value,
    position: createForm.position.value,
    questionOne: createForm.questionOne.value,
    questionTwo: createForm.questionTwo.value,
    questionThree: createForm.questionThree.value
  }).then(() => {
    // close the create modal & reset form
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    createForm.reset();
  }).catch(err => {
    console.log(err.message);
  });
});


// Sign In with Microsoft OAuth
const authProvider = new firebase.auth.OAuthProvider('microsoft.com');
    microsoftSignIn = () => {

      authProvider.setCustomParameters({
        // Have user select account - bypassess seamless sign on for the app
        prompt: 'select_account'
      });

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
