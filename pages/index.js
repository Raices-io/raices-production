import { useState } from 'react';
import TopNav from '../components/Navigation/TopNav';
import BottomNav from '../components/Navigation/BottomNav';
import Features from '../components/LandingPage/Features';
import styled, { css } from 'styled-components';
import HeroContent from '../components/LandingPage/HeroContent';
import Layout from '../components/Layout';

const Explore = () => {
	const [input, setInput] = useState(false);
	console.log('/ RE-RENDERING');

	return (
		<Layout input={input}>
			<Container onClick={() => setInput(false)}>
				<HeroContainer input={input}>
					{/* Features section */}
					<HeroContent input={input} setInput={setInput} />
				</HeroContainer>
				<div className="flex px-5 flex flex-grow flex-shrink-0 justify-center items-center sm:px-12 pb-6 sm:pb-0">
					<Features />
				</div>
			</Container>
		</Layout>
	);
};

const HeroContainer = styled.div`
	height: 60vh;

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
	}

	${props =>
		props.input &&
		css`
			@media (max-width: 768px) {
				justify-content: flex-start;
			}
		`}
`;

const Container = styled.div``;

export default Explore;
