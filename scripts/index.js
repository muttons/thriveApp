// DOM elements
const guideList = document.querySelector('.guides');
const testOneList = document.querySelector('.testOne');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const adminItems = document.querySelectorAll('.admin');
const trainItems = document.querySelectorAll('.train');
const basicItems = document.querySelectorAll('.basic');
const accountDetails = document.querySelector('.account-details');



// enable offline data
db.enablePersistence()
  .catch(function(err) {
    if (err.code == 'failed-precondition') {
      // probably multible tabs open at once
      console.log('persistance failed');
    } else if (err.code == 'unimplemented') {
      // lack of browser support for the feature
      console.log('persistance not available');
    }
  });

  //LEAVE AS IS, SERVICE WORKER MUST REMAIN IN ROOT DIRECTORY
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('service worker registered'))
    .catch(err => console.log('service worker not registered', err));
}

// settings for displaying and not displaying based on the users status and role
const setupUI = (user) => {
  if (user) {
        // account info
        let userEmail = user.email
        const html = `

        <div>${userEmail}</div>
        <br><br><br><br>
      `;
      accountDetails.innerHTML = html;
    if (user.admin) {
      adminItems.forEach(item => item.style.display = 'block');
      trainItems.forEach(item => item.style.display = 'block');
    }
    if (user.train) {
      trainItems.forEach(item => item.style.display = 'block');
      
    }
    if (user.basic) {
      basicItems.forEach(item => item.style.display = 'block');
    }
    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else
   {
    // toggle user UI elements
    
    adminItems.forEach(item => item.style.display = 'none');
    trainItems.forEach(item => item.style.display = 'none');
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};




// function to delete documents from the testOne database
function deleteItem() {
  const id = event.target.getAttribute('data-id');
db.collection("testOne").doc(id).delete().then(function() {
}).catch(function(error) {
    console.error("Error removing document: ", error);
});
}




// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

  var items = document.querySelectorAll('.sidenav');
  M.Sidenav.init(items, {
    draggable: true,
    edge: 'right'
  });

  var items = document.querySelectorAll('.datepicker');
  M.Datepicker.init(items);

  var elems = document.querySelectorAll('.dropdown-trigger');
  M.Dropdown.init(elems);
  
  var tabs = document.querySelectorAll('.tabs')
  for (var i = 0; i < tabs.length; i++){
    M.Tabs.init(tabs[i]);
  }



  var elems = document.querySelectorAll('.tooltipped');
  M.Tooltip.init(elems, {
    enterDelay: 0,
    exitDelay: 0,
    inDuration: 0,
    outDuration: 0,
    margin: 0
  });
});






