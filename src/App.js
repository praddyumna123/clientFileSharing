import { useRef, useState, useEffect } from "react";
import { uploadFile } from "./services/api";

import "./App.css";

function App() {
  const [file, setFile] = useState("");
  const [result, setResult] = useState("");
  const fileInputRef = useRef();

  const logo =
    "https://i.pinimg.com/originals/16/46/24/1646243661201a0892cc4b1a64fcbacf.jpg";

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        let response = await uploadFile(data);
        setResult(response.path);
      }
    };
    getImage();
  }, [file]);

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <nav>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Upload File</a>
          </li>
          <li>
            <a href="#">Contact Us</a>
          </li>
        </ul>
      </nav>
      <div className="container">
        <img src={logo} alt="logo" className="logo" />

        <div className="wrapper">
          <h1 className="title">Simple File Sharing!</h1>
          <p className="description">
            Upload any file and share the download link
          </p>

          <button className="upload-button" onClick={() => onUploadClick()}>
            Upload
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => setFile(e.target.files[0])}
          />

          {result && (
            <a
              href={result}
              target="_blank"
              rel="noreferrer"
              className="download-link"
            >
              {result}
            </a>
          )}
        </div>
        <footer className="footer">
          <p>&copy; 2023 Simple File Sharing Inc.</p>
        </footer>
      </div>
    </>
  );
}

export default App;
