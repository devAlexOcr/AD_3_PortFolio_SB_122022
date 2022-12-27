
let listWork
let listCategorie


    fetch ("http://localhost:5678/api/works")
    .then(res => res.json())
   
    .then( works => {
        for (let work of works) {
            displayWork(work)                      
            listWork = work 

    }}) 

    .catch(error => {
        alert(error)
    })


const gallery = document.getElementById("gallery") 

function displayWork(work) {      
    gallery.innerHTML += `<figure>
                            <img crossorigin="anonymous" src="${work.imageUrl}" alt="${work.title}">
                            <figcaption>${work.title}</figcaption>
                        </figure>`                        
}




    fetch ("http://localhost:5678/api/categories")
    .then(res => res.json())

    .then(categories => {
        for (let categorie of categories) {
            displayCategorie(categorie) 
            listCategorie = categorie
                              
        }
    })       
    .catch(error => {
        alert(error)
    })

const filtres = document.getElementById("filtres")

    function displayCategorie(categorie) {
    filtres.innerHTML += `<button data-id="${categorie.id}" onclick="filtre()"><li> ${categorie.name}</li></button>`   
}

let idCat = document.querySelector("button")

async function filtre (work) {

    if (idCat.dataset.id === work.categoryId || idCat.dataset.id === 0) {
        gallery.innerHTML = ""
        displayWork()
        
     }else{
         ""
     }
    }