
let listWork =[]

let listCat = 0;

let filtres = document.getElementById("filtres")

    fetch ("http://localhost:5678/api/works")
    .then(res => res.json())
   
    .then( works => { 
        
        for (let work of works) {
            displayWork(work)
            listWork.push(work)                                                  
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
    
 function displayCategorie(categorie) {
    filtres.innerHTML += `<li><button data-id="${categorie.id}"> ${categorie.name}</button></li>`   
}

function filtree(idCat) {
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

const close = document.querySelector(".close")


myBtnProjet.addEventListener('click', function() {
    modalMain.innerHTML = ""
    myModal.style.display = "block";
    listWorks.style.display ='block'
    modalForm.style.display ='none'
    modalWorks(listWork)
})
function modalWorks(listWork){
    for(let work of listWork) {
        displayWorkModal(work)
    }

}
function displayWorkModal(work) {
    modalMain.innerHTML += `<figure>
                                 <img crossorigin="anonymous" src="${work.imageUrl}" alt="${work.title}">
                                 <figcaption>éditer</figcaption>
                                 <button><i class="fa-solid fa-trash-can"></i></button>
                            </figure>`
}



close.addEventListener('click', function() {
    myModal.style.display = "none"
  })

addWorks.addEventListener('click', function() {
    displayModalForm()
})

function displayModalForm(){
    listWorks.style.display ='none'
    modalForm.style.display ='flex'
}