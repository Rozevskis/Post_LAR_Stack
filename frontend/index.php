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
            <a href=" ">Login</a>
            <a href=" ">Register</a>
        </div>
    </nav>
    
    <div class="container">
        <h2>Login</h2>
        <!-- action="/api/login"  -->
        <form
         method="post" id="login-form">
            <label for="email">Email</label>
            <input type="text" name="email" id="email">
            <label for="password">password</label>
            <input type="text" name="password" id="password">

            <input type="submit" value="POST">
            <div id="response"></div>
        </form>
    </div>

    <div class="container">
        <h2>Get user</h2>
        <form action="/api/user" method="get" id="get-user-form">
            <label for="token">Token</label>
            <input type="text" name="token" id="token">

            <input type="submit" value="Get">
            <div id="user-data"></div>
        </form>
    </div>

    <div class="container">
        <h2>Create post</h2>
        <form action="/api/posts" method="post" id="create-post-form">
            <label for="token">Token</label>
            <input type="text" name="token" id="token">

            <label for="title">Title</label>
            <input type="text" name="title" id="title">

            <label for="body">Body</label>
            <textarea name="body" id="body"></textarea>

            <input type="submit" value="Create">
        </form>
        <div id="post-data"></div>
    </div>
    <div class="container">
        <h2>Posts</h2>
        <div id="user-posts"></div>
    </div>
    <script src="js/app.js"></script>
</body>
</html>