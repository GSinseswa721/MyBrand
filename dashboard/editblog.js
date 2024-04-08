document.addEventListener("DOMContentLoaded", () => {

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
 const  blogId = getParameterByName('id');


    const editBlogForm = document.getElementById("editBlog");
    const titleInput = document.getElementById("title-inputs");
    const contentInput = document.getElementById("content-inputs");
    const imageInput = document.getElementById("image-inputs");
  
    // Function to fetch blog details and populate form for editing
    const populateEditForm = async () => {
      try {
        const response = await fetch(`https://brand-backend-zqib.onrender.com/blog/${blogId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog details');

        }
        console.log(response)
        const blogData = await response.json();
        const { title, content, image } = blogData.data;
  
        // Populate form fields with fetched blog data
        titleInput.value = title;
        contentInput.value = content;
  
        // You may handle image display or preview here if needed
      } catch (error) {
        console.error('Error fetching blog details:', error);
      }
    };
    
    document.addEventListener('DOMContentLoaded', populateEditForm()) ;
  
    // Event listener for close button
    const closeButton = document.getElementById("close-blog-form-btn");
    closeButton.addEventListener("click", () => {
      editBlogForm.classList.add("hidden");
    });
  
    // Event listener for form submission
    editBlogForm.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const updatedBlogData = {
        title: titleInput.value,
        content: contentInput.value,
        // Handle image file if needed (e.g., imageInput.files[0])
      };
  
  
      try {
        const response = await fetch(`https://brand-backend-zqib.onrender.com/blog/${blogId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedBlogData)
        });
        
        if (!response.ok) {
          throw new Error('Failed to update blog');
        }
  
        const responseData = await response.json();
        console.log('Blog updated successfully:', responseData);
  
        // Close the edit form after successful update
        editBlogForm.classList.add("hidden");
  
        // Fetch and render updated list of blogs
        renderBlogs(); // Assuming renderBlogs() is a function that fetches and renders blogs
      } catch (error) {
        console.error('Error updating blog:', error);
      }
    });
    const navigateToEdit = (id) => {
        window.location.href = `blogs.html?`;
      };

  });
      // Example usage: Populate edit form when a blog card is clicked
  