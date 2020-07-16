import React from 'react';
import styled from 'styled-components';

const Button = ({ children, ...restProps }) => {
	return <TheButton {...restProps}>{children}</TheButton>;

};

const TheButton = styled.button`
	padding: 0.5rem 2rem;
	border-radius: 2px;
	border: none;
	background-color: ${props => props.theme.colors.red};
	cursor: pointer;
`;

export default Button;
