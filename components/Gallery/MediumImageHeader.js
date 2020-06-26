import React from "react";
import ShowAllPhotos from "../Buttons/ShowAllPhotos";
import styled from "styled-components";

const BackgroundImage = styled.div`
	background-image: url("${(props) => props.image}");
	height: 100%;
	width: 100%;
	display: block;
	min-height: 150px;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center center;
`;

const GridGallery = styled.div`
  display: grid;
  position: relative;
  grid-gap: 10px;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: repeat(2, 1fr);
  min-height: 300px;
  .small {
    grid-row: span 1;
    grid-column: span 1;
  }
  .big {
    grid-column: span 1;
    grid-row: span 2;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const MediumImageHeader = ({ images, setShowImageModal }) => {
  return (
    <GridGallery>
      {images[0] ? (
        <div className="big">
          <BackgroundImage image={images[0]} />
        </div>
      ) : (
        <div className="h-full w-full bg-gray-100"></div>
      )}
      {images[1] ? (
        <div class="small">
          <BackgroundImage image={images[1]} />
        </div>
      ) : (
        <div className="h-full w-full bg-gray-100"></div>
      )}
      {images[2] ? (
        <div class="small">
          <BackgroundImage image={images[2]} />
        </div>
      ) : (
        <div className="h-full w-full bg-gray-100"></div>
      )}

      <ShowAllPhotos setShowImageModal={setShowImageModal} />
    </GridGallery>
  );
};

export default MediumImageHeader;
