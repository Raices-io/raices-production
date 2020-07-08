import React from 'react';
import styled from 'styled-components';
import colors from '../../util/colors';

const LocalInformation = ({ home }) => {
	const hasLocalInfo = home.nearby_restaurants || home.nearby_hospitals || home.nearby_schools;
	console.log(hasLocalInfo);

	return (
		<Container>
			{hasLocalInfo && <h1>Información Local</h1>}
			{home.nearby_restaurants && (
				<NearBy>
					<div className="restaurant"></div>
					<h2>Restaurantes</h2>
					<p>{home.nearby_restaurants}</p>
				</NearBy>
			)}
			{home.nearby_hospitals && (
				<NearBy>
					<div className="hospital"></div>
					<h2>Hospitales</h2>
					<p>{home.nearby_hospitals}</p>
				</NearBy>
			)}
			{home.nearby_schools && (
				<NearBy>
					<div className="school"></div>
					<h2>Escuelas</h2>
					<p>{home.nearby_schools}</p>
				</NearBy>
			)}
		</Container>
	);
};

const Container = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 150px);
	grid-template-rows: fit-content 1fr;
	grid-gap: 1.5rem 3rem;
	margin-top: 3rem;

	.restaurant,
	.hospital,
	.school {
		width: 100%;
		height: 120px;
		background-color: ${colors('bg.primary_gray')};
		background-size: cover;
		background-position: center;
		border-radius: 10px;
		margin-bottom: 0.5rem;
	}

	.restaurant {
		background-image: url('/homePage/restaurant.png');
	}
	.hospital {
		background-image: url('/homePage/hospital.png');
	}
	.school {
		background-image: url('/homePage/escuela.png');
	}

	h1 {
		font-size: 1.5rem;
		grid-column: span 4;
	}

	h2 {
		font-size: 1.25rem;
		margin-bottom: 0.25rem;
	}

	p {
		font-size: 0.9rem;
	}
`;

const NearBy = styled.div``;

export default LocalInformation;
