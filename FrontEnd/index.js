const gallery = document.querySelector(".gallery");
const filters = document.querySelectorAll(".filter");
const modalImg = document.querySelector(".modal_img");

let works = [];

function WorksImport() {
    fetch("http://localhost:5678/api/works")
        .then((res) => res.json())
        .then((data) => {
            works = data;
            generateWorks(works);
            modalImgImport(works);

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

// ------- fonctionnement de la modale

const modal = document.querySelector("dialog");
const modalButton = document.querySelectorAll(".modal-button");
const closeModalIcon = document.querySelector(".close_modal_icon");
const modalContent = document.querySelector(".modal_content");
const editingToolsBanner = document.querySelector(".editing-tools-banner");
const modalAddWorkBtn = document.querySelector(".modal_add-btn")



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
        <i class="fa-regular fa-trash-can modal_trash-icon" data-id=${work.id}></i>
        <i class="fa-solid fa-arrows-up-down-left-right modal_arrow-icon"></i>
        <p>éditer</p>
      </div>
    `
    });
    modalImg.innerHTML = modalContentHTML;

    const modalDeleteWorkIcon = document.querySelectorAll(".modal_trash-icon")
}


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


function modalVersionToAddWork() {
    modalAddWorkBtn.addEventListener("click", () => {
        modalContent.innerHTML = "";
        modalContent.innerHTML =
            `
            <i class="fa-solid fa-arrow-left modal_add-work_return-icon"></i>
            <div class="modal_content">
                <h3>Ajout photo</h3>
                <form action="">
                    <div class="add-img-form">
                        <i class="fa-sharp fa-regular fa-image"></i>
                        <label for="photo" class="form-add-img-button">+ Ajouter photo</label>
                        <input type="file" id="photo" name="photo">
                        <p>jpg, png : 4mo max</p>
                    </div>
                    <div>
                        <div class="modal_add-work_input">
                            <label for="titre">Titre</label>
                            <input type="text" id="titre" name="titre">
                        </div>
                        <div class="modal_add-work_input">
                            <label for="categorie">Catégorie</label>
                            <select name="categorie" id="categorie">
                                <option value=""></option>
                                <option value="objets">Objets</option>
                                <option value="appartements">Appartements</option>
                                <option value="hotels_et_restaurants">Hotels et restaurants</option>
                            </select>
                        </div>
                    </div>
                </form>
            <span class="modal_line"></span>
            <button class="modal_add-work_confirm-btn">Valider</button>
            </div>
        `;
        const modalAddworkReturnIcon = document.querySelector(".modal_add-work_return-icon")

        modalAddworkReturnIcon.addEventListener("click", () => {
            modalContent.innerHTML = ""
            modalContent.innerHTML = modalContentHTML
        })

    });

}
modalVersionToAddWork()




