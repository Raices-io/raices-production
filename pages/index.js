import { useState } from 'react';
import { InstantSearch, Configure, SearchBox } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
////
// ** ATOMS **
////

////
// ** MOLECULES **
////
import TabButtonAlgolia from '../components/LandingPage/TabButtonAlgolia';

////
// ** ORGANISMS **
////

// Organism - Algolia Search Light (smaller cards, display on landing page)
import AlgoliaSearchLight from '../components/LandingPage/AlgoliaSearchLight';
// Organism - features and image
import Features from '../components/LandingPage/Features';
import styled, { css } from 'styled-components';
import Link from 'next/link';
// RaicesLogoLight
import RaicesLogoLight from '../components/Logo/RaicesLogoLight';
const searchClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_SEARCH_ID);

import Layout from '../components/Layout';
import colors from '../util/colors';

const HighlightedHeadline = ({ children, highlighted }) => {
	return (
		<h1>
			{children.split(' ').map(word => {
				// If word is in colored array
				if (highlighted.includes(word)) {
					return <span className="color">{word + ' '}</span>;
				} else {
					return word + ' ';
				}
			})}
		</h1>
	);
};

/* Atom - text button */
const TextButton = ({ route, anchor }) => {
	return (
		<Link href={`/${route}`}>
			<div className="container">
				<a className="link">{anchor}</a>
				<svg
					width="29"
					height="14"
					viewBox="0 0 29 14"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M28 7L0.999999 7M22 1L28 7L22 1ZM28 7L22 13L28 7Z"
						stroke="white"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</div>
		</Link>
	);
};

// Organism - search bar with tabbed button
// Needs input boolean
const ContentContainer = styled.div`
	position: relative;
	@media (max-width: 768px) {
		margin-top: 0;
	}

	.container {
		display: flex;
		align-items: center;
		margin-top: 1rem;
		cursor: pointer;
		.link {
			color: white;
			margin-left: 0.25rem;
		}
		svg {
			margin-left: 1rem;
		}
	}

	${props =>
		props.input &&
		css`
			@media (max-width: 768px) {
				h1 {
					display: none;
				}

				.ais-SearchBox-input {
					margin-top: 1rem;
				}

				svg {
					margin-top: 15px;
				}

				.ais-SearchBox-submit {
					margin-left: 1rem;
				}

				input {
					width: 50px;
				}

				.container {
					display: none;
				}
			}
		`}
`;

// Atom - search input
const StyledSearchBox = styled(SearchBox)`
	position: relative;
	z-index: 0;

	.ais-SearchBox-reset {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		margin-right: 1rem;
		fill: #a0aec0;

		svg {
			width: 13px;
			height: 13px;
		}
	}

	.ais-SearchBox-form {
		height: 100%;
		width: fit-content;
	}
	.ais-SearchBox-input {
		padding: 0.5rem 2.5rem;
		border-radius: 5px;
		width: min(550px, 85vw);
		color: #4d4d4d;
		&:focus {
			outline: none;
		}
	}
	.ais-SearchBox-submit {
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		margin-left: 1rem;
		fill: #a0aec0;
		border: none;
		outline: none;
	}
	.ais-SearchBox-submitIcon {
		width: 18px;
		height: 18px;
	}
`;

// Organism - hero with search bar
const HeroContainer = styled.div`
	height: clamp(450px, 35vw, 550px);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-radius: 10px;
	background: linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
		url('/homePage/alexander-andrews-A3DPhhAL6Zg-Crop3-unsplash.jpg');
	background-size: cover;
	background-position: center;
	@media (max-width: 768px) {
		border-radius: 0;
	}

	${props =>
		props.input &&
		css`
			@media (max-width: 768px) {
				justify-content: flex-start;
			}
		`}
`;

const Container = styled.div`
	margin-bottom: 8rem;
`;

// Molecule - header with color accent and responsive logo
const StyledHeaderWithColorAccentAndLogo = styled.div`
	display: flex;
	align-items: center;
	margin-top: 8rem;
	position: relative;
	h1 {
		font-size: clamp(38px, 6vw, 78px);
		line-height: 1.13;
		width: 800px;
		z-index: 5;

		.color {
			font-weight: 500;
			font-family: 'Poppins', sans-serif;
			color: ${colors('primary')};
		}
	}
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

// Atom - divider
const Divider = styled.div`
	width: 100%;
	height: 2px;
	background-color: ${colors('bg.divider')};
	margin: 8rem 0;

	@media (max-width: 1024px) {
		margin: 5rem 0;
	}
	@media (max-width: 768px) {
		margin: 4rem auto;
		width: calc(100% - 2rem);
	}
`;

const Explore = () => {
	const [input, setInput] = useState(false);

	return (
		<Layout input={input}>
			<Container onClick={() => setInput(false)}>
				{/* Organism - hero with search bar */}
				<HeroContainer>
					<InstantSearch indexName="prod_HOMES" searchClient={searchClient}>
						<Configure hitsPerPage={8} />
						{/* Organism - search bar with tabbed button */}
						<ContentContainer input={input}>
							{/* Molecule - tab button type */}
							<TabButtonAlgolia attribute="sale_type" operator="or" limit={2} input={input} />
							{/* Atom - search input */}
							<StyledSearchBox
								translations={{
									placeholder: 'Medellin, Antioquia',
								}}
								onClick={e => {
									setInput(true);
									e.stopPropagation();
								}}
							/>
							{/* Atom - text button */}
							<TextButton route={'propiedades'} anchor={'Propiedades'} />
							{/* Organism - HomeResultHitLight */}
							<AlgoliaSearchLight input={input} setInput={setInput} />
						</ContentContainer>
					</InstantSearch>
				</HeroContainer>

				{/* Molecule - header with color accent and responsive logo */}
				{/* Take a prop string that's the headline */}
				{/* 2nd prop is an array with words that should be highlighted */}
				{/* Component maps over string and applies className="color" if value is in array */}
				{/* Molecule - styled header with color accent and logo */}
				<StyledHeaderWithColorAccentAndLogo>
					{/* Atom - highlighted headline */}
					<HighlightedHeadline highlighted={['mejor', 'comprar', 'propiedad']}>
						Una mejor forma de comprar una propiedad
					</HighlightedHeadline>
					{/* Atom - svg */}
					{/* This could be literally any SVG */}
					<RaicesLogoLight />
				</StyledHeaderWithColorAccentAndLogo>

				{/* Atom - divider */}
				<Divider />
				{/* Organism - features and image */}
				<Features />
				{/* Atom - divider */}
				<Divider />
			</Container>
		</Layout>
	);
};

export default Explore;
