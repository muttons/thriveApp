
// add admin cloud function
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const adminEmail = document.querySelector('#admin-email').value;
  const addAdminRole = functions.httpsCallable('addAdminRole');

  // for admin role
  addAdminRole({ email: adminEmail }).then(result => {
    console.log(result);
  });
});

// add Train cloud function
const trainForm = document.querySelector('.train-actions');
trainForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const trainEmail = document.querySelector('#train-email').value;
  const addTrainRole = functions.httpsCallable('addTrainRole');
  // for train role
  addTrainRole({ email: trainEmail }).then(result => {
    console.log(result);
  });
});



// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    user.getIdTokenResult().then(idTokenResult => {
      user.admin = idTokenResult.claims.admin;
     
      setupUI(user);
    });
    db.collection('guides').onSnapshot(snapshot => {
      setupGuides(snapshot.docs);
    }, err => console.log(err.message));
  } else {
    setupUI();
    setupGuides([]);
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
        });
    }

// Sign Out
microsoftSignOut = () => {
firebase.auth().signOut().then(function() {
    // Sign-out successful.
    alert("You have Successfully signed out");
  }).catch(function(error) {
    // An error happened.
  });
}
