import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { IPost } from "../models/IPost";

export let url = "http://localhost:3000";

export const Posts = () => {
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
      <div className="editor-wrap" key={i}>
        <Link to={`/posts/post/${post.postID}`}>{post.title}</Link>

        <Editor
          apiKey="8ptuvhro7r1cnldvl0ib0hklp6ruhyx5mgg6a82z8f49d6p8"
          disabled={true}
          initialValue={`${post.content}`}
          init={{
            height: 200,
            width: 300,
            menubar: false,
            plugins: ["resize"],
            toolbar: "",
            resize: false,
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </div>
    );
  });

  return (
    <>
      <section className="editor-container">{printHTML}</section>
    </>
  );
};
