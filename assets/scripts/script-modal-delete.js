

// gestion de l'affichage de la modale de suppression
if (token) {   

    const modal = document.getElementById('modal');    

    function renderModalDelete() {

        modal.setAttribute('aria-hidden', 'false');
        const modalDelete = document.querySelector('.template-modal-delete');

        fetch("assets/template/modal-delete.html")
        .then(response => response.text())
        .then(data => {
            // insertion du template html "modal-delete"
            modalDelete.innerHTML = data;            
            const modalGallery = modalDelete.querySelector('.modal-gallery');   
            getProjects().then(projects => {
                if (modalGallery) 
                    renderProjectsModal(projects, modalGallery);
            });

            modalDelete.style.display = 'block';
            
            // fermeture de la modale lorsqu'on clique sur le bouton fermer
            const closeModalButton = modal.querySelector('.close-x');   
            closeModalButton.addEventListener('click', () => {
                modalDelete.innerHTML = '';
                modal.setAttribute('aria-hidden', 'true');
            });
            

            // femeture de la modale si on clique sur le bouton ajouter une photo, et ouverture de la modale d'ajout de photo
            const addPhotoButton = document.querySelector('.modal-add-photo-button');
            addPhotoButton.addEventListener('click', () => {
                modalDelete.innerHTML = '';
                renderModalAdd();
            });

        })
        .catch(error => console.error('Error fetching the template:', error));

    };
        
        
    function refreshGallery() {
        renderModalDelete();
        const galleryElement = document.querySelector('.gallery');   
        getProjects().then(projects => {
            if (galleryElement) {
                galleryElement.innerHTML = '';            
                renderProjects(projects, galleryElement);
            }
        });
    }



    function deleteWork (id) {
        
        fetch('http://localhost:5678/api/works/' + id, {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: "Bearer " + token,
            }
        })
        .then(response => {
            if (response.ok) {
                refreshGallery();
                return response.text().then(text => text ? JSON.parse(text) : {});
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .catch(error => console.error('Error deleting data:', error));        

    }

    function renderProjectsModal (projects, galleryElement) {
        projects.forEach(work => {
                const figureElement = document.createElement('figure');               
                const imgElement = document.createElement('img');
                const deleteButton = document.createElement('i');

                imgElement.src = work.imageUrl; 
                imgElement.alt = work.title;
                
                deleteButton.classList.add('fa-solid', 'fa-trash-can', 'trash');                
                deleteButton.addEventListener('click', () => {
                    
                    deleteWork(work.id);
                });
                
                figureElement.appendChild(imgElement);
                figureElement.appendChild(deleteButton);
                figureElement.dataset.id = work.id;

                galleryElement.appendChild(figureElement);
            });
    }
    
}