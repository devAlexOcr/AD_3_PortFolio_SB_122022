let form = document.querySelector("form")



form.addEventListener('submit', (e) => {
    let user = {
        email: document.getElementById('email').value,
        password: document.getElementById('pass').value
    }
    console.log(user)
    e.preventDefault()
    fetch ('http://localhost:5678/api/users/login', {
        method: 'POST',
       
        headers: {
                    'Content-Type': 'application/json'
                },
         body: JSON.stringify(user) 
            })
            
    .then (res => {
        if(res.status === 200){
             return res.json()
        }else{
            if(res.status === 401){
                alert('error password')
            }else{
                if(res.status === 404){
                    alert('user not found')
                }
            }
        }
    })
    .then (status => {
       
        console.log(status)
        if(user = true ) {
           localStorage.setItem(`${status.userId}`,`${status.token}`)
        }else{
        
        }
    })   
 })