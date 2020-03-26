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
  
          <a class="waves-effect waves-light btn right red" style="margin-top: 20px;" onclick="deleteItem(event)" data-id="${doc.id}" data-id-two="${testOne.email}" ><i class="material-icons right">delete</i>delete</a>
  
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