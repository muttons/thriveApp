// setup liftAndTransfer
const setupLiftAndTransfer = (data) => {
    if (data.length) {
    let latHTML = '';
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
          <li class="collection-item">4) ${liftAndTransfer.questionFour} </li>
          <li class="collection-item">5) ${liftAndTransfer.questionFive} </li>
          <li class="collection-item">6) ${liftAndTransfer.questionSix} </li>
          <li class="collection-item">7) ${liftAndTransfer.questionSeven} </li>
          <li class="collection-item">8) ${liftAndTransfer.questionEight} </li>
          <li class="collection-item">9) ${liftAndTransfer.questionNine} </li>
          <li class="collection-item">10) ${liftAndTransfer.questionTen} </li>
          <li class="collection-item train">Score: ${liftAndTransfer.userGrade}</li>
          <li class="collection-item train">${liftAndTransfer.passOrFail}</li>
  
          <a class="waves-effect waves-light btn right red" style="margin-top: 20px;" onclick="deleteLiftAndTransfer(event)" data-id="${doc.id}"><i class="material-icons right">delete</i>delete</a>
  
          </ul>
          </div>

        </li>
      `;
      latHTML += list;
    });
    liftAndTransferList.innerHTML = latHTML;
  }else {
    liftAndTransferList.innerHTML = '<h5 class="center-align">All Caught Up!</h5>'
  }
  }

  const setupTherapeuticOptions= (data) => {
    if (data.length) {
    let html = '';
    data.forEach(doc => {
      const therapeuticOptions= doc.data();
      const toList = `
        <li>


          <div class="collapsible-header" data-id="${doc.id}">${therapeuticOptions.email} - ${therapeuticOptions.date} </div>
          <div class="collapsible-body white">
          <ul class="collection">
          <li class="collection-item">1) ${therapeuticOptions.questionOne} </li>
          <li class="collection-item">2) ${therapeuticOptions.questionTwo} </li>
          <li class="collection-item">3) ${therapeuticOptions.questionThree} </li>
          <li class="collection-item">4) ${therapeuticOptions.questionFour} </li>
          <li class="collection-item">5) ${therapeuticOptions.questionFive} </li>
          <li class="collection-item">6) ${therapeuticOptions.questionSix} </li>
          <li class="collection-item">7) ${therapeuticOptions.questionSeven} </li>
          <li class="collection-item">8) ${therapeuticOptions.questionEight} </li>
          <li class="collection-item">9) ${therapeuticOptions.questionNine} </li>
          <li class="collection-item">10) ${therapeuticOptions.questionTen} </li>
          <li class="collection-item">11) ${therapeuticOptions.questionEleven} </li>
          <li class="collection-item">12) ${therapeuticOptions.questionTwelve} </li>
          <li class="collection-item">13) ${therapeuticOptions.questionThirteen} </li>
          <li class="collection-item">14) ${therapeuticOptions.questionFourteen} </li>
          <li class="collection-item">15) ${therapeuticOptions.questionFifteen} </li>
          <li class="collection-item">16) ${therapeuticOptions.questionSixteen} </li>
          <li class="collection-item">17) ${therapeuticOptions.questionSeventeen} </li>
          <li class="collection-item">18) ${therapeuticOptions.questionEighteen} </li>
          <li class="collection-item">19) ${therapeuticOptions.questionNineteen} </li>
          <li class="collection-item">20) ${therapeuticOptions.questionTwenty} </li>
          <li class="collection-item train">Score: ${therapeuticOptions.userGrade}</li>
          <li class="collection-item train">${therapeuticOptions.passOrFail}</li>
  
          <a class="waves-effect waves-light btn right red" style="margin-top: 20px;" onclick="deleteTherapeuticOptions(event)" data-id="${doc.id}"><i class="material-icons right">delete</i>delete</a>
  
          </ul>
          </div>

        </li>
      `;
      html += toList;
    });
    therapeuticOptionsList.innerHTML = html;
  }else {
    therapeuticOptionsList.innerHTML = '<h5 class="center-align">All Caught Up!</h5>'
  }
  }

  