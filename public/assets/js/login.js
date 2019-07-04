$(document).ready(() => {

    // get values for login / user create
    $(".login").on("submit", (event) => {
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
        $.post("/api/login", {
            email: email,
            password: password
        }).then((user) => {
            window.location.assign("/?user="+user.id);
        }).catch((error) => {
            console.log(error);
        });
    }

});
