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
        if (burgerEaten === "false") {
            updatedBurger = {
                isDevoured: true
            };
        } else {
            updatedBurger = {
                isDevoured: false
            };
        }

        $.ajax("/api/burger/" + burgerId, {
            method: "PUT",
            data: updatedBurger
        }).then(() => {
            // now I have to run the game instead of reload location!
            location.reload();
        });
    });

    $("form").on("submit", (event) => {
        event.preventDefault();

        // construct the burger
        let UserId = $("#burger").attr("data-id");
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
            name: name,
            isDevoured: false,
            UserId: UserId
        };

        $.ajax("/api/burger", {
            method: "POST",
            data: newBurger
        }).then((data) => {
            location.reload();
        });
    });

    $("#burger-name").on("input", (event) => {
        if (event)
        displayMirroredInput(event);
    });



});