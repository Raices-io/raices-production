import React, { useState, useRef, useEffect, Fragment } from "react";
import firebase from "../../util/firebase.js";
import styled from "styled-components";

const BackgroundImage = styled.div`
  background-image: url(${(props) => props.image});
  height: 400px;
  width: 600px;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  display: block;
  position: relative;
  margin-top: 1rem;
  @media (max-width: 599px) {
    width: 100%;
  }
`;
const FillerImage = styled.div`
  height: 400px;
  width: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const UploadTask = ({ picture, pendingHomeId }) => {
  const { file, dataURL } = picture;
  const storage = firebase.storage();
  const storageRef = storage.ref();
  const firestore = firebase.firestore();
  let storedName = null;
  const [progress, setProgress] = useState(0);
  const [name, setName] = useState(file.name);
  const [status, setStatus] = useState("running");
  const [url, setUrl] = useState(null);
  const [error, setError] = useState("");
  const [docId, setDocId] = useState(null);

  const deletePhoto = (name) => {
    // delete the storage ref
    const photoRef = storage
      .ref()
      .child(`images/`)
      .child(`homeImages/${pendingHomeId}/${name}`);
    photoRef.delete();
    // delete the doc
    firestore
      .collection("images")
      .doc(docId)
      .delete()
      .then(() => console.log("deleted!"));
    // remove it from state
    setUrl("deleted");
  };
  useEffect(() => {
    storedName = `${Math.floor(Math.random() * 100)}-${file.name}`;
    const photoRef = storageRef
      .child(`images/`)
      .child(`homeImages/${pendingHomeId}/${storedName}`);
    try {
      const uploadTask = photoRef.put(file);
      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion

      // 1. 'state_changed' observer, called any time the state changes
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // observe state change such as progress, pause, resume
          // get task progress
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              setStatus((p) => "Paused");
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              setStatus((p) => "Running");
              break;
          }
        },
        (e) => {
          setError((p) => e);
        },
        () => {
          photoRef.getDownloadURL().then(async (url) => {
            setName((p) => storedName);
            setUrl(url);
            let data = {
              name: storedName,
              downloadURL: url,
              homeId: pendingHomeId,
            };
            // create the image object
            await firestore
              .collection("images")
              .add(data)
              .then((ref) => {
                // add the photo to state
                setDocId((p) => ref.id);
              });
          });
        }
      );
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <Fragment>
      {url && url !== "deleted" ? (
        <div class="w-full h-auto block flex justify-center flex-grow bg-cover  bg-no-repeat bg-center">
          <BackgroundImage image={url}>
            {" "}
            <div
              onClick={() => deletePhoto(name, dataURL, url)}
              className="bg-black opacity-50 absolute left-5 top-5 rounded-full h-10 w-10 border border-white flex justify-center items-center"
            >
              <svg
                className="fill-current text-white h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z" />
              </svg>
            </div>
          </BackgroundImage>
        </div>
      ) : (
        <div class="w-full h-auto block flex justify-center flex-grow bg-cover  bg-no-repeat bg-center">
          <FillerImage>
            {!url && progress !== 100 && (
              <progress value={progress} max="100" />
            )}
            {url == "deleted" && "deleted"}
          </FillerImage>
        </div>
      )}
    </Fragment>
  );
};
const Uploader = ({ pendingHomeId }) => {
  const [files, setFiles] = useState([]);
  const [fileErrors, setFileErrors] = useState([]);
  const storage = firebase.storage();

  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      // Read the image via FileReader API and save image result in state.
      reader.onload = function (e) {
        // Add the file name to the data URL
        let dataURL = e.target.result;
        dataURL = dataURL.replace(";base64", `:name=${file.name};base64`);
        resolve({ file, dataURL });
      };

      reader.readAsDataURL(file);
    });
  };
  const handleChange = (e) => {
    const files = e.target.files;
    const allFilePromises = [];
    const fileErrors = [];
    // iterate over all uploaded files
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      console.log("in for loop");
      console.log(files[i]);
      let fileError = {
        name: file.name,
      };
      // check for file extention :)
      allFilePromises.push(readFile(file));
    }
    setFileErrors(fileErrors);

    Promise.all(allFilePromises).then((newFilesData) => {
      console.log("new files data is");
      console.log(newFilesData);
      setFiles((p) => [...p, ...newFilesData]);
    });
  };

  return (
    <div className=" mt-8 flex  self-center flex-col  antialiased">
      <input
        className="form-input"
        type="file"
        multiple={true}
        onChange={handleChange}
      />
      {files &&
        files.map((picture) => (
          <UploadTask pendingHomeId={pendingHomeId} picture={picture} />
        ))}
      <br />
    </div>
  );
};
export default Uploader;
