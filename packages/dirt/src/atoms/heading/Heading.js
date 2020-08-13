import React from 'react';
import styled, { css } from 'styled-components';
import colors from '../../util/colors';
import { sizeToWeight, fontTag } from '../../patterns/typography';
import { COLORS } from '../../patterns/colors';
import { toSpace, toArray } from '../../patterns/space';

const baseStyle = (fontSize, mb, color) => css`
	${sizeToWeight(fontSize)}
	color: ${props => color || props.theme?.global?.colors?.text?.heading || COLORS.neutral[10]};
	margin: 0;
	margin-bottom: ${toSpace(toArray(mb))};

	@media (max-width: 1024px) {
		margin-bottom: ${toSpace(toArray(mb - 2))};
	}

	${props =>
		props.as === 'h1' &&
		css`
			@supports (font-size: clamp(38px, 6vw, 78px)) {
				font-size: clamp(38px, 6vw, 78px);
			}
		`}

	${props =>
		props.as === 'h2' &&
		css`
			@supports (font-size: clamp(1.75rem, 3vw, 3rem)) {
				font-size: clamp(1.75rem, 3vw, 3rem);
			}
		`}

	${props =>
		props.as === 'h3' &&
		css`
			@supports (font-size: clamp(1.4rem, 1.75vw, 1.75rem)) {
				font-size: clamp(1.4rem, 1.75vw, 1.75rem);
			}
		`}

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
		color: ${props => props.theme?.global?.colors?.text?.accent || colors('raicesTeal.primary')};
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
	console.log(tag);

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
