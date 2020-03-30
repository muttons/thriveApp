// getTestOne
const testForm = document.querySelector('#test-form-one');


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

      //adds the data to the testOne collection
      db.collection('mail').add({
        
        from: user.email,
        to: 'help.desk@thriveupstate.org',
        replyTo: user.email,
        message: {
        subject: testForm.subject.value,
        text: testForm.text.value,
        html: `<h2> New ticket from Thrive App Submitted by</h2> ${user.email}.` 
        }

      }).then(() => {
        // close the test modal & reset form
        const modal = document.querySelector('#modal-test');
        M.Modal.getInstance(modal).close();

      }).catch(err => {
        console.log(err.message);
      });
  });
});

