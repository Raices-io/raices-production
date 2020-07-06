import React from 'react';
import styled, { css } from 'styled-components';
import { SearchBox, InstantSearch } from 'react-instantsearch-dom';

import InfiniteHits from '../Algolia/InfiniteHits';
import SearchFilters from '../SearchFilters';
import colors from '../../../util/colors';
import MobileSearchFilters from '../MobileSearchFilters';
import { useStateNavigation } from '../../../context/navigation/NavigationProvider';

export default props => {
	return (
		<Container>
			<InstantSearch
				searchClient={props.searchClient}
				resultsState={props.resultsState}
				onSearchStateChange={props.onSearchStateChange}
				searchState={props.searchState}
				createURL={props.createURL}
				indexName={props.indexName}
				onSearchParameters={props.onSearchParameters}
				{...props}>
				<Heading>Propiedades</Heading>
				<StyledSearchBox
					translations={{
						placeholder: 'Medellin, Antioquia',
					}}
					onClick={e => {
						e.stopPropagation();
						props.setHideBottomNav(p => true);
					}}
					onBlur={() => props.setHideBottomNav(p => false)}
					searchAsYouType={false}
				/>
				<SearchFilters />
				<MobileSearchFilters />
				<InfiniteHits minHitsPerPage={10} />
				{/* bottom nav */}
			</InstantSearch>
		</Container>
	);
};

const Container = styled.div`
	@media (max-width: 768px) {
		padding: 0 1rem;
	}
`;

const Heading = styled.h1`
	font-size: 48px;
	margin-bottom: 1rem;

	@media (max-width: 768px) {
		font-size: 36px;
		margin-bottom: 0.5rem;
	}
`;

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
			width: 10px;
			height: 10px;
		}
	}

	.ais-SearchBox-form {
		height: 100%;
		width: 100%;
		margin-bottom: 1rem;

		@media (max-width: 1025px) {
			margin-bottom: 0.5rem;
		}
	}
	.ais-SearchBox-input {
		padding: 0.25rem 2.5rem;
		border-radius: 5px;
		width: 100%;
		color: #4d4d4d;
		font-size: 0.9rem;
		border: 1px solid ${colors('text.light')};
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
		width: 15px;
		height: 15px;
	}
`;
