const gallery = document.querySelector(".gallery");
const filters = document.querySelectorAll(".filter");

let works = [];


async function WorksImport() {

    await fetch("http://localhost:5678/api/works")
        .then((res) => res.json())
        .then((data) => (works = data));


    works.forEach((work) => {
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

        console.log(work.category);
    })

}
WorksImport()


