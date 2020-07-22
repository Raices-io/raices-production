import React from "react";
import Link from "next/link";
import styled from "styled-components";

const StyledTextButton = styled.div`
	display: flex;
	align-items: center;
	margin-top: 1rem;
	cursor: pointer;
	.link {
		color: white;
		margin-left: 0.25rem;
		margin-bottom: 0;
	}
	svg {
		margin-left: 1rem;
	}
`;

export const TextButtonLink = ({ route, anchor }) => {
	return (
		<Link href={`/${route}`}>
			<StyledTextButton>
				<a className="link">{anchor}</a>
				<svg
					width="29"
					height="14"
					viewBox="0 0 29 14"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M28 7L0.999999 7M22 1L28 7L22 1ZM28 7L22 13L28 7Z"
						stroke="white"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</StyledTextButton>
		</Link>
	);
};
