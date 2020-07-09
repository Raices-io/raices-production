import React from 'react';
import messageAgent from '../../services/messageAgent';
import { useAuth } from '../../util/auth';
import styled from 'styled-components';
import colors from '../../util/colors';

const AgentCard = ({ home }) => {
	const auth = useAuth();
	const user = auth.user;

	return (
		<Container>
			<h2>Agente Inmobiliario</h2>
			<h3>{home.agent.displayName}</h3>
			<Image image={home.agent.profilePic}></Image>
			<Info>
				<ul>
					<li>Vive en Medellín</li>
					<li>Habla Inglés y Español</li>
					<li>Puede recogerte si lo deseas</li>
				</ul>
			</Info>
			<button onClick={() => messageAgent(user, home.agent, home.title)}>Planea una visita</button>
		</Container>
	);
};

const Container = styled.div`
	width: 100%;
	border: 1px solid ${colors('border.light')};
	padding: 1.25rem;
	border-radius: 10px;

	display: grid;
	grid-template-columns: 1fr 1.7fr;
	grid-template-rows: fit-content fit-content fit-content fit-content;
	grid-gap: 0 1rem;
	grid-template-areas:
		'title title'
		'name name'
		'image info'
		'button button';

	h2,
	h3 {
		font-size: 1.5rem;

		@media (max-width: 1105px) {
			font-size: 1.25rem;
		}
	}

	h2 {
		grid-area: title;
		margin-bottom: 1rem;
	}

	h3 {
		color: ${colors('primary')};
		font-size: 1.2rem;
		grid-area: name;
		margin-bottom: 0.5rem;

		@media (max-width: 1105px) {
			font-size: 1.1rem;
		}
	}

	button {
		grid-area: button;
		padding: 0.75rem;
		background-color: ${colors('primary')};
		color: ${colors('text.white')};
		border-radius: 5px;
		margin-top: 1.5rem;
	}

	ul {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		min-height: 100px;

		li {
			font-size: 0.9rem;
		}
	}
`;
const Image = styled.div`
	background-image: url("${({ image }) => image}");
	height: 100%;
	width: 100%;
	background-size: cover;
	background-position: center;
	border-radius: 10px;
	grid-area: image;
	align-self: center;
`;
const Info = styled.div`
	grid-area: info;
`;

export default AgentCard;
