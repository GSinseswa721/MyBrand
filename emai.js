 document.addEventListener("DOMContentLoaded", async () => {
   const form = document.getElementById('myForm') 
   const fromInput = document.getElementById('firstName')
   const subjectInput = document.getElementById('lastName')
   const messageInput  = document.getElementById('message')

   const resetForm = () => {
    fromInput.value = "";
    subjectInput.value = "";
    messageInput.value = "";
};



   form.addEventListener("submit", async (e) => {
    e.preventDefault();


    const from = fromInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    if (!from || !subject || !message) {
        alert("Please fill in all fields");
        return;
    }


    const emailData = {
        from, 
        subject, 
        message 
    };


    try {


        const response = await fetch('https://brand-backend-zqib.onrender.com/user/mail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailData)
        });

        if (!response.ok) {
            throw new Error(`Failed to send email: ${response.statusText}`);
        }

        const responseData = await response.json();
        console.log(responseData);
        alert(responseData.message)
        resetForm();

    } catch (error) {
        console.error(error);


    }}  ) 
    
});
 





























