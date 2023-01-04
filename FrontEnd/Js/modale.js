fetch ("http://localhost:5678/api/works")
.then (res => res.json())
.then (works => {
    console.log(works)
    for(let work of works) {
        displayImage(work)     
    }
})
.catch(error => {
    alert(error)
})

const gallery = document.getElementById("gallery")

function displayImage(work) {
    gallery.innerhtml += `<figure>
                            <img src="${work.imageUrl}" alt="${work.title}">
                            <figcaption>éditer</figcaption>
                         </figure>`
}
