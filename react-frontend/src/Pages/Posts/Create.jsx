export default function Create() {
    return(
        <>
        <h1 className="title">Create a new post</h1>
        <form className="w-1/2 mx-auto space-y-6" >
            <div>
                <input type="text" name="title" placeholder="Post title" />
            </div>
            <div>
                <textarea rows="6" name="body" placeholder="Post Content"></textarea>
            </div>
            <button type="submit" className="primary-btn">Create</button>
        </form>
        </>
    );
}