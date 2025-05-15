import React from "react";

function CreatePost() {
  return (
    <div>
      <h1>Create Post</h1>
      <form>
        <div>
          <label>Title:</label>
          <input type="text" name="title" />
        </div>
        <div>
          <label>Content:</label>
          <textarea name="content"></textarea>
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}
export default CreatePost;