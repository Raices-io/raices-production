import React from "react";

const ShowAllPhotos = ({ setShowImageModal }) => {
  return (
    <div
      onClick={() => {
        setShowImageModal(true);
      }}
      className="text-sm bg-white rounded-sm px-4 py-2 absolute right-5 bottom-5"
    >
      Show all photos
    </div>
  );
};

export default ShowAllPhotos;
