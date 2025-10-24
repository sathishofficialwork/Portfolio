const btn = document.getElementById('blastButton');

const form = document.getElementById("form");
const formSubmitMsg = document.getElementById("form-submission-msg");

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Sending...';

   const serviceID = 'default_service';
   const templateID = 'template_plq6zmm';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Email';
    //   alert('✅ Message sent successfully!');
    }, (err) => {
      btn.value = 'Send Email';
      alert('❌ Failed to send message: '+JSON.stringify(err));
    });



    form.style.display="none";

    const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            createExplosion(centerX, centerY);
   
   setTimeout(function () {
    formSubmitMsg.style.display="block";
  }, 1500);
    

});

