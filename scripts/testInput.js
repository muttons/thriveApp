// getTestOne
const form = document.querySelector('.testForm');
const result = document.querySelector('.result');
const testForm = document.querySelector('#test-form-one');
const liftAndTransferForm = document.querySelector('#lift-and-transfer-form');
const therapeuticOptionsForm = document.querySelector('#therapeutic-Options-Form');
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
      },2000);

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
  
        //adds the data to the liftAndTransfer collection
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
          Swal.fire({
            icon: 'success',
            title: 'Your test has been submitted',
            showConfirmButton: false,
            timer: 3000
          })
        }).catch(err => {
          console.log(err.message);
        });
    });
  });
  
  });

  // Therapeutic Options Test

firebase.auth().onAuthStateChanged(function(user) {
  therapeuticOptionsForm.addEventListener('submit', (e) => {
    e.preventDefault();
        //preloader
        document.querySelector('.loader1').classList.add('progress');
        document.querySelector('.loader2').classList.add('indeterminate');
  
      setTimeout(function() {
        document.querySelector('.loader1').classList.remove('progress');
        document.querySelector('.loader2').classList.remove('indeterminate');
      },2000);

    //cloud function to get the array for therapeauticOptions one
    const getTherapeuticOptions = firebase.functions().httpsCallable('getTherapeuticOptions');
    getTherapeuticOptions().then(result => {
      let getTherapeuticOptions = result.data;
      // grab the users answers from TherapeuticOptions
      let userAnswers = [ 
        therapeuticOptionsForm.questionOne.value, 
        therapeuticOptionsForm.questionTwo.value, 
        therapeuticOptionsForm.questionThree.value,
        therapeuticOptionsForm.questionFour.value,
        therapeuticOptionsForm.questionFive.value,
        therapeuticOptionsForm.questionSix.value,
        therapeuticOptionsForm.questionSeven.value,
        therapeuticOptionsForm.questionEight.value,
        therapeuticOptionsForm.questionNine.value,
        therapeuticOptionsForm.questionTen.value,
        therapeuticOptionsForm.questionEleven.value,
        therapeuticOptionsForm.questionTwelve.value,
        therapeuticOptionsForm.questionThirteen.value,
        therapeuticOptionsForm.questionFourteen.value,
        therapeuticOptionsForm.questionFifteen.value,
        therapeuticOptionsForm.questionSixteen.value,
        therapeuticOptionsForm.questionSeventeen.value,
        therapeuticOptionsForm.questionEighteen.value,
        therapeuticOptionsForm.questionNineteen.value,
        therapeuticOptionsForm.questionTwenty.value
      ];

      //compare users answers to the test one array of answers for validation
      userAnswers.forEach((answer, index) => {
        if (answer === getTherapeuticOptions[index]){
          userGrade += 5;
        } if (userGrade >= 80) {
          passOrFail = 'Passed';
        } else {
          passOrFail = 'Failed';
        };
      });
  
        //adds the data to the therapeuticOptions collection
        db.collection('therapeuticOptions').add({
          date: date+" "+time,
          email: user.email,
          questionOne: therapeuticOptionsForm.questionOne.value,
          questionTwo: therapeuticOptionsForm.questionTwo.value,
          questionThree: therapeuticOptionsForm.questionThree.value,
          questionFour: therapeuticOptionsForm.questionFour.value,
          questionFive: therapeuticOptionsForm.questionFive.value,
          questionSix: therapeuticOptionsForm.questionSix.value,
          questionSeven: therapeuticOptionsForm.questionSeven.value,
          questionEight: therapeuticOptionsForm.questionEight.value,
          questionNine: therapeuticOptionsForm.questionNine.value,
          questionTen: therapeuticOptionsForm.questionTen.value,
          questionEleven: therapeuticOptionsForm.questionEleven.value,
          questionTwelve: therapeuticOptionsForm.questionTwelve.value,
          questionThirteen: therapeuticOptionsForm.questionThirteen.value,
          questionFourteen: therapeuticOptionsForm.questionFourteen.value,
          questionFifteen: therapeuticOptionsForm.questionFifteen.value,
          questionSixteen: therapeuticOptionsForm.questionSixteen.value,
          questionSeventeen: therapeuticOptionsForm.questionSeventeen.value,
          questionEighteen: therapeuticOptionsForm.questionEighteen.value,
          questionNineteen: therapeuticOptionsForm.questionNineteen.value,
          questionTwenty: therapeuticOptionsForm.questionTwenty.value,
          userGrade: userGrade,
          passOrFail: passOrFail
  
      
        }).then(() => {
          //adds the data to the archive 
          db.collection('archive').add({
            date: date+" "+time,
            email: user.email,
            questionOne: therapeuticOptionsForm.questionOne.value,
            questionTwo: therapeuticOptionsForm.questionTwo.value,
            questionThree: therapeuticOptionsForm.questionThree.value,
            questionFour: therapeuticOptionsForm.questionFour.value,
            questionFive: therapeuticOptionsForm.questionFive.value,
            questionSix: therapeuticOptionsForm.questionSix.value,
            questionSeven: therapeuticOptionsForm.questionSeven.value,
            questionEight: therapeuticOptionsForm.questionEight.value,
            questionNine: therapeuticOptionsForm.questionNine.value,
            questionTen: therapeuticOptionsForm.questionTen.value,
            questionEleven: therapeuticOptionsForm.questionEleven.value,
            questionTwelve: therapeuticOptionsForm.questionTwelve.value,
            questionThirteen: therapeuticOptionsForm.questionThirteen.value,
            questionFourteen: therapeuticOptionsForm.questionFourteen.value,
            questionFifteen: therapeuticOptionsForm.questionFifteen.value,
            questionSixteen: therapeuticOptionsForm.questionSixteen.value,
            questionSeventeen: therapeuticOptionsForm.questionSeventeen.value,
            questionEighteen: therapeuticOptionsForm.questionEighteen.value,
            questionNineteen: therapeuticOptionsForm.questionNineteen.value,
            questionTwenty: therapeuticOptionsForm.questionTwenty.value,
            userGrade: userGrade,
            passOrFail: passOrFail
          })
          
          // close the test modal & reset form
  
          const modal = document.querySelector('#modal-therapeutic-options');
          M.Modal.getInstance(modal).close();
          therapeuticOptionsForm.reset();
          userGrade = 0;
          Swal.fire({
            icon: 'success',
            title: 'Your test has been submitted',
            showConfirmButton: false,
            timer: 3000
          })
        }).catch(err => {
          console.log(err.message);
        });
    });
  });
  
  });