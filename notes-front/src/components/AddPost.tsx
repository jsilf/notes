import { Editor } from "@tinymce/tinymce-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IPost } from "../models/IPost";
// import { storageID } from "./Login";
import { url } from "./Posts";

export const AddPost = () => {
  const editorRef = useRef<any>(null);
  const [title, setTitle] = useState("");
  const [msg, setMsg] = useState("");

  // const [storedId, setStoredId] = useState("");
  let storageID = sessionStorage.getItem("userID");

  // useEffect(() => {
  //   setStoredId(storageID);
  // }, []);

  // console.log(storedId);

  // useEffect(() => {
  //   saveNewPost();
  // }, []);

  const saveNewPost = async () => {
    try {
      if (editorRef.current) {
        const content = editorRef.current.getContent();

        //blob
        const obj = { user: storageID, title: title, content: content };
        const blob = new Blob([JSON.stringify(obj, null, 3)], {
          type: "application/json",
        });
        console.log(blob);

        const response = await fetch(url + `/posts/add`, {
          method: "POST",
          body: blob,
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error(`HTTP error: status is ${response.status}`);
        }
        let data = await response.json();
        console.log(data);
        setMsg(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogoutClick = () => {
    sessionStorage.clear();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <>
      <button onClick={handleLogoutClick}>
        <Link to="/">Logga ut</Link>
      </button>

      <Link to={`/posts/${storageID}`}>Mina dokument</Link>

      <div>
        <h5>{msg}</h5>

        <input type="text" name="title" value={title} onChange={handleChange} />

        <Editor
          apiKey="8ptuvhro7r1cnldvl0ib0hklp6ruhyx5mgg6a82z8f49d6p8"
          textareaName="Body"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue="<p>Börja skriv här..</p>"
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
        <button onClick={saveNewPost}>Spara</button>
      </div>
    </>
  );
};
