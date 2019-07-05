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
            window.localStorage.setItem("userId", user.id);
            window.location.assign("/");
        }).catch((error) => {
            console.log(error);
        });
    }

});
