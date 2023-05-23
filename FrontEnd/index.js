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

    // affichage des images dans la modale

    let modalContentHTML = "";
    worksArray.forEach((work) => {
        modalContentHTML += `
            <img src="${work.imageUrl}">
            
      `;
    });
    modalImg.innerHTML = modalContentHTML;
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


const modal = document.querySelector("dialog")
const modalButton = document.querySelectorAll(".modal-button")
const closeModalIcon = document.querySelector(".close_modal_icon")
const modalContent = document.querySelector(".modal_content")
const modalImg = document.querySelector(".modal_img")

function OpenAndCloseModal() {

    modalButton.forEach(button => {
        button.addEventListener("click", () => {
            modal.show();
        })
    });
    closeModalIcon.addEventListener("click", () => {
        modal.close()
    })

}
OpenAndCloseModal()