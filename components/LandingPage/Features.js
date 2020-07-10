import colors from '../../util/colors';
import styled from 'styled-components';

const Features = () => {
	return (
		<FeaturesContainer>
			<HeadingTwo>
				Encuentra&nbsp;tu <span>próxima</span> propiedad. Conecta <span>directamente</span>{' '}
				con&nbsp;agentes. <span>Sin&nbsp;contratiempos.</span>
			</HeadingTwo>
			<List>
				<ListItem>
					<HeadingThree>Encuentra tu próxima casa</HeadingThree>
					<TextContainer>
						<Square />
						<Text>Recibe la información que necesitas, en cualquier ciudad.</Text>
					</TextContainer>
				</ListItem>
				<ListItem>
					<HeadingThree>Sin intermediarios</HeadingThree>
					<TextContainer>
						<Square />
						<Text>Conecta con solo un agente por propiedad, directamente.</Text>
					</TextContainer>
				</ListItem>
				<ListItem>
					<HeadingThree>Información actualizada</HeadingThree>
					<TextContainer>
						<Square />
						<Text>
							Nos aseguramos de que las propiedades en nuestra página estén realmente a la
							venta.
						</Text>
					</TextContainer>
				</ListItem>
				<ListItem>
					<HeadingThree>Envía mensajes directamente a los agentes</HeadingThree>
					<TextContainer>
						<Square />
						<Text>
							No es necesario compartir tu información personal – mantén todas tus
							comunicaciones en un mismo lugar.
						</Text>
					</TextContainer>
				</ListItem>
				<Image />
			</List>
		</FeaturesContainer>
	);
};

const FeaturesContainer = styled.div`
	@media (max-width: 768px) {
		padding: 0 1rem;
	}
`;

const HeadingTwo = styled.h2`
	margin-bottom: 4rem;
	font-size: clamp(1.75rem, 3vw, 3rem);

	span {
		font-weight: 500;
		font-family: 'Poppins', sans-serif;
		color: ${colors('primary')};
	}
`;

const HeadingThree = styled.h3`
	font-size: 1.75rem;

	font-size: clamp(1.4rem, 1.75vw, 1.75rem);
`;

const List = styled.ul`
	display: grid;
	grid-gap: 5rem;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(3, 1fr);
	grid-template-areas:
		'..... image'
		'..... image'
		'..... .....';

	@media (max-width: 1205px) {
		grid-gap: 3rem;
	}

	@media (max-width: 1024px) {
		grid-gap: 2rem;
		grid-template-columns: 1fr;
		grid-template-rows: repeat(4, fit-content);
		grid-template-areas:
			'.....'
			'.....'
			'.....'
			'.....';
	}
`;

const Square = styled.div`
	height: 25px;
	min-width: 25px;
	border-radius: 5px;
	margin-top: 0.4rem;
	background-color: ${colors('primary')};

	@media (max-width: 550px) {
		display: none;
	}
`;

const ListItem = styled.li``;

const Image = styled.div`
	height: 100%;
	width: 100%;
	grid-area: image;
	background-image: url('/homePage/chris-ross-harris-bJqeJxeyiJE-unsplash.jpg');
	background-size: cover;
	background-position: center;
	border-radius: 10px;

	@media (max-width: 1024px) {
		display: none;
	}
`;

const TextContainer = styled.div`
	display: flex;
	align-items: flex-start;
	margin-top: 1rem;
`;
const Text = styled.p`
	margin-left: 2rem;
	font-size: 1.5rem;
	font-size: clamp(1.2rem, 1.5vw, 1.5rem);
	color: ${colors('text.light_gray')};

	@media (max-width: 550px) {
		margin-left: 0;
	}
`;

export default Features;
