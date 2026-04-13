let form = document.getElementById("form");

form.addEventListener("submit", async function (e) {
    e.preventDefault(); // which stop the unwanted load

    let valid_form = true; // for final check;

    let firstname = document.getElementById("firstname");
    let lastname = document.getElementById("lastname");
    let email = document.getElementById("email");
    let message = document.getElementById("message");
    let radios = document.querySelectorAll("input[name='same']");
    let consent = document.getElementById("checkbox");


    //Refresh all before all things

    document.querySelectorAll("input,textarea").forEach(el => {
        el.classList.remove("error-text");
    })

    document.querySelectorAll(".error").forEach(el => {
        el.textContent = "";
    })


    //now for logic match -- normal logics

    if (firstname.value.trim() === "") {
        errorShow(firstname, "This Field is Required");
        valid_form = false;
    }
    if (lastname.value.trim() === "") {
        errorShow(lastname, "This Field is Required");
        valid_form = false;
    }
    if (message.value.trim() === "") {
        errorShow(message, "This Field is Required");
        valid_form = false;
    }

    //email logic
    if (!validate_email(email.value)) {
        errorShow(email, "This Email is Not Valid");
        valid_form = false;
    }

    //radio button logics

    let checked = false;

    radios.forEach(el => {
        if (el.checked) { checked = true; }
    })

    if (!checked) {

        let formset = radios[0].closest(".form-set");

        formset.querySelector(".error").textContent = "Please Select One Query";

        valid_form = false;

    }

    //Checkbox logics

    if (!consent.checked) {
        document.getElementById("checkbox-error").textContent = "Accept the Consent for Submission";

        valid_form = false;
    }

    if (valid_form == true) {

        const full_name = firstname.value + " " + lastname.value;

        const data = {
            full_name: full_name,
            email: email.value,
            message: message.value
        }

        try {
            const res = await fetch("/api/contact", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            console.log(res.status); // 👈 add this

            if (res.ok) {
                alert("Successfully Submitted");
                form.reset();
            } else {
                alert("Invalid Input, Try Again Later");
            }
        }
        catch (err) {
            console.log("error");
        }

    }
})

// element with message
function errorShow(input, error_message) {
    let msgs = input.closest(".form-set").querySelector(".error");
    msgs.textContent = error_message;

    input.classList.add("error-text"); // style add function in js
}

//email check logic
function validate_email(email_value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email_value);
}

