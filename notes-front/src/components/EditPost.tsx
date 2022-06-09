import { ChangeEvent, useEffect, useState } from "react";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Link, useParams } from "react-router-dom";
import { IPost } from "../models/IPost";
import { url } from "./Posts";

export const EditPost = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const editorRef = useRef<any>(null);
  const { id } = useParams();
  const [msg, setMsg] = useState("");

  const [title, setTitle] = useState("");

  let storageID = sessionStorage.getItem("userID");

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
      console.log(post);

      setPosts(post);
    } catch (error) {
      console.error(error);
    }
  };

  const saveEdit = async () => {
    try {
      if (editorRef.current) {
        const content = editorRef.current.getContent();

        const response = await fetch(url + `/posts/update/${id}`, {
          method: "PUT",
          body: JSON.stringify({
            postID: id,
            title: title,
            content: content,
            user: storageID,
          }),
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error(`HTTP error: status is ${response.status}`);
        }
        let data = await response.json();
        console.log(data);
        setMsg("Ändringar sparade");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const deletePost = async () => {
    try {
      const response = await fetch(url + `/posts/delete/${id}`, {
        method: "DELETE",
        body: JSON.stringify({ user: storageID, postID: id }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(`HTTP error: status is ${response.status}`);
      }
      let posts = await response.json();

      console.log(posts);

      setMsg("Dokumentet är borttaget");
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogoutClick = () => {
    sessionStorage.clear();
  };

  let printHTML = posts.map((post: IPost, i: number) => {
    return (
      <div key={i}>
        <h4>{post.title}</h4>
        <input type="text" name="title" value={title} onChange={handleChange} />
        <Editor
          apiKey="8ptuvhro7r1cnldvl0ib0hklp6ruhyx5mgg6a82z8f49d6p8"
          textareaName="Body"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={`${post.content}`}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </div>
    );
  });

  return (
    <>
      <Link to="/">
        <button onClick={handleLogoutClick}>Logga ut </button>
      </Link>

      <Link to={`/posts/${storageID}`}>Mina dokument</Link>
      <div>{msg}</div>

      <div>{printHTML}</div>
      <button onClick={saveEdit}>Spara ändringar</button>
      <button onClick={deletePost}>Ta bort</button>
    </>
  );
};
