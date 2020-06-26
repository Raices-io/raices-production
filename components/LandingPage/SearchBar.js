import { InstantSearch, Configure, SearchBox } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import RoomType from './RoomType';
import CustomHits from './CustomHit';
import styled, { css } from 'styled-components';
import Link from 'next/link';

const searchClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_SEARCH_ID);

const SearchBar = ({ input, setInput }) => {
	return (
		<InstantSearch indexName="prod_HOMES" searchClient={searchClient}>
			<Configure hitsPerPage={8} />
			<SearchContainer input={input}>
				<Heading>Una mejor forma de comprar una propiedad</Heading>
				<RoomType attribute="sale_type" operator="or" limit={2} input={input} />
				<StyledSearchBox
					translations={{
						placeholder: 'Medellin, Antioquia',
					}}
					onClick={e => {
						setInput(true);
						e.stopPropagation();
					}}
				/>
				{/* dropdown menu */}
				<Link href="/propiedades">
					<div className="container">
						<a className="link">Propiedades</a>
						<svg
							width="29"
							height="14"
							viewBox="0 0 29 14"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M28 7L0.999999 7M22 1L28 7L22 1ZM28 7L22 13L28 7Z"
								stroke="white"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</div>
				</Link>
				<CustomHits input={input} setInput={setInput} />
			</SearchContainer>
		</InstantSearch>
	);
};

const SearchContainer = styled.div`
	position: relative;
	margin-top: -5rem;

	@media (max-width: 768px) {
		margin-top: 0;
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
			}
		`}

	.container {
		display: flex;
		align-items: center;
		.link {
			color: white;
			margin-left: 0.25rem;
		}
		svg {
			margin-left: 1rem;
		}
	}
`;

const Heading = styled.h1`
	color: white;
	font-family: proxima-nova, sans-serif;
	font-weight: 700;
	font-style: normal;
	font-size: 48px;
	width: min(550px, 85vw);
	line-height: 48px;
	margin-bottom: 3rem;

	text-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

const StyledSearchBox = styled(SearchBox)`
	position: relative;
	z-index: 0;

	.ais-SearchBox-reset {
		/* display: none; */
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
		width: min(550px, 95vw);
		color: #4d4d4d;
		margin-bottom: 1rem;
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
	}
	.ais-SearchBox-submitIcon {
		width: 18px;
		height: 18px;
	}
`;

export default SearchBar;
