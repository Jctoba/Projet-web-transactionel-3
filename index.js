let showSpinner = false;

let publication = [];

//accedre au DOM
document.addEventListener('DOMContentLoaded', () => {
    //accedre au container
    const cardContainer = document.querySelector('.card-container');
    
    if (cardContainer) {
        //On va faire la requet, et apres utiliser le DOM modifiers
        fetchPublication().then(() => {
            if (publication && publication.length > 0) {
                //verifier l'objet et pour chaque-un faire le card structure
                publication.forEach(pub => {
                    const card = document.createElement('div');
                    card.classList.add('col-sm-4', 'p-4');

                    const cardElement = document.createElement('div');
                    cardElement.classList.add('card');
                    cardElement.id = pub.id;
                    
                    const cardBody = document.createElement('div');
                    cardBody.classList.add('card-body');
                                        
                    const content = document.createElement('div');
                    content.classList.add('card-content');
                    
                    const img = document.createElement('img');
                    img.classList.add('card-img-top');
                    
                    //set path or default
                    img.setAttribute('src', pub.img || './assets/img/hummingbirdLogo.jpg');
                    img.setAttribute('alt', pub.alt);
                    
                    const title = document.createElement('h5');
                    title.classList.add('card-title');
                    title.textContent = pub.titre;
                    
                    const desc = document.createElement('p');
                    desc.classList.add('card-desc');
                    desc.textContent = pub.description;

                    const auteur = document.createElement('p');
                    auteur.classList.add('card-auteur');
                    auteur.textContent = "Auteur: "+ pub.auteur;

                    const date = document.createElement('p');
                    date.classList.add('card-date');
                    date.textContent = pub.date;
                    
                    const button = document.createElement('a');
                    button.classList.add('btn', 'text-white');
                    button.setAttribute('onclick', `ouvrirPublication(${pub.id})`);
                    button.setAttribute('style', 'background-color: #393E46;');
                    button.textContent = 'Ouvrir';
                    
                    content.appendChild(img);
                    content.appendChild(title);
                    content.appendChild(desc);
                    content.appendChild(auteur);
                    content.appendChild(button);
                    
                    cardBody.appendChild(content);

                    cardElement.appendChild(cardBody);
                    card.appendChild(cardElement);
                    
                    cardContainer.appendChild(card);
                });
            }
        })
        .catch((error) => {console.error("Requet erreur:",error)})
    } else {
        console.error('Il y a un erreur avec le container');
    }
});


//modal de bootstrap genere pour chaque pub
function ouvrirPublication(id) {
    const pubi = publication.find(pub => pub.id == id);
    if (pubi) {
        document.getElementById('modalTitle').textContent = pubi.titre;
        document.getElementById('modalDate').textContent = pubi.date;
        document.getElementById('modalContent').textContent = pubi.contenu;

        // Fetch et display commentaires
        fetchComments(id).then(comments => {
            console.log('comentarioooooss',comments);
            const commentsContainer = document.getElementById('modalComments');
            commentsContainer.innerHTML = ''; // nettoyer le contenu
            comments.forEach(comment => {
                const commentElement = document.createElement('p');
                commentElement.textContent = comment.contenu;
                commentsContainer.appendChild(commentElement);
            });
        });
        // Show the modal
        const modal = new bootstrap.Modal(document.getElementById('publicationModal'));
        modal.show();
    } else {
        alert("Publication erreur");
    }
}

// Add Vlogs
// Evenement pour envoyer le body a fetch du nouvelle pub
document.getElementById('addVlog').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario

    const newPub = {
        titre: document.getElementById('newTitle').value,
        description: document.getElementById('newDescription').value,
        contenu: document.getElementById('newContenu').value,
        auteur: document.getElementById('newAuthor').value,
        date: new Date().toISOString().split('T')[0] // Fecha actual
    };

    createPublication(newPub).then(response => {
        console.log('Publicación creada:', response);
    });
});

document.getElementById('commentButton').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario

    const newComment = {
        contenu: document.getElementById('commentText').value,
        postId: 1 // Reemplaza con el ID del post correspondiente
    };

    createComment(newComment).then(response => {
        console.log('Comentario creado:', response);
        // Aquí puedes actualizar el DOM para mostrar el nuevo comentario
        form.classList.add('d-none'); // Ocultar el formulario después de agregar el comentario
    });
});



////////////////////     api functions | servicessss ///////////////////////////////////

//Fetchs

//Retourner toutes les publications a la variable
function fetchPublication() {
    return fetch('http://localhost:3000/publications')
        .then(response => response.json())
        .then(data => { publication = data; })
        .catch(error => console.error('Error fetching data:', error));
}

//Retourner le comments avec un id du post param
function fetchComments(postId) {
    return fetch(`http://localhost:3000/comments?postId=${postId}`)
        .then(response => response.json())
        .catch(error => { console.error('Error fetching comments:', error);});
}

//PUBLICATIONS
function createPublication(newPub) {
    return fetch('http://localhost:3000/publications', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPub)
    })
    .then(response => response.json())
    .catch(error => console.error('Error creating publication:', error));
}

function updatePublication(id, updatedPub) {
    return fetch(`http://localhost:3000/publications/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPub)
    })
    .then(response => response.json())
    .catch(error => console.error('Error updating publication:', error));
}

function deletePublication(id) {
    return fetch(`http://localhost:3000/publications/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .catch(error => console.error('Error deleting publication:', error));
}


//COMMENTS
function createComment(newComment) {
    return fetch('http://localhost:3000/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newComment)
    })
    .then(response => response.json())
    .catch(error => console.error('Error creating comment:', error));
}


function updateComment(id, updatedComment) {
    return fetch(`http://localhost:3000/comments/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedComment)
    })
    .then(response => response.json())
    .catch(error => console.error('Error updating comment:', error));
}

function deleteComment(id) {
    return fetch(`http://localhost:3000/comments/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .catch(error => console.error('Error deleting comment:', error));
}





