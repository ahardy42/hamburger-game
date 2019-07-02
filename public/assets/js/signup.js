$(document).ready(() => {

    // get values for login / user create
    $(".sign-up").on("submit", (event) => {
        event.preventDefault();
        const email = $("#email").val().trim();
        const password = $("#password").val().trim();

        if (!email || !password) {
            return;
        }

        submitForm(email, password);
        $("#email").val("");
        $("#password").val("");
    });


    const submitForm = (email, password) => {
        $.post("/api/signup", {
            email: email,
            password: password
        }).then((user) => {
            console.log(user);
            window.location.replace("/");
        }).catch((error) => {
            console.log(error);
        });
    }

});
