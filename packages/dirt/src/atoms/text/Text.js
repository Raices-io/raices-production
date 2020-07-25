import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { sizeToWeight } from '../../patterns/typography';
import { COLORS } from '../../patterns/colors';

const baseStyle = fontSize => css`
	${sizeToWeight(fontSize)}
	color: ${props => props.theme?.global?.colors?.text?.body || COLORS.neutral[10]};

	${props =>
		props.ellipsis &&
		css`
			text-overflow: ellipsis;
			min-width: 0;
			white-space: nowrap;
			overflow: hidden;
		`}
`;

const styleText = fontSize => styled.p`
	${baseStyle(fontSize)}
`;

export const Text = forwardRef(({ children, fontSize, ellipsis, id }, ref) => {
	const StyledText = styleText(fontSize);

	return (
		<StyledText ref={ref} ellipsis={ellipsis} id={id}>
			{children}
		</StyledText>
	);
});
