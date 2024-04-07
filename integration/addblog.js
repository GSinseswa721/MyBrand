const blogForm = document.getElementById("blog-form");
const blogsContainer = document.getElementById("blogs-container");
const titleInput = document.getElementById("title-input");
const contentInput = document.getElementById("content-input");
const imageInput = document.getElementById("image-input");

// Function to send a POST request to add a new blog
const addBlog = async (blogData) => {
  try {
    const formData = new FormData();
    formData.append('title', blogData.title);
    formData.append('content', blogData.content);
    formData.append('image', blogData.imageFile);

    const response = await fetch('https://brand-backend-zqib.onrender.com/blog', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to add blog');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error adding blog:', error);
    throw error;
  }
};

// Function to reset form fields
const resetForm = () => {
  titleInput.value = "";
  contentInput.value = "";
  imageInput.value = "";
};

// Function to render blogs
const renderBlogs = async () => {
  try {
    const response = await fetch('https://brand-backend-zqib.onrender.com/blog');
    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }
    const blogData = await response.json();

    // Clear existing blogs in the container
    blogsContainer.innerHTML = "";

    // Check if blogData is an array and not empty
    if (Array.isArray(blogData.addedBlog) && blogData.addedBlog.length > 0) {
      blogData.addedBlog.forEach((blog) => {
        blogsContainer.innerHTML += `
          <div class="blog">
            <p><strong>Title:</strong> ${blog.title}</p>
            <p><strong>Content:</strong> ${blog.content}</p>
            <img src="${blog.image}" alt="Blog Image">
          </div>
        `;
      });
    } else {
      console.log('No blogs found');
    }
  } catch (error) {
    console.error('Error fetching or rendering blogs:', error);
    showErrorMessage('Failed to fetch or render blogs');
  }
};

// Event listener for form submission
blogForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const blogObj = {
    title: titleInput.value,
    content: contentInput.value,
    imageFile: imageInput.files[0] || null
  };

  try {
    const responseData = await addBlog(blogObj);
    showSuccessMessage(responseData.message);

    // Reset form fields
    resetForm();

    // Fetch and render updated list of blogs
    await renderBlogs();
  } catch (error) {
    console.error('Failed to add blog:', error);
    showErrorMessage('Failed to add blog');
  }
});

// Initial render of blogs
renderBlogs();

// Function to show success message
function showSuccessMessage(message) {
  Toastify({
    text: message || "You successfully added a blog!",
    duration: 3000,
    close: true,
    backgroundColor: "green",
    className: "toastify-success"
  }).showToast();
}

// Function to show error message
function showErrorMessage(message) {
  Toastify({
    text: message || "Error: Something went wrong!",
    duration: 3000,
    close: true,
    backgroundColor: "red",
    className: "toastify-error"
  }).showToast();
}
