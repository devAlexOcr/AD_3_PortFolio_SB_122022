let listWork = []
console.log(listWork)

let listCategorie =[]
console.log(listCategorie)


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
            listWork.push(work.categoryId)              
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
            listCategorie.push(categorie.id)           
        }
    })
    .catch(error => {
        alert(error)
    })


function displayCategorie(categorie) {
    const filtres = document.getElementById("filtres")
    filtres.innerHTML += `<li name="button" ><a href="#" id="${categorie.id}" > ${categorie.name}</a></li>`   
} 

let elt = document.getElementById('0')

elt.addEventListener('click', function display(i) {
    i.preventDefault()
    i.stopPropagation()
   for (let Id of listWork ) {
    if ( Id === 1) {
        displayWork()
    } else {
        ''
    }
   }
})