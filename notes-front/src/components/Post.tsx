import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { IPost } from "../models/IPost";
import { url } from "./Posts";

export const Post = () => {
  const [post, setPost] = useState<IPost[]>([]);
  const { id } = useParams();

  //   let userid = sessionStorage.getItem("userID");

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    try {
      const response = await fetch(url + `/posts/user/post/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error: status is ${response.status}`);
      }
      let post = await response.json();

      // console.log("Post: ", post);

      // const blob = new Blob(post, { type: "text/html" });
      // console.log("Blob: ", blob);

      // const reader = new FileReader();
      // let text = reader.readAsText(blob);
      // console.log("Reader: ", text);

      // setPost([...post, blob]);

      setPost(post);
    } catch (error) {
      console.error(error);
    }
  };

  let printHTML = post.map((post: IPost, i: number) => {
    return (
      <div className="editor-readonly-wrap" key={i}>
        <p>{post.title}</p>
        <Editor
          apiKey="8ptuvhro7r1cnldvl0ib0hklp6ruhyx5mgg6a82z8f49d6p8"
          disabled={true}
          initialValue={`${post.content}`}
          init={{
            // height: 700,
            // width: 600,
            menubar: false,
            plugins: ["resize"],
            toolbar: "",
            resize: false,
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
        <Link to={`/posts/edit/${post.postID}`}>
          <button type="button">Redigera dokument</button>
        </Link>
      </div>
    );
  });

  return (
    <>
      <div>{printHTML}</div>
    </>
  );
};
