// add admin cloud function
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const adminEmail = document.querySelector('#admin-email').value;
  const addAdminRole = functions.httpsCallable('addAdminRole');

   //preloader
   document.querySelector('.loader1').classList.add('progress');
   document.querySelector('.loader2').classList.add('indeterminate');
 
 setTimeout(function() {
   document.querySelector('.loader1').classList.remove('progress');
   document.querySelector('.loader2').classList.remove('indeterminate');
 },3000);
  // for admin role
  addAdminRole({ email: adminEmail }).then(() => {
    adminForm.reset();
  });
});

// add mapUser cloud function
const mapUserForm = document.querySelector('.mapUser-actions');
mapUserForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const mapUserEmail = document.querySelector('#mapUser-email').value;
  const addMapUserRole = functions.httpsCallable('addMapUserRole');

   //preloader
   document.querySelector('.loader1').classList.add('progress');
   document.querySelector('.loader2').classList.add('indeterminate');
 
 setTimeout(function() {
   document.querySelector('.loader1').classList.remove('progress');
   document.querySelector('.loader2').classList.remove('indeterminate');
 },3000);
  // for mapUser role
  addMapUserRole({ email: mapUserEmail }).then(() => {
    
    mapUserForm.reset();
  });
});

// add Basic user cloud function
const basicForm = document.querySelector('.basic-actions');
basicForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const basicEmail = document.querySelector('#basic-email').value;
  const addBasicRole = functions.httpsCallable('addBasicRole');

  //preloader
  document.querySelector('.loader1').classList.add('progress');
  document.querySelector('.loader2').classList.add('indeterminate');

setTimeout(function() {
  document.querySelector('.loader1').classList.remove('progress');
  document.querySelector('.loader2').classList.remove('indeterminate');
},3000);
  // for basic role
  addBasicRole({ email: basicEmail }).then(() => {
    basicForm.reset();
  });
});



// listen for auth status changes
auth.onAuthStateChanged(user => {
  
  if (user) {
    // for getting user admin token to work
    user.getIdTokenResult().then(idTokenResult => {
      user.admin = idTokenResult.claims.admin;
      setupUI(user);
    });
    // for getting user mapUser token to work
    user.getIdTokenResult().then(idTokenResult => {
      user.mapUser = idTokenResult.claims.mapUser;
      setupUI(user);
      
    });
    // for getting user basic token to work
    user.getIdTokenResult().then(idTokenResult => {
      user.basic = idTokenResult.claims.basic;
      setupUI(user);
      
    });

  } 
  else {
    setupUI();
  }
});


// Sign In with Microsoft OAuth
const authProvider = new firebase.auth.OAuthProvider('microsoft.com');
    microsoftSignIn = () => {
      authProvider.setCustomParameters({
        // Have user select account - bypassess seamless sign on for the app
        prompt: 'select_account'
      });
        firebase.auth().signInWithPopup(authProvider).then(function(result){
            console.log(result);
            console.log("Successfull Sign In with Microsoft Account");
        });
    }

// Sign Out
microsoftSignOut = () => {
firebase.auth().signOut().then(function() {
    // Sign-out successful.
    location.reload();
  }).catch(function(error) {
    // An error happened.
  });
}







