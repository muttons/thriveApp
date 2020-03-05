// DOM elements
const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

const setupUI = (user) => {
  if (user) {
    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    // toggle user elements
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
        <div class="collapsible-header"> ${guide.fullName} </div>
        <div class="collapsible-body white">
        <ul class="collection">
        <li class="collection-item"> Location: | ${guide.location} </li>
        <li class="collection-item"> Position: | ${guide.position} </li>
        <li class="collection-item"> 1: | ${guide.questionOne} </li>
        <li class="collection-item"> 2: | ${guide.questionTwo} </li>
        <li class="collection-item"> 3: | ${guide.questionThree} </li>
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

});
