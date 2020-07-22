const { css } = require('styled-components');

const FONT_SIZES = [11, 14, 16, 18, 24, 32, 48, 64, 72, 84];
const FONT_HEIGHTS = [1.7, 1.64, 1.55, 1.48, 1.33, 1.25, 1.1, 1.05, 1];
const FONT_WEIGHTS = [400, 600];

export const fontSize = token => {
	if (!token) {
		return css`
			font-size: ${FONT_SIZES[2] + 'px'};
			line-height: ${FONT_HEIGHTS[2]};
		`;
	}

	return css`
		font-size: ${FONT_SIZES[token - 1] + 'px'};
		line-height: ${FONT_HEIGHTS[token - 1]};
	`;
};

export const fontWeight = (token) => {
	if (!token) return css`font-weight: ${FONT_WEIGHTS[0]};`;
	return css`font-weight: ${FONT_WEIGHTS[token - 1]};`;
};

export const sizeToWeight = (size, weight) => css`
	${fontSize(size)}
	${fontWeight(weight)}
`;
