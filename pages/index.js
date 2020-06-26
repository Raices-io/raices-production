import { useState } from 'react';
import TopNav from '../components/Navigation/TopNav';
import BottomNav from '../components/Navigation/BottomNav';
import Features from '../components/LandingPage/Features';
import styled, { css } from 'styled-components';
import SearchBar from '../components/LandingPage/SearchBar';
// allows us to not show results before a

const Explore = () => {
	// stop scroll at page level is query is not empty
	const [input, setInput] = useState(false);

	return (
		<Container onClick={() => setInput(false)}>
			<TopNavContainer>
				<TopNav fixed />
			</TopNavContainer>
			<HeroContainer input={input}>
				{/* Features section */}
				<SearchBar input={input} setInput={setInput} />
			</HeroContainer>
			<div className="flex px-5 flex flex-grow flex-shrink-0 justify-center items-center sm:px-12 pb-6 sm:pb-0">
				<Features />
			</div>
			<BotNavContainer input={input}>
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
	justify-content: center;

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

	${props =>
		props.input &&
		css`
			@media (max-width: 768px) {
				justify-content: flex-start;
			}
		`}
`;

const Container = styled.div`
	overflow: auto;
`;

const BotNavContainer = styled.div`
	position: fixed;
	z-index: 10;
	bottom: 0;
	width: 100vw;

	@media (min-width: 768px) {
		display: none;
	}

	${props =>
		props.input &&
		css`
			@media (max-width: 768px) {
				display: none;
			}
		`}
`;

const TopNavContainer = styled.div`
	position: fixed;
	z-index: 10;
	bottom: 0;
	width: 100vw;

	@media (max-width: 768px) {
		display: none;
	}
`;

export default Explore;
