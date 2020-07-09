import { NextSeo } from 'next-seo';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';

import LocalInformation from './LocalInformation';
import AgentCard from '../Cards/AgentCard';
import colors from '../../util/colors';
import Description from './Description';

const Home = ({ home, setShowTourModal }) => {
	return (
		<>
			<NextSeo
				title={home.title}
				description={home.description}
				canonical="https://www.raices.io/"
				openGraph={{
					title: home.title,
					description: home.description,
					images: [
						{
							url: home.defaultPic,
							width: 800,
							height: 600,
							alt: home.title,
						},
					],
				}}
			/>

			<Container>
				<HomeContent>
					<HomeSummary>
						<SummaryHeader>
							<Title>{home.title}</Title>
							<NumberFormat
								thousandSeparator={true}
								thousandsGroupStyle="thousand"
								displayType="text"
								prefix={'$'}
								value={home.price}
							/>
						</SummaryHeader>
						<Info>
							<div className="sub-header">
								<div className="bed-bath">
									<svg
										width="30"
										height="18"
										viewBox="0 0 30 18"
										fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<path
											d="M8.25 9C10.3177 9 12 7.31766 12 5.25C12 3.18234 10.3177 1.5 8.25 1.5C6.18234 1.5 4.5 3.18234 4.5 5.25C4.5 7.31766 6.18234 9 8.25 9ZM24.75 3H14.25C13.8356 3 13.5 3.33562 13.5 3.75V10.5H3V0.75C3 0.335625 2.66438 0 2.25 0H0.75C0.335625 0 0 0.335625 0 0.75V17.25C0 17.6644 0.335625 18 0.75 18H2.25C2.66438 18 3 17.6644 3 17.25V15H27V17.25C27 17.6644 27.3356 18 27.75 18H29.25C29.6644 18 30 17.6644 30 17.25V8.25C30 5.35031 27.6497 3 24.75 3Z"
											fill={colors('bg.primary_gray')}
										/>
									</svg>
									<span className="desktopStats">{`${home.bedrooms} Habitaciones`}</span>
									<span className="mobileStats">{`${home.bedrooms}`}</span>
									<svg
										width="23"
										height="23"
										viewBox="0 0 23 23"
										fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<path
											d="M1.4375 18.6876C1.4375 19.8314 1.89185 20.9283 2.7006 21.737C3.50935 22.5458 4.60625 23.0001 5.75 23.0001H17.25C18.3937 23.0001 19.4906 22.5458 20.2994 21.737C21.1081 20.9283 21.5625 19.8314 21.5625 18.6876V17.2501H1.4375V18.6876ZM22.2812 12.9376H17.9688V11.5001H20.8438C21.0344 11.5001 21.2172 11.4244 21.352 11.2896C21.4868 11.1548 21.5625 10.972 21.5625 10.7814V10.0626C21.5625 9.87202 21.4868 9.6892 21.352 9.55441C21.2172 9.41962 21.0344 9.3439 20.8438 9.3439H17.25C16.8688 9.3439 16.5031 9.49535 16.2335 9.76493C15.964 10.0345 15.8125 10.4001 15.8125 10.7814V12.9376H12.9375V5.31265C12.9375 4.9314 13.089 4.56576 13.3585 4.29618C13.6281 4.0266 13.9938 3.87515 14.375 3.87515C14.7562 3.87515 15.1219 4.0266 15.3915 4.29618C15.661 4.56576 15.8125 4.9314 15.8125 5.31265V6.0314C15.8125 6.22202 15.8882 6.40484 16.023 6.53963C16.1578 6.67442 16.3406 6.75015 16.5312 6.75015H17.9688C18.1594 6.75015 18.3422 6.67442 18.477 6.53963C18.6118 6.40484 18.6875 6.22202 18.6875 6.0314V5.31265C18.6866 4.6736 18.544 4.04271 18.2699 3.46545C17.9957 2.88819 17.5969 2.37895 17.1022 1.97443C16.6075 1.56991 16.0292 1.28019 15.409 1.12616C14.7888 0.972135 14.1421 0.957632 13.5156 1.0837C11.4681 1.48126 10.0625 3.39718 10.0625 5.4829V12.9376H7.1875V10.7814C7.1875 10.4001 7.03605 10.0345 6.76647 9.76493C6.49688 9.49535 6.13125 9.3439 5.75 9.3439H2.15625C1.96563 9.3439 1.78281 9.41962 1.64802 9.55441C1.51323 9.6892 1.4375 9.87202 1.4375 10.0626V10.7814C1.4375 10.972 1.51323 11.1548 1.64802 11.2896C1.78281 11.4244 1.96563 11.5001 2.15625 11.5001H5.03125V12.9376H0.71875C0.528126 12.9376 0.345309 13.0134 0.210517 13.1482C0.0757252 13.283 0 13.4658 0 13.6564L0 15.0939C0 15.2845 0.0757252 15.4673 0.210517 15.6021C0.345309 15.7369 0.528126 15.8126 0.71875 15.8126H22.2812C22.4719 15.8126 22.6547 15.7369 22.7895 15.6021C22.9243 15.4673 23 15.2845 23 15.0939V13.6564C23 13.4658 22.9243 13.283 22.7895 13.1482C22.6547 13.0134 22.4719 12.9376 22.2812 12.9376Z"
											fill={colors('bg.primary_gray')}
										/>
									</svg>
									<span className="desktopStats">{`${home.bathrooms} Baños`}</span>
									<span className="mobileStats">{`${home.bathrooms}`}</span>
								</div>
							</div>
							{home.tour_src && (
								<svg
									width="60"
									height="45"
									viewBox="0 0 60 45"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className="tour"
									onClick={setShowTourModal}>
									<path
										d="M37.7677 39.3336C36.8957 39.3336 36.139 38.6854 36.0259 37.7978C35.9037 36.8347 36.5848 35.9549 37.5475 35.8322C43.102 35.1245 48.0761 33.6194 51.5533 31.5933C54.7334 29.7407 56.4843 27.5627 56.4843 25.4606C56.4843 23.1439 54.4354 21.2483 52.716 20.0654C51.9163 19.5152 51.7139 18.4211 52.2642 17.621C52.8144 16.8212 53.9089 16.6189 54.7086 17.1691C58.1703 19.5504 59.9999 22.4174 59.9999 25.4611C59.9999 28.9154 57.6914 32.0863 53.3234 34.631C49.3917 36.9217 44.0903 38.5431 37.992 39.3199C37.9165 39.3291 37.8414 39.3336 37.7677 39.3336Z"
										fill="#327B87"
									/>
									<path
										d="M27.7204 39.7756C27.6993 39.7756 27.6778 39.7752 27.6567 39.7743C20.3655 39.5147 13.5718 38.0352 8.52769 35.6095C3.02857 32.965 0 29.3606 0 25.4604C0 23.0833 1.13205 19.5786 6.52543 16.3816C7.36039 15.8868 8.43888 16.1623 8.93419 16.9978C9.42903 17.8327 9.15345 18.9112 8.31803 19.406C5.22126 21.2417 3.51563 23.3918 3.51563 25.4604C3.51563 27.8999 5.89783 30.4441 10.0511 32.4413C14.6677 34.6615 20.9647 36.0179 27.7817 36.2609C28.7522 36.2957 29.5107 37.1101 29.4759 38.0805C29.442 39.029 28.6625 39.7756 27.7204 39.7756Z"
										fill="#6EBAC6"
									/>
									<path
										d="M38.0923 21.7168V15.8162C38.0923 11.9865 40.4745 10.5615 43.5475 10.5615C46.62 10.5615 49.0246 11.9865 49.0246 15.8162V21.7168C49.0246 25.5464 46.62 26.9715 43.5475 26.9715C40.4745 26.9715 38.0923 25.5464 38.0923 21.7168ZM45.5511 15.8162C45.5511 14.2799 44.7944 13.5896 43.5475 13.5896C42.3005 13.5896 41.5658 14.2799 41.5658 15.8162V21.7168C41.5658 23.253 42.3005 23.9433 43.5475 23.9433C44.7944 23.9433 45.5511 23.253 45.5511 21.7168V15.8162Z"
										fill="#6EBAC6"
									/>
									<path
										d="M23.6411 44.5036C23.1916 44.5036 22.7416 44.3319 22.3983 43.9891C21.7116 43.3024 21.7116 42.1896 22.3983 41.5029L25.843 38.0583L22.3983 34.614C21.7116 33.9274 21.7116 32.8146 22.3983 32.1279C23.0845 31.4417 24.1978 31.4417 24.8844 32.1279L29.5719 36.8154C30.2581 37.5016 30.2581 38.6149 29.5719 39.3015L24.8844 43.9891C24.5411 44.3319 24.0911 44.5036 23.6411 44.5036Z"
										fill="#327B87"
									/>
									<path
										d="M18.41 21.9402V21.5173C18.41 20.0254 17.4967 19.7361 16.2722 19.7361C15.5151 19.7361 15.2701 19.0682 15.2701 18.4003C15.2701 17.732 15.5151 17.0641 16.2722 17.0641C17.1181 17.0641 18.009 16.9529 18.009 15.1493C18.009 13.8579 17.2742 13.5462 16.361 13.5462C15.2701 13.5462 14.7135 13.8135 14.7135 14.6819C14.7135 15.4386 14.3793 15.9508 13.088 15.9508C11.4849 15.9508 11.2849 15.6167 11.2849 14.5478C11.2849 12.8115 12.5313 10.5625 16.361 10.5625C19.1891 10.5625 21.3264 11.5865 21.3264 14.5927C21.3264 16.2177 20.7253 17.732 19.612 18.2442C20.9258 18.7341 21.883 19.7137 21.883 21.5173V21.9402C21.883 25.5918 19.3671 26.9724 16.2498 26.9724C12.4201 26.9724 10.9507 24.6346 10.9507 22.7642C10.9507 21.7622 11.3737 21.4948 12.5982 21.4948C14.0232 21.4948 14.3793 21.8066 14.3793 22.653C14.3793 23.6994 15.3594 23.9443 16.361 23.9443C17.8753 23.9443 18.41 23.3877 18.41 21.9402Z"
										fill="#6EBAC6"
									/>
									<path
										d="M53.2441 10.5469C50.336 10.5469 47.9707 8.18116 47.9707 5.27344C47.9707 2.36573 50.336 0 53.2441 0C56.1519 0 58.5176 2.36573 58.5176 5.27344C58.5176 8.18116 56.1519 10.5469 53.2441 10.5469ZM53.2441 3.51563C52.2746 3.51563 51.4863 4.30436 51.4863 5.27344C51.4863 6.24299 52.2746 7.03126 53.2441 7.03126C54.2132 7.03126 55.002 6.24299 55.002 5.27344C55.002 4.30436 54.2132 3.51563 53.2441 3.51563Z"
										fill="#6EBAC6"
									/>
									<path
										d="M35.3986 21.5173V21.7178C35.3986 25.5474 33.0159 26.9724 29.9434 26.9724C26.8709 26.9724 24.4658 25.5474 24.4658 21.7178V15.8172C24.4658 11.9875 26.9373 10.5625 30.1439 10.5625C33.9068 10.5625 35.3986 12.9003 35.3986 14.7483C35.3986 15.8172 34.8864 16.1509 33.7731 16.1509C32.8159 16.1509 31.9695 15.906 31.9695 14.882C31.9695 14.036 31.0791 13.5906 30.0327 13.5906C28.7189 13.5906 27.9393 14.2809 27.9393 15.8172V17.8208C28.6521 17.0417 29.6541 16.8412 30.723 16.8412C33.2608 16.8412 35.3986 17.9545 35.3986 21.5173ZM27.9393 21.9627C27.9393 23.4989 28.6965 24.1668 29.9434 24.1668C31.1904 24.1668 31.9251 23.4989 31.9251 21.9627V21.7622C31.9251 20.1366 31.1904 19.5132 29.921 19.5132C28.7189 19.5132 27.9393 20.0922 27.9393 21.5617V21.9627Z"
										fill="#6EBAC6"
									/>
								</svg>
							)}
						</Info>
					</HomeSummary>
					<Button>Planea una visita</Button>
					<LocalInformation home={home} />
					<Description home={home} />
				</HomeContent>
				<RightPanel>
					<AgentCard home={home} />
				</RightPanel>
			</Container>
		</>
	);
};

const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr 400px;
	grid-template-areas: 'home panel';
	grid-gap: 2rem;
	margin: 2rem 0;

	@media (max-width: 1105px) {
		grid-template-columns: 1fr 330px;
	}
	@media (max-width: 1024px) {
		grid-template-columns: 1fr;
		grid-template-areas: 'home';
		grid-gap: 0;
	}

	@media (max-width: 768px) {
		padding: 0 1rem;
		margin-top: 1rem;
	}
`;

const HomeSummary = styled.div``;

const HomeContent = styled.div`
	grid-area: home;
	width: 100%;
`;

const RightPanel = styled.div`
	grid-area: panel;
	@media (max-width: 1024px) {
		display: none;
	}
`;

const Title = styled.h2`
	font-size: 1.75rem;
	font-weight: 500;

	@media (max-width: 1105px) {
		font-size: 1.5rem;
	}

	@media (max-width: 768px) {
		margin-bottom: 1rem;
	}
`;

const Info = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 0.5rem;

	.tour {
		cursor: pointer;
	}

	.sub-header {
		p {
			margin-bottom: 0.5rem;
			font-size: 1.1rem;
			color: ${colors('primary')};
		}
	}

	.bed-bath {
		display: flex;
		align-items: center;

		svg {
			margin-right: 1rem;
		}

		span {
			margin-right: 2rem;
			color: ${colors('primary')};
			font-size: 1.1rem;
		}
	}

	.mobileStats {
		display: none;
	}

	@media (max-width: 768px) {
		.mobileStats {
			display: block;
		}

		.desktopStats {
			display: none;
		}
	}
`;

const SummaryHeader = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;

	@media (max-width: 768px) {
		flex-direction: column;
	}

	span {
		display: block;
		font-size: 1.75rem;
		font-family: 'Roboto', sans-serif;
		text-align: end;
		width: fit-content;
		margin-left: 3rem;

		@media (max-width: 1105px) {
			font-size: 1.5rem;
		}

		@media (max-width: 1024px) {
			margin-left: 5rem;
		}

		@media (max-width: 768px) {
			margin-left: 0;
			font-size: 2.5rem;
			margin-bottom: 0.5rem;
		}
	}
`;

const Button = styled.button`
	display: none;

	@media (max-width: 768px) {
		padding: 0.75rem;
		background-color: ${colors('primary')};
		color: ${colors('text.white')};
		border-radius: 5px;
		margin-top: 3rem;
		width: 100%;
		transition: ${props => props.theme.transitions.bg_hover};

		&:focus {
			outline: none;
		}

		&:hover {
			background-color: ${colors('button.hover')};
		}
	}
`;

export default Home;
