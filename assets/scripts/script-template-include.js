

// gestion de l'affichage de la modal
if (token) {   

    const urlParams = new URLSearchParams(window.location.search);
    const templateUrl = urlParams.get('template') + ".html";
    
    var loadJS = function(url){   
        var scriptTag = document.createElement('script');
        scriptTag.src = url;         
        document.body.appendChild(scriptTag);
    };

    fetch(templateUrl)
        .then(response => response.text())
        .then(data => {
            document.querySelector('.template-modal').innerHTML = data;
            let scriptUrl = "/assets/scripts/script-" + urlParams.get('template') + ".js";
            loadJS (scriptUrl);

            if (urlParams.get('template') === 'modal-delete') {
                const modalGallery = document.querySelector('.modal-gallery');   
                getProjects().then(projects => {
                    if (modalGallery) 
                        renderProjectsModal(projects, modalGallery);
                });
            } else if (urlParams.get('template') === 'modal-add') {
                
            }
        })
        .catch(error => console.error('Error fetching the template:', error));
}
