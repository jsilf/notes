import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IPost } from "../models/IPost";
import { url } from "./Posts";

export const PostsList = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  let userid = sessionStorage.getItem("userID");

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const response = await fetch(url + `/posts/user/${userid}`);
      if (!response.ok) {
        throw new Error(`HTTP error: status is ${response.status}`);
      }
      let posts = await response.json();
      setPosts(posts);
    } catch (error) {
      console.error(error);
    }
  };

  let printHTML = posts.map((post: IPost, i: number) => {
    return (
      <ul className="editor-list-wrap" key={i}>
        <li>
          <Link to={`/posts/post/${post.postID}`}>{post.title}</Link>
        </li>
      </ul>
    );
  });

  return (
    <>
      <section className="editor-list-container">
        <h3>Dokument:</h3>
        {printHTML}
      </section>
    </>
  );
};
