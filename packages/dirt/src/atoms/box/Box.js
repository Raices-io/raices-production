import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { setSpace } from '../../patterns/space';

export const Box = forwardRef(({ children, ...props }, ref) => {
	return (
		<BaseBox ref={ref} {...props}>
			{children}
		</BaseBox>
	);
});

const BaseBox = styled.div`
	${({
		m,
		mx,
		my,
		p,
		py,
		px,
		display,
		gridGap,
		gridCol,
		gridRow,
		gridAreas,
		gridArea,
		grid,
		justifyContent,
		justifyItems,
		alignContent,
		alignItems,
		border,
		position,
		width,
		minWidth,
		maxWidth,
		height,
		maxHeight,
		minHeight,
	}) => {
		return css`
			margin: ${setSpace(m, mx, my)};
			padding: ${setSpace(p, px, py)};
			display: ${display};
			grid-gap: ${gridGap};
			grid-template-columns: ${gridCol};
			grid-template-rows: ${gridRow};
			grid-template-areas: ${gridAreas};
			grid-area: ${gridArea};
			grid: ${grid};
			justify-content: ${justifyContent};
			justify-items: ${justifyItems};
			align-content: ${alignContent};
			align-items: ${alignItems};
			border: ${border};
			position: ${position};
			width: ${width};
			min-width: ${minWidth};
			max-width: ${maxWidth};
			height: ${height};
			min-height: ${minHeight};
			max-height: ${maxHeight};
		`;
	}}
`;
