import { InstantSearch, Configure, SearchBox } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import RoomType from './RoomType';
import CustomHits from './CustomHit';
import styled from 'styled-components';
import { useState } from 'react';

const searchClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_SEARCH_ID);

const SearchBar = ({ input, setInput }) => {
	return (
		<InstantSearch indexName="prod_HOMES" searchClient={searchClient}>
			<Configure hitsPerPage={8} />
			<SearchContainer>
				<RoomType attribute="sale_type" operator="or" limit={2} />
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
`;

const StyledSearchBox = styled(SearchBox)`
	position: relative;

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
		width: min(500px, 85vw);
		&:focus {
			border: none;
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
