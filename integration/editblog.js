document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    
  
    try {
      const response = await fetch(`https://brand-backend-zqib.onrender.com/blog/${id}`, {
        method: "GET",
      });
      if (!response.ok) {
        console.log("failed to fetch");
      }
      const blogsData = await response.json();
      const blogObj = blogsData.blog;
      console.log(blogObj);
  
      document.getElementById("title-inputs").value = blogObj.title;
      document.getElementById("content-inputs").value = blogObj.content;
      
     
      
    } catch (error) {
      console.log(error);
    }
  });
  
  document
    .getElementById("editBlog")
    .addEventListener("submit", async (event) => {
      event.preventDefault();
      const title = document.getElementById("title-inputs").value;

      const content = document.getElementById("content-inputs").value;
     
     
      const updatedBlog = {
        title: title,
        content: content,       
      };
      console.log(updatedBlog);
      
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");
        const response = await fetch(`https://brand-backend-zqib.onrender.com/blog/${id}`, {
          
          method: "PUT",
          headers:{"Content-Type":"application/json"},
          body: JSON.stringify(updatedBlog)
        });
        showSuccessMessage(response.message);
        if(!response.ok){
          console.log('failed to update');
        }
        //redirection
  
        window.location.href = 'allBlog.html'
        
        
      } catch (error) {
          console.log(error);
      }
    });
  
    // Function to show success message
  function showSuccessMessage(message) {
    Toastify({
        text: message || "You successfully added Blog!",
        duration: 3000,
        close: true,
        backgroundColor:"green",
        className: "toastify-success"
    }).showToast();
  }
  
  // Function to show error message
  function showErrorMessage(message) {
    Toastify({
        text: message || "Error: Something went wrong!",
        duration: 3000,
        close: true,
        backgroundColor:"red",
        className: "toastify-error"
    }).showToast();
  }
  
  