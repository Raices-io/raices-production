import { createGlobalStyle } from 'styled-components';

// Global style to prevent page scrolling while modal open
const GlobalStyle = createGlobalStyle`
  body {
    overflow-y: ${props => (props.overflow ? 'auto' : 'hidden')};
  }
`;

const TourModal = ({ tourSrc, setShowTourModal }) => {
	return (
		<div className="bg-white z-40 fixed flex flex-col top-0 left-0 h-full w-screen">
			<GlobalStyle overflow={false} />
			<div className="flex justify-between pt-4 h-20">
				<div className="w-1/2 sm:w-1/12 flex justify-center items-center">
					<div
						onClick={() => setShowTourModal(false)}
						className="bg-white rounded px-4 py-2 border border-gray-500 cursor-pointer">
						Close
					</div>
				</div>
			</div>
			<div className="flex flex-grow h-full pb-4 items-center">
				<iframe
					id="/tours/N_uOrlBoz_IR"
					allow="vr;accelerometer;gyroscope;fullscreen"
					allowfullscreen
					frameborder="0"
					width="100%"
					height="100%"
					src={tourSrc}></iframe>
			</div>
		</div>
	);
};

export default TourModal;
