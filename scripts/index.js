// DOM elements
const guideList = document.querySelector('.guides');
const testOneList = document.querySelector('.testOne');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const adminItems = document.querySelectorAll('.admin');
const trainItems = document.querySelectorAll('.train');
const basicItems = document.querySelectorAll('.basic');
const accountDetails = document.querySelector('.account-details');




// settings for displaying and not displaying based on the users status and role
const setupUI = (user) => {
  if (user) {
        // account info
        let userEmail = user.email
        const html = `

        <div>${userEmail}</div>
        <p class="admin">Role | Admin</p><p class="train">Role | Train</p><p class="basic">Role | Basic</p>
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






// setup guides
const setupGuides = (data) => {
  if (data.length) {
  let html = '';
  data.forEach(doc => {
    const guide = doc.data();
    const list = `
      <li>
        <div class="collapsible-header" data-id="${doc.id}">${guide.email} - ${guide.date} </div>
        <div class="collapsible-body white">
        <ul class="collection">
        <li class="collection-item">1) ${guide.questionOne} </li>
        <li class="collection-item">2) ${guide.questionTwo} </li>
        <li class="collection-item">3) ${guide.questionThree} </li>
        <li class="collection-item train">Score: ${guide.userGrade}</li>
        <li class="collection-item train">${guide.passOrFail}</li>

        <a class="waves-effect waves-light btn right red" style="margin-top: 20px;" onclick="deleteItem(event)" data-id="${doc.id}"><i class="material-icons right">delete</i>delete</a>

        </ul>
        </div>
      </li>
    `;
    html += list;
  });
  guideList.innerHTML = html;
}else {
  guideList.innerHTML = '<h5 class="center-align">All Caught Up!</h5>'
}
}

// setup testOne
const setupTestOne = (data) => {
  if (data.length) {
  let html = '';
  data.forEach(doc => {
    const testOne = doc.data();
    const list = `
      <li>
        <div class="collapsible-header" data-id="${doc.id}">${testOne.email} - ${testOne.date} </div>
        <div class="collapsible-body white">
        <ul class="collection">
        <li class="collection-item">1) ${testOne.questionOne} </li>
        <li class="collection-item">2) ${testOne.questionTwo} </li>
        <li class="collection-item">3) ${testOne.questionThree} </li>
        <li class="collection-item train">Score: ${testOne.userGrade}</li>
        <li class="collection-item train">${testOne.passOrFail}</li>

        <a class="waves-effect waves-light btn right red" style="margin-top: 20px;" onclick="deleteItem(event)" data-id="${doc.id}"><i class="material-icons right">delete</i>delete</a>

        </ul>
        </div>
      </li>
    `;
    html += list;
  });
  testOneList.innerHTML = html;
}else {
  testOneList.innerHTML = '<h5 class="center-align">All Caught Up!</h5>'
}
}
// function to delete documents from the guides database
function deleteItem() {
      const id = event.target.getAttribute('data-id');
    db.collection("guides").doc(id).delete().then(function() {
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

// function to delete documents from the guides database
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
  M.Sidenav.init(items);
  var items = document.querySelectorAll('.datepicker');
  M.Datepicker.init(items);

  
});





