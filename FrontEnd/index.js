const gallery = document.querySelector(".gallery");
const filters = document.querySelectorAll(".filter");

let works = [];


async function WorksImport() {
    await fetch("http://localhost:5678/api/works")
        .then((res) => res.json())
        .then((data) => (works = data));

    console.log(works);
}

