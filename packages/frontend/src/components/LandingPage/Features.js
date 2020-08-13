import styled from 'styled-components';
import { Heading, Text, Square } from '@raices/dirt';

const Features = () => {
	return (
		<FeaturesContainer>
			<Heading fontSize={7} mb={11} highlighted={['próxima', 'directamente', 'Sin', 'contratiempos.']}>
				Encuentra tu próxima propiedad. Conecta directamente con agentes. Sin contratiempos.
			</Heading>
			<List>
				<ListItem>
					<Heading fontSize={6}>Encuentra tu próxima casa</Heading>
					<TextContainer>
						<Square />
						<Text fontSize={5}>Recibe la información que necesitas, en cualquier ciudad.</Text>
					</TextContainer>
				</ListItem>
				<ListItem>
					<Heading fontSize={6}>Sin intermediarios</Heading>
					<TextContainer>
						<Square />
						<Text fontSize={5}>Conecta con solo un agente por propiedad, directamente.</Text>
					</TextContainer>
				</ListItem>
				<ListItem>
					<Heading fontSize={6}>Información actualizada</Heading>
					<TextContainer>
						<Square />
						<Text fontSize={5}>
							Nos aseguramos de que las propiedades en nuestra página estén realmente a la
							venta.
						</Text>
					</TextContainer>
				</ListItem>
				<ListItem>
					<Heading fontSize={6}>Envía mensajes directamente a los agentes</Heading>
					<TextContainer>
						<Square />
						<Text fontSize={5}>
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

export default Features;
