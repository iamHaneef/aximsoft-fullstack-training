const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const res = await fetch("/admin/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username, password
                })
            }
        )
        const data = await res.json(); // token get here

        if (res.ok) {
            localStorage.setItem("token", data.token);
            window.location.href = "/dashboard.html";
        }
        else {
            alert("Login failed");
        }
    }
    catch (err) {
        console.log(err, "Error")
    }
})

