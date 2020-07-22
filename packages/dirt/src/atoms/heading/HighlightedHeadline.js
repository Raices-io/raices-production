import React from "react";
import styled from "styled-components";
import colors from "../../util/colors";

const StyledHighlightedHeadline = styled.h1`
	font-size: clamp(38px, 6vw, 78px);
	line-height: 1.13;
	width: 800px;
	z-index: 5;
	.color {
		font-weight: 500;
		font-family: "Poppins", sans-serif;
		color: ${colors("primary")};
	}
`;

export const HighlightedHeadline = ({ children, highlighted }) => {
	return (
		<StyledHighlightedHeadline>
			{children.split(" ").map(word => {
				// If word is in colored array
				if (highlighted.includes(word)) {
					return <span className="color">{word + " "}</span>;
				} else {
					return word + " ";
				}
			})}
		</StyledHighlightedHeadline>
	);
};
