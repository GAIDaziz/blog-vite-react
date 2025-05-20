import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase-config";

function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  
  const navigate = useNavigate();
  const postCollectionRef = collection (db, "posts")

  const createPost = async () => {
    // logique existante pour créer un post
    // ...
    await addDoc(postCollectionRef, {title, postText, authothor: {name: auth.currentUser.displayName ,id: auth.currentUser.uid}});
    
    
    // Redirection après création
    navigate("/");

    useEffect(()=> { 
      if (!isAuth) {
        navigate("/login");
      }
    })
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">Create a New Post</h3>
            </div>
            <div className="card-body">
              <form onSubmit={createPost}>
                <div className="create-title">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="title" 
                    placeholder="Enter post title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                
                <div className="create-content">
                  <label htmlFor="postContent" className="form-label">Content</label>
                  <textarea 
                    className="form-control" 
                    id="postContent" 
                    rows="6" 
                    placeholder="What's on your mind?"
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    required
                  ></textarea>
                </div>
                

               
                
                {/* Option pour télécharger une image de couverture */}
                <div className="mb-3">
                  <label htmlFor="coverImage" className="form-label">Cover Image (optional)</label>
                  <input 
                    type="file" 
                    className="form-control" 
                    id="coverImage" 
                    accept="image/*"
                  />
                </div>
                
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary me-md-2"
                    onClick={() => navigate("/")}
                  >
                    Cancel
                  </button>
                  <button  type="button"
                   className="btn btn-primary" 
                   onClick={createPost}
                   >
                    Publish Post</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;