
const token = localStorage.getItem('token');


const galleryElement = document.querySelector('.gallery');

let categories = new Set();

// récupération des éléments de classe édition
let elementsEdition = document.querySelectorAll('.edition');

// s'il n'y a pas de token, les éléments éditions sont masqués et "log out" est transformé en "log in"
if (!token) {
    for (i = 0; i < elementsEdition.length; i++){
        elementsEdition[i].classList.add("hidden");
        const logoutElement = document.querySelector('.logout');
        if (logoutElement) {
            logoutElement.textContent = 'log in';
        }
    }
    
} else {
    // vérification que le tokendate de moins de 24h, sinon redirection vers la page de login
    const tokenData = JSON.parse(atob(token.split('.')[1]));
    const tokenAge = Date.now() - tokenData.iat * 1000;
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

    if (Date.now() >= tokenData.exp * 1000 || tokenAge > oneDayInMilliseconds) {
        // suppression du token
        localStorage.setItem('token', '');
        window.location.href = '/login.html';
    }
}

categories.add({ id: 0, name: 'Tous' }); // all categories

function filterProjectsByCategory(categoryId) {
    const figures = galleryElement.querySelectorAll('figure');
    figures.forEach(figure => {
        if (categoryId === 0 || figure.dataset.categoryId == categoryId) {
            figure.style.display = '';
        } else {
            figure.style.display = 'none';
        }
    });
}

const categoriesElement = document.querySelector('.categories');
if (categoriesElement) {
    categoriesElement.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const categoryId = parseInt(event.target.dataset.categoryId, 10);
            filterProjectsByCategory(categoryId);
        }
    });

    function renderCategories(categories) {    
        let isFirstCategory = true; // Flag to check if it's the first category

        categories.forEach(category => {
            const buttonCategorie = document.createElement('button');
            buttonCategorie.textContent = category.name;
            buttonCategorie.dataset.categoryId = category.id;
            buttonCategorie.classList.add('category-btn', 'category-btn-notselected');
            
            buttonCategorie.addEventListener('click', () => {
                document.querySelectorAll('.categories button').forEach(btn => {
                    btn.classList.remove('category-btn-selected');
                    btn.classList.add('category-btn-notselected');
                });
                buttonCategorie.classList.remove('category-btn-notselected');
                buttonCategorie.classList.add('category-btn-selected');
            });

            if (isFirstCategory) {
                buttonCategorie.classList.remove('category-btn-notselected');
                buttonCategorie.classList.add('category-btn-selected');
                isFirstCategory = false; // Set the flag to false after the first category
            }
            const categoriesDom = document.querySelector('.categories'); // Get the html element for the categories
            categoriesDom.appendChild(buttonCategorie);
        });
    }

    function getCategories () {
        fetch('http://localhost:5678/api/categories')
            .then(response => response.json())
            .then(data => {
                data.forEach(category => {
                    categories.add({ id: category.id, name: category.name });
                });
                renderCategories(categories);
                
            })
            .catch(error => console.error('Error fetching categories:', error));
    }
    
    getCategories();

}


function getProjects() {
    return fetch('http://localhost:5678/api/works')
        .then(response => response.json())
        .then(data => {
            const projects = data.map(work => ({
                id: work.id,
                title: work.title,
                imageUrl: work.imageUrl,
                categoryId: work.categoryId
            }));
            return projects;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            return [];
        });
}


function renderProjects(projects, galleryElement) {
    galleryElement.innerHTML = '';
    projects.forEach(work => {
            const figureElement = document.createElement('figure');
            figureElement.dataset.categoryId = work.categoryId; // Add category ID to figure element
            
            const imgElement = document.createElement('img');
            imgElement.src = work.imageUrl; 
            imgElement.alt = work.title;
            
            const figcaptionElement = document.createElement('figcaption');
            figcaptionElement.textContent = work.title;
            
            figureElement.appendChild(imgElement);
            figureElement.appendChild(figcaptionElement);
            
            galleryElement.appendChild(figureElement);
        });
}

getProjects().then(projects => {
    if (galleryElement) renderProjects(projects, galleryElement);
});


document.addEventListener('DOMContentLoaded', () => {
    const openModalButton = document.querySelector('.modifier-projets');
    const modal = document.getElementById('modal');    
    
    // gestion de l'affichage de l'overlay
    const overlay = document.querySelector('.overlay');

    function hideModalAndRefreshGallery() {
        
        const modalAdd = document.querySelector('.template-modal-add');
        modalAdd.innerHTML = '';
        modal.setAttribute('aria-hidden', 'true');
        overlay.style.display = 'none';
        getProjects().then(projects => {
            if (galleryElement) renderProjects(projects, galleryElement);
        });

    }

    // fermeture de la modale lorsqu'on clique en dehors de la modale
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            hideModalAndRefreshGallery();            
        }
    });

    // fermeture de la modale lorsqu'on clique sur la touche escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            hideModalAndRefreshGallery();
        }
    });

    // gestion du clic sur le texte et le crayon modifier projets
    if (openModalButton) {
        openModalButton.addEventListener('click', () => {            
            overlay.style.display = 'block';
            renderModalDelete();
        });
    }

    // gestion du clic sur l'overlay pour masquer la modale
    if (overlay) {
        overlay.addEventListener('click', () => {
            hideModalAndRefreshGallery();
        });
    }


});