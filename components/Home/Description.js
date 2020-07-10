import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import colors from '../../util/colors';

const Description = ({ home }) => {
	const [showMore, setShowMore] = useState(false);
	const hasTooManyChars = home.description.length > 900;

	console.log(hasTooManyChars);

	return (
		<Container>
			<h1>Description</h1>
			<Content showMore={showMore} hasTooManyChars={hasTooManyChars}>
				<p>{home.description}</p>
			</Content>
			{hasTooManyChars && (
				<button onClick={() => setShowMore(!showMore)}>
					{!showMore ? 'Leer mas' : 'Leer menos'}
				</button>
			)}
		</Container>
	);
};

const Container = styled.div`
	margin: 3rem 0;
	position: relative;

	h1 {
		font-size: 1.5rem;
		margin-bottom: 2rem;
	}

	p {
		font-size: 0.9rem;
		line-height: 1.8rem;
	}

	button {
		position: absolute;
		top: 100%;
		right: 0;
		margin-top: 0.5rem;
		color: ${colors('primary')};
	}
`;

const Content = styled.div`
	${({ hasTooManyChars }) =>
		hasTooManyChars &&
		css`
			height: 200px;
			overflow: hidden;
		`}

	${({ showMore }) =>
		showMore &&
		css`
			height: fit-content;
			overflow: auto;
		`}
`;

export default Description;
