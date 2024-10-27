
// gestion de l'affichage de la modale d'ajout
if (token) {   

    const modal = document.getElementById('modal');
    function renderModalAdd()  {   
        modal.setAttribute('aria-hidden', 'false');

        const modalAdd = document.querySelector('.template-modal-add');

        fetch("/assets/template/modal-add.html")
        .then(response => response.text())
        .then(data => {
            // insertion du template html "modal-delete"
            modalAdd.innerHTML = data;    
            modalAdd.style.display = 'block';
        
            const closeModalButton = modal.querySelector('.close-x');   
            closeModalButton.addEventListener('click', () => {
                modalAdd.innerHTML = '';
                renderModalDelete();
                modal.setAttribute('aria-hidden', 'true');           
                
            });


            // femeture de la modale si on clique sur le bouton retour, et ouverture de la modale de suppression de photos
            const backArrow = document.querySelector('.back-arrow');
            backArrow.addEventListener('click', () => {
                modalAdd.innerHTML = '';                
                renderModalDelete();
                
            });

            // ajout des valeurs catégories dans le select
            const selectElement = document.querySelector('.category-choice');
            categories.forEach(category => {
                
                    const optionElement = document.createElement('option');
                    optionElement.value = category.id;
                    optionElement.textContent = category.name;
                    if (category.id == 0) { // remplacer la catégorie "Toutes les catégories" par une chaîne vide
                        optionElement.textContent = "";
                    }
                    selectElement.appendChild(optionElement);
                
            });

            // Function to update the state of the confirm button
            function updateConfirmButtonState() {
                if (title.value === "" || category.value == 0 || addPhoto.value === "") {
                    //confirmButton.disabled = true;
                    confirmButton.classList.remove('enabled');
                } else {
                    //confirmButton.disabled = false;
                    confirmButton.classList.add('enabled');
                }
            }
            

            // ajout de la prévisualisation de l'image
            const addPhoto = document.getElementById('add-photo');
            addPhoto.addEventListener('change', (event) => {                
                const previewImage = document.createElement("img");
                previewImage.src = URL.createObjectURL(event.target.files[0]);
                previewImage.style.maxHeight = "100%";
                previewImage.style.width = "auto";
                document.querySelector(".add-photo-button").style.display = "none";
                document.querySelector(".photo-icon").style.display = "none";
                document.querySelector(".new-photo > p").style.display = "none";
                document.querySelector(".new-photo").appendChild(previewImage);
                updateConfirmButtonState();
            });

            const confirmButton = document.querySelector('.add-photo-confirm-button');
            const title = document.getElementById('title-input');
            const category = document.getElementById('category-input');
      
            // Add event listeners to update the button state on input changes
            title.addEventListener('input', updateConfirmButtonState);
            category.addEventListener('change', updateConfirmButtonState);

            // Initial check to set the button state
            updateConfirmButtonState();


            function addWork (formData) {
                fetch("http://localhost:5678/api/works", {
                    method: 'POST',
                    headers: {
                        Accept: "application/json",
                        Authorization: "Bearer " + token,
                    },
                    body: formData,
                }).then(response => {
                    if (response.ok) {
                        modalAdd.innerHTML = '';                        
                        modal.setAttribute('aria-hidden', 'true');
                        refreshGallery();
                    }
                }).catch(error => console.error('Error adding work:', error));
            }

            // envoi du formulaire lors du clic sur le bouton de validation. Les champs doivent être remplis
            confirmButton.addEventListener('click', () => {
                // vérification des champs du formulaire
                const title = document.getElementById('title-input');
                const category = document.getElementById('category-input');
                const errorMessage = document.querySelector('.errorMessage');
                if (title.value == "" || category.value == 0 || addPhoto.value == "") {
                    errorMessage.textContent = "Veuillez ajouter une photo et remplir tous les champs du formulaire";
                } else {
                    const formData = new FormData();
                    formData.append('title', title.value);
                    formData.append('category', category.value);
                    formData.append('image', addPhoto.files[0]);
                    addWork(formData);
                }
            });
    
        }).catch(error => console.error('Error fetching the template:', error));
    }
}
