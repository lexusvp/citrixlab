const secureToken = ""; //Secure Token Here

const form = document.getElementById("form-feild");
const formButton = document.getElementById("form-button");
form.addEventListener("submit", function(event) {
    event.preventDefault();
    //Get all fields entries
    const data = Object.fromEntries(new FormData(form).entries());
    formButton.innerText = "Please Wait";
    //Send Email
    sendEmail(data);
});


function sendEmail(data) {
    //Sending multiple emails
    var recipientEmails = data['recipient-email'];
    recipientEmails = recipientEmails.split(',');

    Email.send({
        SecureToken: secureToken, //Get SecureToken https://smtpjs.com/#useit
        To: recipientEmails,
        From: data['sender-email'],
        Subject: data['subject'],
        Body: "<html>" + data['message'] + "</html>"
    }).then(
      function(message) {
          if (message === 'OK') {
              alert('Email Sent.');
              form.reset();
          }else {
            alert(message)
          }
          formButton.innerText = "Send Email";
      }
    );
}
