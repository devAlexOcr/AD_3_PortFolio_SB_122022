
// recuperation des Works

let listWork= []

getWorks=() =>
   fetch ('http://localhost:5678/api/works')
        .then(res => res.json()) 
        .then( works => { 
            listWork= works
            gallery.innerHTML = '' 
            for (let work of works) {
                displayWork(work)                                                              
            }
        })
        .then (modalWorks=() => {
            modalMain.innerHTML = ''
            for(let work of listWork) {
                displayWorkModal(work)
            }
            let removeBtn = document.querySelectorAll('.fa-trash-can')
                for(let i=0; i< removeBtn.length; i++){
                    removeBtn[i].addEventListener('click', () =>{
                    removeWork(listWork[i].id)
                    })
                }
        })
        .catch(error => {
            alert(error)
        })

getWorks()


const gallery = document.getElementById('gallery') 

displayWork=(work) => { 
        let newFigure= document.createElement('figure')

        let newImg= document.createElement('img')
            let a= document.createAttribute("src")
                a.value= work.imageUrl
                newImg.setAttributeNode(a)
            let b= document.createAttribute("crossorigin")
                b.value= 'anonymous'
                newImg.setAttributeNode(b)
            let c= document.createAttribute("alt")
                c.value= work.title
                newImg.setAttributeNode(c)

        let newFigCaption= document.createElement('figcaption')
        let newContent= document.createTextNode(work.title)

    gallery.appendChild(newFigure)
        newFigure.appendChild(newImg)
        newFigure.appendChild(newFigCaption)
            newFigCaption.appendChild(newContent)                 
}

// Récuperation des catégories

const filtres = document.getElementById('filtres')

fetch ('http://localhost:5678/api/categories')
    .then(res => res.json())

    .then(categories => {        
        for (let categorie of categories) {
            displayCategorie(categorie) 
            listCat.add(categorie)           
        }
    })  
    .then(ok => {
        let allFiltreBtn = filtres.getElementsByTagName('button')
        for (let i=0; i< allFiltreBtn.length; i++) {
            let idCat = allFiltreBtn[i].getAttribute('data-id')
            allFiltreBtn[i].addEventListener('click', () => {          
                filtree(idCat)
                for( let BtnFiltre of allFiltreBtn){
                    BtnFiltre.style.backgroundColor = 'white'
                    BtnFiltre.style.color = '#1D6154'
                }
                allFiltreBtn[i].style.backgroundColor = '#1D6154'
                allFiltreBtn[i].style.color = 'white'
            })
        }
    })
    .catch(error => {
            alert(error)
    })

// Création des bouttons pour filtrer par catégories

displayCategorie=(categorie) => {

    let newLi= document.createElement('li')
    let newButton= document.createElement('button')
        let a= document.createAttribute('data-id')
            a.value= categorie.id
            newButton.setAttributeNode(a)
    let newContent= document.createTextNode(categorie.name)
    let newOption= document.createElement('option')
        let b=document.createAttribute('value')
            b.value= categorie.id
            newOption.setAttributeNode(b)
    let newContentOption= document.createTextNode(categorie.name)

    filtres.appendChild(newLi)
        newLi.appendChild(newButton)
            newButton.appendChild(newContent)
    
    optionCat.appendChild(newOption)
        newOption.appendChild(newContentOption)    
}

// affichage des travaux par catégories

filtree=(idCat) => {
    gallery.innerHTML = ''    
    for(let work of listWork){     
        if (idCat == 0){       
            displayWork(work)
        }else {
            if(idCat == work.categoryId)   
            displayWork(work)   
        }}
}

// affichage des fonctions admin

let logIn = document.querySelectorAll('.logIn')

let isLogIn = localStorage.getItem('token')? true : false;

if(isLogIn) {
    logInBtn.style.display = 'none'
    logOutBtn.style.display = 'inline'
    adminBar.style.display = 'flex'
    for( let btnAdmin of logIn){
        btnAdmin.style.display = 'inline'
    }
}else{
    logInBtn.style.display = 'inline'
    logOutBtn.style.display = 'none'
    adminBar.style.display = 'none'
    for( let btnAdmin of logIn){
        btnAdmin.style.display = 'none'
    }    
}

logOutBtn.addEventListener('click', () =>{
    localStorage.removeItem('token')
})

// Modal

const closeBtn = document.querySelectorAll('.close')

for (let i=0; i< closeBtn.length; i++){
    closeBtn[i].addEventListener('click', function() {
        myModal.style.display = 'none'
    })
}

// affichage de la modal

myBtnProjet.addEventListener('click', () => {    
    myModal.style.display = 'block'
    listWorks.style.display ='block'
    modalForm.style.display ='none'
    modalWorks(listWork)
})

// affichage des travaux dans la modal

modalWorks=(listWork) => {
    modalMain.innerHTML = ''
    for(let work of listWork) {
        displayWorkModal(work)
    }
   let removeBtn = document.querySelectorAll('.fa-trash-can')
      for(let i=0; i< removeBtn.length; i++){
           removeBtn[i].addEventListener('click', () =>{
           removeWork(listWork[i].id)
           })}
}

displayWorkModal=(work) => {
    let newFigure= document.createElement('figure')

    let newImg= document.createElement('img')
        let a= document.createAttribute('crossorigin')
            a.value= ('anonymous')
            newImg.setAttributeNode(a)
        let b= document.createAttribute('src')
            b.value= (work.imageUrl)
            newImg.setAttributeNode(b)
        let c= document.createAttribute('alt')
            c.value= (work.title)
            newImg.setAttributeNode(c)

    let newButton= document.createElement('button')

    let newIcone= document.createElement('i')
        let d= document.createAttribute('class')
            d.value= ('fa-solid fa-trash-can')
            newIcone.setAttributeNode(d)

    let newFigCaption= document.createElement('figcaption')
    let newContent= document.createTextNode('éditer')

    modalMain.appendChild(newFigure)
        newFigure.appendChild(newImg)
        newFigure.appendChild(newButton)
            newButton.appendChild(newIcone)
        newFigure.appendChild(newFigCaption)
}

let controls = document.querySelectorAll('.form-control')

// affichage de la modal pour ajout d'un nouveau work

addWorks.addEventListener('click', function() {
    displayModalForm()
    previewImage.style.display ='none'

// controle du formulaire d'ajout de work pour activation du bouton submit

    for (let i=0; i<controls.length; i++) {
        controls[i].onchange = () => {
                validDisabled()
            }
        }
})

validDisabled=() => {
    if (document.getElementById('imageFile').files[0] != ''
        && document.querySelector('#titreWork').value != '' 
        && selectCat.options[selectCat.selectedIndex].value != '' ) {
            valid.disabled= false
            valid.style.backgroundColor= '#1D6154' 
    }else{
        valid.disabled= true 
        valid.style.backgroundColor= '#aaa'
    }
}

// Suppression d'un work 

displayModalForm=() => {
    listWorks.style.display ='none'
    modalForm.style.display ='flex'
}

back.addEventListener('click', () =>{
    addPic.reset()
    valid.disabled= true
    valid.style.backgroundColor= '#aaa'
    listWorks.style.display ='block'
    modalForm.style.display ='none'
    previewImage.style.display ='none'
    imageEmpty.style.display ='flex'
})

removeWork =(id) => {
   if(confirm('Etes-vous sûr de vouloir supprimer ce work') == true){
        fetch('http://localhost:5678/api/works/' + id, {
            method: 'DELETE',
            headers: {
                        'accept' : '*/*',
                        'Authorization' : 'Bearer ' + (localStorage.getItem("token")),
                     }
        })
        .then (getWorks())
    }
}


// Fonction ajout d'un nouveau Work 

addFile = document.querySelector('input[type="file"]')

addImage.addEventListener('click',(e) => {
    e.preventDefault()
    addFile.click()   
})

// affichage en preview de l'image du work à ajouter

addFile.addEventListener('change', () => {
    previewImage.src = window.URL.createObjectURL(imageFile.files[0])
    imageEmpty.style.display ='none'
    previewImage.style.display ='flex'
})

// validation du formulaire pour ajouter un work

let selectCat = document.querySelector('#optionCat')

valid.addEventListener('click', (e) =>{
    e.preventDefault()

    let data = new FormData()
        data.append('image', document.getElementById('imageFile').files[0])
        data.append('title', document.querySelector('#titreWork').value)          
        data.append('category', selectCat.options[selectCat.selectedIndex].value)

            fetch('http://localhost:5678/api/works', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Authorization': 'Bearer ' + (localStorage.getItem("token")),                   
                },
                body: data
            })
            .then (res=> (res.json()))
            .then (() => {
                getWorks()
                back.click()
            })    
            .catch (error => alert(error))
})