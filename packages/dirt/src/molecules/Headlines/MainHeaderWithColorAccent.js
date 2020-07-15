import React from "react";
import styled from "styled-components";
import HighlightedHeadline from "../../atoms/Headlines/HighlightedHeadline";

const StyledMainHeaderWithColorAccentAndLogo = styled.div`
	display: flex;
	align-items: center;
	margin-top: 8rem;
	position: relative;
	svg {
		position: absolute;
		right: 0;
		width: clamp(400px, 35vw, 600px);
		height: auto;

		@media (max-width: 1024px) {
			display: none;
		}
	}

	@media (max-width: 1024px) {
		margin-top: 5rem;
	}
	@media (max-width: 768px) {
		margin-top: 4rem;
		padding: 0 1rem;
	}
`;
const MainHeaderWithColorAccent = ({ children, headline, highlighted }) => {
	return (
		<StyledMainHeaderWithColorAccentAndLogo>
			{/* Atom - highlighted headline */}
			<HighlightedHeadline highlighted={highlighted}>
				{headline}
			</HighlightedHeadline>
			{/* The child in this case is a SVG */}
			{children}
		</StyledMainHeaderWithColorAccentAndLogo>
	);
};
export default MainHeaderWithColorAccent;
