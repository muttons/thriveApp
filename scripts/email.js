// getticketOne
const ticketForm = document.querySelector('#ticket-form-one');


firebase.auth().onAuthStateChanged(function(user) {
ticketForm.addEventListener('submit', (e) => {
  e.preventDefault();
      //preloader
      document.querySelector('.loader1').classList.add('progress');
      document.querySelector('.loader2').classList.add('indeterminate');

    setTimeout(function() {
      document.querySelector('.loader1').classList.remove('progress');
      document.querySelector('.loader2').classList.remove('indeterminate');
    },3000);

      //adds the data to the mail collection
      db.collection('mail').add({
        
        from: user.email,
        to: 'help.desk@thriveupstate.org',
        replyTo: user.email,
        message: {
        subject: ticketForm.subject.value,
        text: ticketForm.text.value,
        html: `
        
        <h2> New ticket from Thrive App Submitted by ${user.email} </h2> 
        <br><br> 
        <h3> Ticket Information </h3> 
        <br>
        ${ticketForm.text.value}
        ` ,
        attachments: [
          {
            content: attachment,
            filename: ticketForm.subject.value,
            type: "application/pdf",
            disposition: "attachment"
          }
        ]
        }

      }).then(() => {
        // close the ticket modal & reset form
        const modal = document.querySelector('#modal-ticket');
        M.Modal.getInstance(modal).close();

      }).catch(err => {
        console.log(err.message);
      });
  });
});

