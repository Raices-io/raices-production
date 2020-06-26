import { InstantSearch, Configure, SearchBox } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import RoomType from './RoomType';
import CustomHits from './CustomHit';
import styled, { css } from 'styled-components';

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
	}
	.ais-SearchBox-submitIcon {
		width: 18px;
		height: 18px;
	}
`;

export default SearchBar;
