import React from 'react';
import { Highlight } from 'react-instantsearch-dom';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import Link from 'next/link';

const StyledHit = styled.div`
	box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	background: white;
	border-radius: 4px;
	.uid {
		white-space: wrap;
	}
`;
const Hit = ({ hit, updateAgent }) => (
	<StyledHit onClick={() => updateAgent(hit.uid, hit.displayName, hit.email, hit.profilePic)}>
		{/* <img className="home-image" src={`https://api.adorable.io/avatars/285/${hit.email}.png`} /> */}
		<p>{hit.displayName}</p>
		<p>{hit.email}</p>
	</StyledHit>
);

export default Hit;
