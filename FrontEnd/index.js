const gallery = document.querySelector(".gallery");
const filters = document.querySelectorAll(".filter");
const modalImg = document.querySelector(".modal_img");

let works = [];

async function WorksImport() {
    await fetch("http://localhost:5678/api/works")
        .then((res) => res.json())
        .then((data) => {
            works = data;
            generateWorks(works);
            modalImgImport(works); // Affiche toutes les images dans la modale

            console.log(works);
        });
}

WorksImport();

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
                filteredWorks = works.filter(
                    (work) => work.category.name === filterValue
                );
            }
            generateWorks(filteredWorks);
        });
    });
}
worksFilter();




// fonctionnement de la modale

const modal = document.querySelector("dialog");
const modalButton = document.querySelectorAll(".modal-button");
const closeModalIcon = document.querySelector(".close_modal_icon");
const modalContent = document.querySelector(".modal_content");
const editingToolsBanner = document.querySelector(".editing-tools-banner");


//condition si utilisateur connecté

if (sessionStorage.getItem("Token")) {
    editingToolsBanner.style.display = "flex"

    modalButton.forEach(button => {
        button.style.display = "flex";

    })
}


function modalImgImport(worksArray) {
    let modalContentHTML = "";
    worksArray.forEach((work) => {
        modalContentHTML += `
      <div class="modal_img-edit_position">
        <img src="${work.imageUrl}">
        <i class="fa-regular fa-trash-can modal_trash-icon"></i>
        <i class="fa-solid fa-arrows-up-down-left-right modal_arrow-icon"></i>
        <p>éditer</p>
      </div>
    `;
    });
    modalImg.innerHTML = modalContentHTML;
}

const modalDeleteWorkIcon = document.querySelectorAll(".modal_can-icon")
console.log(modalDeleteWorkIcon);

function OpenAndCloseModal() {
    modalButton.forEach((button) => {
        button.addEventListener("click", () => {
            modal.showModal();
        });
    });
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.close();
        }
    });

    closeModalIcon.addEventListener("click", () => {
        modal.close();
    });
}
OpenAndCloseModal();