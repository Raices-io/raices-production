import React from 'react';
import styled from 'styled-components';

const Button = ({ children }) => {
	return <TheButton>{children}</TheButton>;
};

const TheButton = styled.button`
	padding: 1rem 2rem;
	border-radius: 10px;
	border: none;
	background-color: gray;
`;

export default Button;
