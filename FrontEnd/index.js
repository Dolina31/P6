const gallery = document.querySelector(".gallery");
const filters = document.querySelectorAll(".filter");

let works = [];


async function WorksImport() {

    await fetch("http://localhost:5678/api/works")
        .then((res) => res.json())
        .then((data) => {
            works = data
            generateWorks(works)
        })
}
WorksImport()

function generateWorks(worksArray) {
    gallery.innerHTML = "";

    worksArray.forEach((work) => {
        const figure = document.createElement("figure");
        gallery.appendChild(figure);
        figure.classList = work.category.name;

        const img = document.createElement("img");
        img.src = work.imageUrl;
        img.alt = work.title;
        figure.appendChild(img);

        const figcaption = document.createElement("figcaption");
        figcaption.innerHTML = work.title;
        figure.appendChild(figcaption);
    });
}

function worksFilter() {
    filters.forEach((filter) => {
        const filterValue = filter.textContent;

        filter.addEventListener("click", () => {
            let filteredWorks = [];
            if (filterValue === "Tous") {
                filteredWorks = works;
            } else {
                filteredWorks = works.filter(work => work.category.name === filterValue);
            }
            generateWorks(filteredWorks);
        });
    });
};
worksFilter();

//----- Fonctions pour le log in

const input = document.querySelectorAll(`input`);
const errorMessage = document.querySelector(".error-message");
const loginBtn = document.querySelector(".login-btn");
const editingToolsBanner = document.querySelector(".editing-tools-banner");
const modalTrigger = document.querySelectorAll(".modal-trigger")

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

loginBtn.addEventListener("click", () => {
    loginInputValue();
    fetch("http://localhost:5678/api/users/login", loginRequest)
        .then(res => res.json())
        .then(data => {
            let token = data.token;
            sessionStorage.setItem("Token", token);
            if (data.token) {
                window.location.href = "./index.html";
            } else {
                errorMessage.style.visibility = "visible";
            }
        });
});