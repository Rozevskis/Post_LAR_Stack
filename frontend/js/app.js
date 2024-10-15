window.onload = function () {
  //Register
  const registerBtn = document.getElementById("register-link");
  const overlay = document.querySelector(".background");
  const registerForm = document.getElementById("register");
  const registerFormElement = document.getElementById("register-form");

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
          name: formData.get("name"), // Get the name value
          email: formData.get("email"),
          password: formData.get("password"),
          password_confirmation: formData.get("password_confirmation"),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        // Handle successful registration
        document.getElementById("register-response").innerHTML = `
              <p>Registration successful! Welcome, ${data.user.name}!</p>
              <p>Email: ${data.user.email}</p>
              <p>Your token: ${data.token}</p>
          `;
        // Optionally hide the form and overlay after successful registration
        overlay.style.display = "none";
        registerForm.style.display = "none";
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

  //Login
  const loginForm = document.getElementById("login-form");
  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    let formData = new FormData(event.target);
    let token = formData.get("token");
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
        document.getElementById(
          "response"
        ).innerHTML = `<p>User Email: ${data.user.email}<br>
        User Name: ${data.user.name}<br>
        User Token: ${data.token}</p>`;
        await fetchAllPosts(token);
      }
    } catch (error) {
      console.log(error);
    }
  });

  //Get user
  const getForm = document.getElementById("get-user-form");
  getForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    let formData = new FormData(event.target);
    let token = formData.get("token");
    try {
      const response = await fetch("http://127.0.0.1:8000/api/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/html",
        },
      });

      const data = await response.json();

      if (response.ok) {
        document.getElementById(
          "user-data"
        ).innerHTML = `<p>User Email: ${data.email}<br>
                                                                    User Name: ${data.name}</p>`;
        await fetchAllPosts(token);
      }
    } catch (error) {
      console.log(error);
    }
  });

  const postForm = document.getElementById("create-post-form");
  postForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    let formData = new FormData(event.target);
    let token = formData.get("token");

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
    } catch (error) {}
  }

  const token = document.getElementById("token").value;
  if (token) {
    fetchAllPosts(token);
  }
};
