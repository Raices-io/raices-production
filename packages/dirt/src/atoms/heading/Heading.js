import React from 'react';
import styled, { css } from 'styled-components';
import colors from '../../util/colors';
import { sizeToWeight, fontTag } from '../../patterns/typography';

const baseStyle = (fontSize, mb, color) => css`
	${sizeToWeight(fontSize)}
	color: ${props => color || props.theme?.global?.colors?.text?.body || COLORS.neutral[10]};
	margin: 0;
	margin-bottom: ${mb || 0};

	${props =>
		props.ellipsis &&
		css`
			text-overflow: ellipsis;
			min-width: 0;
			white-space: nowrap;
			overflow: hidden;
		`}

	.dirt-highlight {
		font-weight: 500;
		font-family: ${props => `${props.theme?.global?.fontFamily || `'Poppins', sans-serif`}`};
		color: ${props => props.theme?.global?.colors?.text?.heading || colors('raicesTeal.primary')};
	}
`;

const styleHeading = (fontSize, mb, color) =>
	styled.h1`
		${baseStyle(fontSize, mb, color)}
	`;

export const Heading = ({ children, highlighted = [], fontSize = 7, ellipsis, mb, color, id }) => {
	if (fontSize < 4) throw new Error(`Heading's fontSize must be 5 or higher...`);
	const StyledHeading = styleHeading(fontSize, mb, color);
	const tag = fontTag(fontSize);

	return (
		<StyledHeading as={tag} ellipsis={ellipsis} id={id}>
			{children.split(' ').map((word, index) =>
				highlighted.includes(word) ? (
					<span key={word + index} className="dirt-highlight">
						{word + ' '}
					</span>
				) : (
					word + ' '
				),
			)}
		</StyledHeading>
	);
};
