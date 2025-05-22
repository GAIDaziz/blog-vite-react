import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";


function Home() {
  const [ postLists, setPostList ] = useState([])
  const postCollectionRef = collection(db, "posts");

  useEffect( () => {
    const getPosts = async () => {
      const data = await getDocs(postCollectionRef);
     setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id}) ));
    };
   getPosts();
  });


  return ( 
    <div className="Homme page">
      {
        postLists.map((post) => {
          return <div className="post"> 
          <div className="postHeader">
              <div className="title">          
                <h1> {post.title} </h1>
              </div>
          </div>
          <div className="postTexrContainer">
            {post.postText}
          </div>
          <h3>@{post.author.name}</h3>
      </div>  
        })
      }

       
    </div>
  );
}
export default Home;