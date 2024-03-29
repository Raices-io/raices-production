import { useState } from 'react';
import styled from 'styled-components';

const BackgroundImage = styled.div`
  background-image: url("${props => props.image}");
  height: 100%;
  width: 100%;
  display: block;
  min-height: 150px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  position: relative;
`;

const ImageGalleryModal = ({ images = [], setShowImageModal, defaultPic, changeDefaultPic, deletePic }) => {
	const [position, setPosition] = useState(1);

	return (
		<div className="bg-white z-40 fixed flex flex-col top-0 left-0 h-full w-screen">
			<div className="flex justify-between pt-4 h-20">
				{/* Close button */}
				<div className="w-1/2 sm:w-1/12 flex justify-center items-center">
					<div
						onClick={() => setShowImageModal(false)}
						className="bg-white rounded px-4 py-2 border border-gray-500">
						Close
					</div>
				</div>
				{/* Count display */}
				<div className="w-1/2 sm:w-1/12 flex justify-center items-center">
					<span>
						{position} of {images.length}
					</span>
				</div>
			</div>
			<div className="flex flex-grow h-full pb-4 items-center">
				{/* Left button */}
				<div
					onClick={() => {
						if (position > 1) {
							setPosition(p => position - 1);
						}
					}}
					className="flex w-1/12 items-center justify-center bg-white ">
					<div className="w-8 h-8 border border-gray-500 rounded-full flex justify-center items-center">
						<svg
							className="w-6 h-6 fill-current text-gray-500"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20">
							<path d="M7.05 9.293L6.343 10 12 15.657l1.414-1.414L9.172 10l4.242-4.243L12 4.343z" />
						</svg>
					</div>
				</div>
				{/* Image */}
				<BackgroundImage image={images[position - 1]}>
					<div className="w-8 h-8 border border-gray-500 rounded-full flex justify-center items-center absolute bottom-5 right-5">
						<svg
							className={`w-6 h-6 fill-current ${
								images[position - 1] == defaultPic ? 'text-yellow-300' : 'text-gray-600'
							} hover:text-yellow-300`}
							onClick={() => changeDefaultPic(images[position - 1])}
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20">
							<path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
						</svg>
					</div>
					<div className="w-8 h-8 border border-gray-500 rounded-full flex justify-center items-center absolute top-5 right-5">
						<svg
							className={`w-6 h-6 fill-current hover:text-red-700`}
							onClick={() => deletePic(images[position - 1])}
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20">
							<path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z" />
						</svg>
					</div>
				</BackgroundImage>
				{/* <img className="w-10/12" src={images[position - 1]} /> */}
				{/* Right button */}
				<div
					onClick={() => {
						if (position < images.length) {
							setPosition(p => position + 1);
						}
					}}
					className="flex w-1/12 items-center justify-center bg-white ">
					<div className="w-8 h-8 border border-gray-500 rounded-full flex justify-center items-center">
						<svg
							className="w-6 h-6 fill-current text-gray-500"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20">
							<path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
						</svg>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ImageGalleryModal;
