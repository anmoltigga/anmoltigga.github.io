emailjs.init("PUBLIC_KEY");

document
.getElementById("contact-form")
.addEventListener("submit", function(e){

    e.preventDefault();

    emailjs.sendForm(
        "SERVICE_ID",
        "TEMPLATE_ID",
        this
    )
    .then(function(){

        alert("Message sent successfully!");

    })
    .catch(function(error){

        console.error(error);

        alert("Failed to send message.");

    });

});
