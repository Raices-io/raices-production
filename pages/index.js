import { useState } from 'react';
import TopNav from '../components/Navigation/TopNav';
import BottomNav from '../components/Navigation/BottomNav';
import Features from '../components/LandingPage/Features';
import styled from 'styled-components';
import SearchBar from '../components/LandingPage/SearchBar';
// allows us to not show results before a

const Explore = () => {
	// stop scroll at page level is query is not empty
	const [input, setInput] = useState(false);

	return (
		<Container onClick={() => setInput(false)}>
			<div className="z-40 hidden md:block px-12">
				<TopNav fixed />
			</div>
			<HeroContainer>
				{/* Features section */}
				<SearchBar input={input} setInput={setInput}/>
			</HeroContainer>
			<div className="flex px-5 flex flex-grow flex-shrink-0 justify-center items-center sm:px-12 pb-6 sm:pb-0">
				<Features />
			</div>
			<BotNavContainer>
				<BottomNav />
			</BotNavContainer>
		</Container>
	);
};

const HeroContainer = styled.div`
	height: 60vh;
	width: min(1440px, 90vw);
	margin: 0 auto;
	margin-top: 96px;

	display: flex;
	flex-direction: column;
	align-items: center;

	border-radius: 10px;

	background: linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
		url('/homePage/homePageImage.jpg');
	background-size: cover;
	background-position: center;

	@media (max-width: 768px) {
		border-radius: 0;
		width: 100%;
		margin-top: 0;
	}
`;

const Container = styled.div`
	overflow: auto;
	border: 5px solid red;
`;

const BotNavContainer = styled.div`
	position: fixed;
	z-index: 10;
	bottom: 0;
	width: 100vw;

	@media (min-width: 768px) {
		display: none;
	}
`;

export default Explore;
