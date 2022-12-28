
let listWork
let listCat = 0;

let filtres = document.getElementById("filtres")

    fetch ("http://localhost:5678/api/works")
    .then(res => res.json())
   
    .then( works => { 
        listWork = works
        for (let work of works) {
            displayWork(work)

                                                        
    }
    })
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
        listCat = categories
        for (let categorie of categories) {
            displayCategorie(categorie)            
        }
    })  
    .then(ok => {
        let allFiltreBtn = filtres.getElementsByTagName("button") 
   
        for (let i=0; i< allFiltreBtn.length; i++) {
            let idCat = allFiltreBtn[i].getAttribute('data-id')
 console.log(idCat)
            allFiltreBtn[i].addEventListener('click', filtree => {
                alert(idCat)
            }
            )
    }})

    .catch(error => {
            alert(error)
    })
    
    function displayCategorie(categorie) {
    filtres.innerHTML += `<li><button data-id="${categorie.id}"> ${categorie.name}</button></li>`   
}

function filtree(idCat) {
    gallery.innerHTML = ""
    if (idCat == 0){       
        displayWork(work)
    }else (idCat == work.categoryId)
        displayWork(work)   
}
console.log(allFiltreBtn.length)
