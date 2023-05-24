const input = document.querySelectorAll(`input`);
const errorMessage = document.querySelector(".error-message");
const loginBtn = document.querySelector(".login-btn");

let loginRequest = {
    method: "POST",
    headers: {
        "Content-type": "application/json"
    },
    body: null,
    mode: "cors",
    Credentials: "same-origin",
};

function loginInputValue() {
    const emailValue = input[0].value;
    const passwordValue = input[1].value;

    loginRequest.body = JSON.stringify({
        email: emailValue,
        password: passwordValue,
    });
}

loginBtn.addEventListener("click", async () => {
    loginInputValue();
    await fetch("http://localhost:5678/api/users/login", loginRequest)
        .then(res => res.json())
        .then(data => {
            let token = data.token;
            sessionStorage.setItem("Token", token);
            if (token) {
                window.location.href = "./index.html";
                console.log(data.token);
            } else {
                errorMessage.style.visibility = "visible";
            }
        });
});
