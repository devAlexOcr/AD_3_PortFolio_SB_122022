let listWork = []
console.log(listWork)

let listCategorie =[]
console.log(listCategorie)

const elt = document.getElementsByName('button')
console.log(elt[0])

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
            if ( listCategorie.id === work.categoryId) {
                
                displayWork()
            } else {
                ''
            }
            listWork.push(work)                      
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
}


fetch ("http://localhost:5678/api/categories")
    .then(res => res.json())

    .then(categories => {
        for (let categorie of categories) {
            displayCategorie(categorie)
            listCategorie.push(categorie)
            
        }
    })
    .catch(error => {
        alert(error)
    })


function displayCategorie(categorie) {
    const filtres = document.getElementById("filtres")
    filtres.innerHTML += `<li id="${categorie.id} name="button" ><a href="#" > ${categorie.name}</a></li>`   
} 