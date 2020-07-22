import React from 'react';
import styled, { css } from 'styled-components';
import { sizeToWeight } from '../../patterns/typography';
import { COLORS } from '../../patterns/colors';

const baseStyle = size => css`
	${sizeToWeight(size)}
	color: ${props => props.theme?.global?.colors?.text?.body || COLORS.neutral[10]};
`;

const styleText = size => styled.p`
	${baseStyle(size)}
	${props =>
		props.ellipsis &&
		css`
			text-overflow: ellipsis;
			min-width: 0;
			white-space: nowrap;
			overflow: hidden;
		`}
`;

export const Text = React.forwardRef(({ children, size, ellipsis }, ref) => {
	const StyledText = styleText(size);

	return (
		<StyledText ref={ref} ellipsis={ellipsis}>
			{children}
		</StyledText>
	);
});
