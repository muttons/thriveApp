// getTestOne
const form = document.querySelector('.testForm');
const result = document.querySelector('.result');
const testForm = document.querySelector('#test-form-one');
const liftAndTransferForm = document.querySelector('#lift-and-transfer-form');
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
      //preloader
      document.querySelector('.loader1').classList.add('progress');
      document.querySelector('.loader2').classList.add('indeterminate');

    setTimeout(function() {
      document.querySelector('.loader1').classList.remove('progress');
      document.querySelector('.loader2').classList.remove('indeterminate');
    },3000);
  //cloud function to get the array for test one
  const getTestOne = firebase.functions().httpsCallable('getTestOne');
  getTestOne().then(result => {
    let getTestOne = result.data;
    // grab the users answers from testForm
    let userAnswers = [ 
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

// Lift and Transfer Test

firebase.auth().onAuthStateChanged(function(user) {
  liftAndTransferForm.addEventListener('submit', (e) => {
    e.preventDefault();
        //preloader
        document.querySelector('.loader1').classList.add('progress');
        document.querySelector('.loader2').classList.add('indeterminate');
  
      setTimeout(function() {
        document.querySelector('.loader1').classList.remove('progress');
        document.querySelector('.loader2').classList.remove('indeterminate');
      },6000);

    //cloud function to get the array for test one
    const getLiftAndTransfer = firebase.functions().httpsCallable('getLiftAndTransfer');
    getLiftAndTransfer().then(result => {
      let getLiftAndTransfer = result.data;
      // grab the users answers from LiftAndTransfer
      let userAnswers = [ 
        liftAndTransferForm.questionOne.value, 
        liftAndTransferForm.questionTwo.value, 
        liftAndTransferForm.questionThree.value,
        liftAndTransferForm.questionFour.value,
        liftAndTransferForm.questionFive.value,
        liftAndTransferForm.questionSix.value,
        liftAndTransferForm.questionSeven.value,
        liftAndTransferForm.questionEight.value,
        liftAndTransferForm.questionNine.value,
        liftAndTransferForm.questionTen.value
      ];

      //compare users answers to the test one array of answers for validation
      userAnswers.forEach((answer, index) => {
        if (answer === getLiftAndTransfer[index]){
          userGrade += 10;
        } if (userGrade >= 80) {
          passOrFail = 'Passed';
        } else {
          passOrFail = 'Failed';
        };
      });
  
        //adds the data to the testOne collection
        db.collection('liftAndTransfer').add({
          date: date+" "+time,
          email: user.email,
          questionOne: liftAndTransferForm.questionOne.value,
          questionTwo: liftAndTransferForm.questionTwo.value,
          questionThree: liftAndTransferForm.questionThree.value,
          questionFour: liftAndTransferForm.questionFour.value,
          questionFive: liftAndTransferForm.questionFive.value,
          questionSix: liftAndTransferForm.questionSix.value,
          questionSeven: liftAndTransferForm.questionSeven.value,
          questionEight: liftAndTransferForm.questionEight.value,
          questionNine: liftAndTransferForm.questionNine.value,
          questionTen: liftAndTransferForm.questionTen.value,
          userGrade: userGrade,
          passOrFail: passOrFail
  
      
        }).then(() => {
          //adds the data to the archive 
          db.collection('archive').add({
            date: date+" "+time,
            email: user.email,
            questionOne: liftAndTransferForm.questionOne.value,
            questionTwo: liftAndTransferForm.questionTwo.value,
            questionThree: liftAndTransferForm.questionThree.value,
            questionFour: liftAndTransferForm.questionFour.value,
            questionFive: liftAndTransferForm.questionFive.value,
            questionSix: liftAndTransferForm.questionSix.value,
            questionSeven: liftAndTransferForm.questionSeven.value,
            questionEight: liftAndTransferForm.questionEight.value,
            questionNine: liftAndTransferForm.questionNine.value,
            questionTen: liftAndTransferForm.questionTen.value,
            userGrade: userGrade,
            passOrFail: passOrFail
          })
          
          // close the test modal & reset form
  
          const modal = document.querySelector('#modal-lift-and-transfer');
          M.Modal.getInstance(modal).close();
          liftAndTransferForm.reset();
          userGrade = 0;
        }).catch(err => {
          console.log(err.message);
        });
    });
  });
  
  });