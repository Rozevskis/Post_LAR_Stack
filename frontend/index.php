<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Front</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <nav>
        <h1>Laravel API frontend</h1>
        <div class="auth-buttons">
            <a href=" " id="login-link">Login</a>
            <a href=" " id="register-link">Register</a>
        </div>
        <a href=" " id="create-link">Create post</a>
        <a href=" " id="logout-link">Logout</a>
    </nav>
    
    <div class="background"></div>
    <div class="container" id="register">
    <h2>Register</h2>
    <form method="post" id="register-form">
        <label for="register-name">Name</label>
        <input type="text" name="name" id="register-name" required>

        <label for="register-email">Email</label>
        <input type="text" name="email" id="register-email" required>

        <label for="register-password">Password</label>
        <input type="password" name="password" id="register-password" required>

        <label for="register-confirm-password">Confirm Password</label>
        <input type="password" name="password_confirmation" id="register-confirm-password" required>

        <input type="submit" value="Register">
        <div id="register-response"></div>
    </form>
</div>
    


    <div class="container" id="login">
        <h2>Login</h2>
        <form method="post" id="login-form">
            <label for="login-email">Email</label>
            <input type="text" name="email" id="login-email" required>
            <label for="login-password">Password</label>
            <input type="password" name="password" id="login-password" required>

            <input type="submit" value="Login">
            <div id="response"></div>
        </form>
    </div>

    <div class="container" id="create-post">
        <h2>Create post</h2>
        <form action="/api/posts" method="post" id="create-post-form">
            <label for="title">Title</label>
            <input type="text" name="title" id="title">

            <label for="body">Body</label>
            <textarea name="body" id="body"></textarea>

            <input type="submit" value="Create">
        </form>
        <div id="post-data"></div>
    </div>
    <div class="container" id="posts">
        <h2>Posts</h2>
        <div id="user-posts"></div>
    </div>
    <div class="container" id="welcome">
        <h1  class="ugly1">Welcome to My Website!</h1>
        <img src="https://viarcanvas.com/storage/gallery-items/November2020/iUBCHngpcMRaeJtVO0Gn.jpg" alt="Mcqueen">
        <h3  class="ugly2">Login or register to view posts</h3>
    </div>
    <script src="js/app.js"></script>
</body>
</html>