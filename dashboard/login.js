const form = document.getElementById("login-form");

// add event listen
form.addEventListener("submit", async(e) => {
  e.preventDefault();
  //grad values
 // const emailValue = document.getElementById("email").value
 // const passwordValue = document.getElementById("password").value
  //const data = {email: emailValue, password: passwordValue}
const formData = new FormData(form)
const userData = {
  email:formData.get('email'),
  password:formData.get('password')
}
try {
  const res = await fetch('https://brand-backend-zqib.onrender.com/user/signin', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  })
  if ( !res.ok){
    throw new Error('unenabled to login')
}
const resData = await res.json()
console.log(resData)

const token = resData.token
localStorage.setItem('token',token)
window.location.href='/integration/alluser.html'

} catch (error) {
  console.log({error:error.message})
}
  // use fetch method to interact with your login api endpoint
})