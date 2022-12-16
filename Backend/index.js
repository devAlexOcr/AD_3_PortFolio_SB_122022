fetch ("http://localhost:5678/api/works")
    .then(res =>{
        if (res.ok){
              return res.json()
        } else {
            console.log('erreur serveur')
        }
    })
       
    .then(works => {
        for (let work of works) {
            displayWork(work) 
        }    
    })
    .catch(error => {
        alert(error)
    })


function displayWork(work) {
    const gallery = document.getElementById("gallery")
    gallery.innerHTML += `<figure>
                            <img crossorigin="anonymous" src="${work.imageUrl}" alt="${work.title}">
                            <figcaption>${work.title}</figcaption>
                        </figure>` 
                        console.log(work)
}


fetch ("http://localhost:5678/api/categories")
    .then(res => res.json())

    .then(categories => {
        for (let categorie of categories) {
            displayCategorie(categorie)
        }
    })
    .catch(error => {
        alert(error)
    })

function displayCategorie(categorie) {
    const filtres = document.getElementById("filtres")
    filtres.innerHTML += `<li id="${categorie.id}"> ${categorie.name}</li>`
    console.log(categorie)
}
