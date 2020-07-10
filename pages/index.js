import { useState } from 'react';
import Features from '../components/LandingPage/Features';
import styled, { css } from 'styled-components';
import HeroContent from '../components/LandingPage/HeroContent';
import Layout from '../components/Layout';
import colors from '../util/colors';

const Explore = () => {
	const [input, setInput] = useState(false);

	return (
		<Layout input={input}>
			<Container onClick={() => setInput(false)}>
				<HeroContainer input={input}>
					<HeroContent input={input} setInput={setInput} />
				</HeroContainer>
				<HeadingContainer>
					<Heading>
						Una&nbsp;<span>mejor</span>&nbsp;forma de&nbsp;<span>comprar</span>&nbsp;una{' '}
						<span>propiedad</span>
					</Heading>
					<svg
						width="617"
						height="359"
						viewBox="0 0 617 359"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M235.255 11.4071C214.833 -3.80235 187.051 -3.80235 166.628 11.4071L235.255 11.4071ZM235.255 11.4071L378.121 117.781C378.123 117.783 378.126 117.785 378.129 117.787C393.073 128.906 401.884 146.592 401.884 165.397V299.974C401.884 332.568 375.883 358.995 343.815 358.995H270.006C259.845 358.995 251.609 350.623 251.609 340.296C251.609 329.97 259.845 321.598 270.006 321.598H343.815C355.562 321.598 365.09 311.914 365.09 299.974V165.397C365.09 158.499 361.86 152.027 356.393 147.961L356.385 147.955L213.512 41.5751C206.035 36.0061 195.851 36.0045 188.374 41.5735L45.5006 147.953C45.4999 147.954 45.5013 147.953 45.5006 147.953C40.03 152.029 36.7936 158.512 36.7936 165.397V299.974C36.7936 311.914 46.3212 321.598 58.0686 321.598H153.757C163.917 321.598 172.154 329.97 172.154 340.296C172.154 350.623 163.917 358.995 153.757 358.995H58.0686C26.0006 358.995 0 332.568 0 299.974V165.397C0 146.576 8.83701 128.897 23.7531 117.788L166.628 11.4071C166.629 11.4065 166.627 11.4076 166.628 11.4071"
							fill="#D2E3E6"
						/>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M449.699 11.4071C429.276 -3.80235 401.495 -3.80235 381.072 11.4071H449.699ZM449.701 11.4086L592.564 117.781C592.567 117.783 592.57 117.785 592.572 117.787C607.517 128.906 616.327 146.592 616.327 165.397V299.974C616.327 332.568 590.327 358.995 558.259 358.995H447.843C437.683 358.995 429.447 350.623 429.447 340.296C429.447 329.97 437.683 321.598 447.843 321.598H558.259C570.006 321.598 579.534 311.914 579.534 299.974V165.397C579.534 158.499 576.304 152.027 570.837 147.961L570.829 147.955L427.955 41.5751L427.953 41.5735C420.476 36.0045 410.295 36.0045 402.817 41.5735L402.815 41.5751L259.944 147.953C259.943 147.954 259.943 147.954 259.942 147.955C254.472 152.03 251.237 158.512 251.237 165.397V299.974C251.237 311.914 260.765 321.598 272.512 321.598H346.322C356.482 321.598 364.718 329.97 364.718 340.296C364.718 350.623 356.482 358.995 346.322 358.995H272.512C240.444 358.995 214.444 332.568 214.444 299.974V165.397C214.444 146.577 223.28 128.897 238.197 117.788L238.199 117.787L381.07 11.4086C381.07 11.4081 381.071 11.4076 381.072 11.4071"
							fill="#D2E3E6"
						/>
					</svg>
				</HeadingContainer>
				<Divider />
				<Features />
				<Divider />
			</Container>
		</Layout>
	);
};

const HeroContainer = styled.div`
	height: clamp(450px, 35vw, 550px);

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	border-radius: 10px;

	background: linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
		url('/homePage/alexander-andrews-A3DPhhAL6Zg-Crop3-unsplash.jpg');
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

const Container = styled.div`
	margin-bottom: 8rem;
`;

const HeadingContainer = styled.div`
	display: flex;
	align-items: center;
	margin-top: 8rem;
	position: relative;

	svg {
		position: absolute;
		right: 0;
		width: clamp(400px, 35vw, 600px);
		height: auto;

		@media (max-width: 1024px) {
			display: none;
		}
	}

	@media (max-width: 1024px) {
		margin-top: 5rem;
	}
	@media (max-width: 768px) {
		margin-top: 4rem;
		padding: 0 1rem;
	}
`;
const Heading = styled.h1`
	font-size: clamp(38px, 6vw, 78px);
	line-height: 1.13;
	width: 800px;
	z-index: 5;

	span {
		font-weight: 500;
		font-family: 'Poppins', sans-serif;
		color: ${colors('primary')};
	}
`;

const Divider = styled.div`
	width: 100%;
	height: 2px;
	background-color: ${colors('bg.divider')};
	margin: 8rem 0;

	@media (max-width: 1024px) {
		margin: 5rem 0;
	}
	@media (max-width: 768px) {
		margin: 4rem auto;
		width: calc(100% - 2rem);
	}
`;

export default Explore;
