// DOM elements
const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const adminItems = document.querySelectorAll('.admin');
const trainItems = document.querySelectorAll('.train');
const basicItems = document.querySelectorAll('.basic');




// settings for displaying and not displaying based on the users status and role
const setupUI = (user) => {
  if (user) {
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
        <div class="collapsible-header">${guide.fullName} - ${guide.date} </div>
        <div class="collapsible-body white">
        <ul class="collection">
        <li class="collection-item">1) ${guide.questionOne} </li>
        <li class="collection-item">2) ${guide.questionTwo} </li>
        <li class="collection-item">3) ${guide.questionThree} </li>
        <li class="collection-item train">Score: ${guide.userGrade}</li>
        <li class="collection-item train">${guide.passOrFail}</li>
        <button class="collection-item train">Delete</button>
        </ul>
        </div>
      </li>
    `;
    html += list;
  });
  guideList.innerHTML = html;
}else {
  guideList.innerHTML = '<h5 class="center-align">Login to view information</h5>'
}
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
