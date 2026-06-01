emailjs.init("YOUR_PUBLIC_KEY");

document
.getElementById("contact-form")
.addEventListener("submit", function(e){

    e.preventDefault();

    emailjs.sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        this
    )
    .then(() => {

        alert("Message Sent Successfully!");

        this.reset();

    })
    .catch(error => {

        console.error(error);

        alert("Failed to send message.");

    });

});
