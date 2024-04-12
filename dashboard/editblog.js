document.addEventListener("DOMContentLoaded", () => {

  // Function to extract URL parameter
  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  const blogId = getParameterByName('id');

  const editBlogForm = document.getElementById("editBlog");
  const titleInput = document.getElementById("title-inputs");
  const contentInput = document.getElementById("content-inputs");
  const imageInput = document.getElementById("image-inputs");
  const imagePreview = document.getElementById("image-preview");

  // Function to fetch blog details and populate form for editing
  const populateEditForm = async () => {
    try {
      const response = await fetch(`https://brand-backend-zqib.onrender.com/blog/${blogId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch blog details: ${response.status} ${response.statusText}`);
      }

      const blogData = await response.json();
      const { title, content, image } = blogData.data;

      // Populate form fields with fetched blog data
      titleInput.value = title;
      contentInput.value = content;

      // Display image preview if image exists
      if (image) {
        imagePreview.src = image;
        imagePreview.classList.remove("hidden");
      }
    } catch (error) {
      console.error('Error fetching blog details:', error.message);
      // Optionally display a user-friendly error message or handle the error in another way
    }
  };

  // Populate form on page load
  populateEditForm();

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
      image: imageInput.files[0], // Use file object instead of value for image
    };

    try {
      const formData = new FormData();
      formData.append('title', updatedBlogData.title);
      formData.append('content', updatedBlogData.content);
      formData.append('image', updatedBlogData.image);

      const response = await fetch(`https://brand-backend-zqib.onrender.com/blog/${blogId}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update blog');
      }

      const responseData = await response.json();
      console.log('Blog updated successfully:', responseData);

      // Close the edit form after successful update
      editBlogForm.classList.add("hidden");

      // Optionally, refresh or render the updated blog list
      // renderBlogs();
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  });

});
