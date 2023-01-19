
// recuperation des Works

let listWork =[]

let listCat = 0;

let filtres = document.getElementById("filtres")

getWorks=() =>
   fetch ("http://localhost:5678/api/works")
    .then(res => res.json())
   
    .then( works => { 
        listWork = works
        gallery.innerHTML = "" 
        for (let work of works) {
            displayWork(work)                                                             
    }
    })
    .then (modalWorks=() => {
        modalMain.innerHTML =""
        for(let work of listWork) {
            displayWorkModal(work)
        }
        let removeBtn = document.querySelectorAll(".fa-trash-can")
            for(let i=0; i< removeBtn.length; i++){
                removeBtn[i].addEventListener('click', () =>{
                removeWork(listWork[i].id)
                })}
    })
    .catch(error => {
        alert(error)
    })

getWorks()


const gallery = document.getElementById("gallery") 

displayWork=(work) => { 
       
    gallery.innerHTML += `<figure>
                            <img crossorigin="anonymous" src="${work.imageUrl}" alt="${work.title}">
                            <figcaption>${work.title}</figcaption>
                        </figure>`                       
}

// Recuperation des Categories
filtree=(idCat) => {
    gallery.innerHTML = ""  
    for(let work of listWork){     
    console.log(work.categoryId) 
    if (idCat == 0){       
        displayWork(work)
    }else {
        if(idCat == work.categoryId)   
        displayWork(work)   
}}
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
            allFiltreBtn[i].addEventListener('click', () => {              
                filtree(idCat)
                allFiltreBtn[i].style.backgroundColor = "#1D6154"
                allFiltreBtn[i].style.color = "white"
            }
            )
        }
    })

    .catch(error => {
            alert(error)
    })
    
displayCategorie=(categorie) => {
    filtres.innerHTML += `<li><button data-id="${categorie.id}"> ${categorie.name}</button></li>`
    optionCat.innerHTML += `<option value='${categorie.id}'>${categorie.name}</option>`   
}


// affichage des fonctions admin

let logIn = document.querySelectorAll(".logIn")

let isLogIn = localStorage.getItem("token")? true : false;

if(isLogIn) {
    logInBtn.style.display = "none"
    logOutBtn.style.display = "inline"
    adminBar.style.display = "flex"
    for( let btnAdmin of logIn){
        btnAdmin.style.display = "inline"
    }
}else{
    logInBtn.style.display = "inline"
    logOutBtn.style.display = "none"
    adminBar.style.display = "none"
    for( let btnAdmin of logIn){
        btnAdmin.style.display = "none"
    }
    
}

logOutBtn.addEventListener('click', () =>{
    localStorage.removeItem("token")
})

// Modal

const closeBtn = document.querySelectorAll(".close")
for (let i=0; i< closeBtn.length; i++){
closeBtn[i].addEventListener('click', function() {
    myModal.style.display = "none"
  })
}

myBtnProjet.addEventListener('click', () => {    
    myModal.style.display = "block";
    listWorks.style.display ='block'
    modalForm.style.display ='none'
    modalWorks(listWork)
})

modalWorks=(listWork) => {
    modalMain.innerHTML =""
    for(let work of listWork) {
        displayWorkModal(work)
    }
    let removeBtn = document.querySelectorAll(".fa-trash-can")
        for(let i=0; i< removeBtn.length; i++){
            removeBtn[i].addEventListener('click', () =>{
            removeWork(listWork[i].id)
            })}
}

displayWorkModal=(work) => {
    modalMain.innerHTML += `<figure>
                                 <img crossorigin="anonymous" src="${work.imageUrl}" alt="${work.title}">
                                 <figcaption>éditer</figcaption>
                                 <button><i class="fa-solid fa-trash-can"></i></button>
                            </figure>`
}

addWorks.addEventListener('click', function() {
    displayModalForm()
})

// Suppresion d'un work 

displayModalForm=() => {
    listWorks.style.display ='none'
    modalForm.style.display ='flex'
}

back.addEventListener('click', () =>{
    listWorks.style.display ='block'
    modalForm.style.display ='none'
})

removeWork =(id) => {
   if(confirm('Etes-vous sûr de vouloir supprimer ce work') == true){
    fetch('http://localhost:5678/api/works/' + id, {
        method: 'DELETE',
        headers: {
            'accept' : '*/*',
            'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3NDEyNzA4MCwiZXhwIjoxNjc0MjEzNDgwfQ.Q-RyxkQj1yV7228pAZQN-v4JPsx6awHqDKTKqlLVS6o',
        }
    })
    .then (getWorks()
    )
    .then (res2=() => {console.log(listWork)})
}}


// Fonction ajout d'un nouveau Work 
      
valid.addEventListener('click', (e) =>{
    e.preventDefault()

    let data = new FormData()
    data.append('image', document.getElementById('imageFile').files[0])
    data.append('titre', document.querySelector('#titreWork').value)
    let selectCat = document.querySelector('#optionCat')
    data.append('categorie', selectCat.option[selectedIndex].value)
     

    fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
                    'accept' : 'application/json',
                    'Authorization' : 'Bearer' + localStorage.getItem("token"),
                 },
        body: data,
        })
    .then ( alert('ajout ok'))       
})