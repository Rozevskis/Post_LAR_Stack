window.onload = function () {
  // Elements
  const registerBtn = document.getElementById("register-link");
  const overlay = document.querySelector(".background");
  const registerForm = document.getElementById("register");
  const registerFormElement = document.getElementById("register-form");
  const authButtons = document.querySelector(".auth-buttons");
  const logoutLink = document.getElementById("logout-link");
  const createLink = document.getElementById("create-link");
  const welcomeDiv = document.getElementById("welcome");
  const postDiv = document.getElementById("posts");

  // Check authentication state on page load
  const token = localStorage.getItem("authToken");
  if (token) {
    authButtons.style.display = "none"; // Hide login/register buttons
    logoutLink.style.display = "block"; // Show logout button
    createLink.style.display = "block"; // Show create button
    welcomeDiv.style.display = "none"; // Hide welcome message for registered users
    postDiv.style.display = "block";
  } else {
    authButtons.style.display = "flex"; // Show login/register buttons
    logoutLink.style.display = "none"; // Hide logout button
    createLink.style.display = "none"; // hide create button
    postDiv.style.display = "none";
  }

  // Register button click
  registerBtn.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default anchor behavior
    overlay.style.display = "block"; // Show the background overlay
    registerForm.style.display = "block"; // Show the registration form
  });

  // Optional: Add a click event to the overlay to close the registration form
  overlay.addEventListener("click", function () {
    overlay.style.display = "none"; // Hide the background overlay
    registerForm.style.display = "none"; // Hide the registration form
  });

  // Register form submission
  registerFormElement.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the default form submission

    let formData = new FormData(event.target); // Get form data
    try {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          password: formData.get("password"),
          password_confirmation: formData.get("password_confirmation"),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        // Store the token in localStorage
        localStorage.setItem("authToken", data.token);

        // Handle successful registration
        await fetchAllPosts(data.token);

        // Hide the form and overlay after successful registration
        overlay.style.display = "none";
        registerForm.style.display = "none";

        // Update UI
        authButtons.style.display = "none"; // Hide the login/register buttons
        logoutLink.style.display = "block"; // Show the logout button
        createLink.style.display = "block"; // Show create button
        welcomeDiv.style.display = "none";
        postDiv.style.display = "block";
      } else {
        // Handle errors
        document.getElementById(
          "register-response"
        ).innerHTML = `<p>Error: ${data.message}</p>`;
      }
    } catch (error) {
      console.log(error);
      document.getElementById(
        "register-response"
      ).innerHTML = `<p>An error occurred while registering.</p>`;
    }
  });

  // Logout functionality
  logoutLink.addEventListener("click", function () {
    localStorage.removeItem("authToken"); // Remove the token from localStorage
    authButtons.style.display = "flex"; // Show login/register buttons
    logoutLink.style.display = "none"; // Hide the logout button
    createLink.style.display = "none"; // Show create button
    welcomeDiv.style.display = "block";
    postDiv.style.display = "none";
  });

  // Login overlay
  // Login button click event
  const loginBtn = document.getElementById("login-link");
  loginBtn.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default anchor behavior
    overlay.style.display = "block"; // Show the background overlay
    document.getElementById("login").style.display = "block"; // Show the login form
  });

  // Optional: Close the login form when clicking on the overlay
  overlay.addEventListener("click", function () {
    overlay.style.display = "none"; // Hide the background overlay
    document.getElementById("login").style.display = "none"; // Hide the login form
  });
  // Login logic here (unchanged)
  const loginForm = document.getElementById("login");
  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    let formData = new FormData(event.target);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        overlay.style.display = "none";
        loginForm.style.display = "none";
        authButtons.style.display = "none";
        logoutLink.style.display = "block";
        createLink.style.display = "block";
        welcomeDiv.style.display = "none";
        postDiv.style.display = "block";
        await fetchAllPosts(data.token);
      }
    } catch (error) {
      console.log(error);
    }
  });

  // Create post overlay
  const createBtn = document.getElementById("create-link");
  createBtn.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default anchor behavior
    overlay.style.display = "block"; // Show the background overlay
    document.getElementById("create-post").style.display = "block"; // Show the create form
  });

  // Optional: Close the create form when clicking on the overlay
  overlay.addEventListener("click", function () {
    overlay.style.display = "none"; // Hide the background overlay
    document.getElementById("create-post").style.display = "none"; // Hide the create form
  });

  const postForm = document.getElementById("create-post-form");
  postForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    let formData = new FormData(event.target);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.get("title"),
          body: formData.get("body"),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        document.getElementById(
          "post-data"
        ).innerHTML = `<p>Post Created Successfully!</p>
            <p><strong>Title:</strong> ${data.title}, <strong>Body:</strong> ${data.body}</p>`;
        await fetchAllPosts(token);

        document.getElementById("title").value = "";
        document.getElementById("body").value = "";
      }
    } catch (error) {
      console.log(error);
    }
  });

  async function fetchAllPosts(token) {
    console.log("Fetch all posts.");
    try {
      const response = await fetch("http://127.0.0.1:8000/api/posts", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/html",
        },
      });

      const posts = await response.json();

      if (response.ok) {
        const postsContainer = document.getElementById("user-posts");
        postsContainer.innerHTML = "";
        posts.forEach((post) => {
          postsContainer.innerHTML += `
                        <div class="post">
                            <p>Title: ${post.title}</p>
                            <p>Body: ${post.body}</p>
                        </div>
                    `;
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
};
