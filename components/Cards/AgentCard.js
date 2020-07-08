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
			<Image image={home.agent.profilePic}></Image>
			<div className="info-container">
				<Info>
					<h3>{home.agent.displayName}</h3>
					<ul>
						<li>Vive en Medellín</li>
						<li>Habla Inglés y Español</li>
						<li>Puede recogerte si lo deseas</li>
					</ul>
				</Info>
			</div>
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
	grid-template-rows: fit-content fit-content fit-content;
	grid-gap: 1rem 2rem;
	grid-template-areas:
		'name name'
		'image info'
		'button button';

	.info-container {
		grid-area: info;
	}

	h2,
	h3 {
		font-size: 1.5rem;
		color: ${colors('primary')};
	}

	h2 {
		grid-area: name;
	}

	h3 {
		font-size: 1.2rem;
		margin-bottom: 0.5rem;
	}

	button {
		grid-area: button;
		padding: 0.75rem;
		background-color: ${colors('primary')};
		color: ${colors('text.white')};
		border-radius: 5px;
	}

	ul {
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		li {
			font-size: 0.9rem;
			margin-bottom: 0.5rem;
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
	/* align-self: center; */
`;
const Info = styled.div``;

export default AgentCard;
