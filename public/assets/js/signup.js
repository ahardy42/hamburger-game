$(document).ready(() => {

    // get values for login / user create
    $(".sign-up").on("submit", (event) => {
        event.preventDefault();
        const name = $("#name").val().trim();
        const email = $("#email").val().trim();
        const password = $("#password").val().trim();

        if (!name || !email || !password) {
            return;
        }

        submitForm(name, email, password);
        $("#name").val("");
        $("#email").val("");
        $("#password").val("");
    });


    const submitForm = (name, email, password) => {
        $.post("/api/signup", {
            name: name,
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
