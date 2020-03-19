// getTestOne
const form = document.querySelector('.testForm');
const result = document.querySelector('.result');
const testForm = document.querySelector('#test-form-one');
let userGrade = 0;
let passOrFail = '';
//get the time and date that gets added to the submittion
let today = new Date();
let date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();
let time = 'at '+today.getHours() + ":" + today.getMinutes();
let dateTime = date+' '+time;


firebase.auth().onAuthStateChanged(function(user) {
testForm.addEventListener('submit', (e) => {
  e.preventDefault();
  //cloud function to get the array for test one
  const getTestOne = firebase.functions().httpsCallable('getTestOne');

  getTestOne().then(result => {
    let getTestOne = result.data;
    // grab the users answers from testForm
    const userAnswers = [ 
      testForm.questionOne.value, 
      testForm.questionTwo.value, 
      testForm.questionThree.value
    ];
    //compare users answers to the test one array of answers for validation
    userAnswers.forEach((answer, index) => {
      if (answer === getTestOne[index]){
        userGrade += 25;
      } if (userGrade > 70) {
        passOrFail = 'Passed';
      } else {
        passOrFail = 'Failed';
      };
    });
  
      //adds the data to the testOne collection
      db.collection('testOne').add({
        date: date+" "+time,
        email: user.email,
        questionOne: testForm.questionOne.value,
        questionTwo: testForm.questionTwo.value,
        questionThree: testForm.questionThree.value,
        userGrade: userGrade,
        passOrFail: passOrFail

    
      }).then(() => {
        //adds the data to the archive 
        db.collection('archive').add({
          date: date+" "+time,
          email: user.email,
          questionOne: testForm.questionOne.value,
          questionTwo: testForm.questionTwo.value,
          questionThree: testForm.questionThree.value,
          userGrade: userGrade,
          passOrFail: passOrFail
        })
        // close the test modal & reset form
        const modal = document.querySelector('#modal-test');
        M.Modal.getInstance(modal).close();
        testForm.reset();
        userGrade = 0;
      }).catch(err => {
        console.log(err.message);
      });
  });
});



  


});