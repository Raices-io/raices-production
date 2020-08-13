import React from 'react';
import styled from 'styled-components';

export const Button = ({ children, ...restProps }) => {
	return <BaseButton {...restProps}>{children}</BaseButton>;

};

const BaseButton = styled.button`
	padding: 0.75rem 2rem;
	border-radius: 2px;
	border: none;
	outline: none;
	background-color: ${props => props.theme.global.colors.button};
	cursor: pointer;
`;
