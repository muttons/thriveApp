// setup liftAndTransfer
const setupLiftAndTransfer = (data) => {
    if (data.length) {
    let html = '';
    data.forEach(doc => {
      const liftAndTransfer = doc.data();
      const list = `
        <li>


          <div class="collapsible-header" data-id="${doc.id}">${liftAndTransfer.email} - ${liftAndTransfer.date} </div>
          <div class="collapsible-body white">
          <ul class="collection">
          <li class="collection-item">1) ${liftAndTransfer.questionOne} </li>
          <li class="collection-item">2) ${liftAndTransfer.questionTwo} </li>
          <li class="collection-item">3) ${liftAndTransfer.questionThree} </li>
          <li class="collection-item">3) ${liftAndTransfer.questionFour} </li>
          <li class="collection-item">3) ${liftAndTransfer.questionFive} </li>
          <li class="collection-item">3) ${liftAndTransfer.questionSix} </li>
          <li class="collection-item">3) ${liftAndTransfer.questionSeven} </li>
          <li class="collection-item">3) ${liftAndTransfer.questionEight} </li>
          <li class="collection-item">3) ${liftAndTransfer.questionNine} </li>
          <li class="collection-item">3) ${liftAndTransfer.questionTen} </li>
          <li class="collection-item train">Score: ${liftAndTransfer.userGrade}</li>
          <li class="collection-item train">${liftAndTransfer.passOrFail}</li>
  
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

  