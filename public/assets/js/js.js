$(document).ready(() => {

    // ================================================================================================
    // on load animation
    // ================================================================================================

    $(".burger").animate({ opacity: "1" }, 1000); // fade in existing burgers

    // ================================================================================================
    // animation functions
    // ================================================================================================

    const displayMirroredInput = (e) => {
        let input = e.target.value;
        if (input.length === 0) {
            $("#burger-preview-img").animate({ opacity: "0" }, 500);
        } else if (input.length <= 25) {
            $("#burger-preview-img").animate({ opacity: "0.8" }, 500);
            $("#length").text("");
        }
        $("#burger-preview").text(input);
    }

    // ================================================================================================
    // listeners
    // ================================================================================================

    $("body").on("click", ".burger", (event) => {
        let burgerId = event.currentTarget.getAttribute("data-id");
        let burgerEaten = event.currentTarget.getAttribute("data-eaten");
        $(`[data-id=${burgerId}]`).animate({opacity: "0"}, 1000);

        // now, we run a put to change the isDevoured property
        let updatedBurger;
        if (burgerEaten == 0) {
            updatedBurger = {
                isDevoured: 1,
                id: burgerId
            };
        } else {
            updatedBurger = {
                isDevoured: 0,
                id: burgerId
            };
        }

        $.ajax("/update", {
            method: "PUT",
            data: updatedBurger
        }).then(() => {
            location.reload();
        });
    });

    $("#burger").on("click", (event) => {
        event.preventDefault();

        let name = $("#burger-name").val().trim();

        // validation
        if (name.length < 1) {
            $("#length").text("Please Enter A Valid Name!");
            return;
        } else if (name.length >= 25) {
            $("#length").text("That name is too long!");
            return;
        } else {
            $("#length").text("");
        }

        let newBurger = {
            burger_name: name,
            isDevoured: 0
        };

        $.ajax("/burger", {
            method: "POST",
            data: newBurger
        }).then(() => {
            location.reload();
        });
    });

    $("#burger-name").on("input", (event) => {
        if (event)
        displayMirroredInput(event);
    });



});