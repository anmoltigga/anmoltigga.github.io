emailjs.init("aDo2v1Q46NLhqHvgH");

document
.getElementById("contact-form")
.addEventListener("submit", function(e){

    e.preventDefault();

    emailjs.sendForm(
        "service_zp45lau",
        "template_f3bjunj",
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
