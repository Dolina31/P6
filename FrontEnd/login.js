const inputs = document.querySelectorAll("input");
const errorMessage = document.querySelector(".error-message");
const loginBtn = document.querySelector(".login-btn");

function loginRequest() {
    const emailValue = inputs[0].value;
    const passwordValue = inputs[1].value;

    let loginRequest = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            email: emailValue,
            password: passwordValue,
        }),
        mode: "cors",
        credentials: "same-origin",
    };

    fetch("http://localhost:5678/api/users/login", loginRequest)
        .then(res => res.json())
        .then(data => {
            let token = data.token;
            localStorage.setItem("Token", token);
            if (token) {
                window.location.href = "./index.html";
            } else {
                errorMessage.style.visibility = "visible";
            }
        });
}

loginBtn.addEventListener("click", loginRequest);

inputs.forEach(input => {
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            loginRequest();
        }
    });
});

