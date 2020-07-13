import styled, { css } from 'styled-components';
import Hit from './Hit';
import { useEffect } from 'react';

const { connectStateResults, connectHits } = require('react-instantsearch-dom');

const Hits = connectStateResults(({ searchState, hits, input, setInput }) => {
	useEffect(() => {
		if (searchState.query) {
			setInput(true);
		} else {
			setInput(false);
		}
	}, [searchState]);

	return searchState.query && input ? (
		<SearchDropdownLight onClick={e => e.stopPropagation()} input={input}>
			{hits.map(hit => {
				return <Hit hit={hit} key={hit.id} />;
			})}
		</SearchDropdownLight>
	) : null;
});

// Organism - landing page
const SearchDropdownLight = styled.ol`
	background: white;
	position: absolute;
	top: 5;
	overflow-y: scroll;
	height: min(35vh, 400px);
	z-index: 20;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin-top: 0.5rem;
	border-radius: 0.25rem;
	box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);

	${props =>
		props.input &&
		css`
			@media (max-width: 768px) {
				margin-top: 3rem;
			}
		`}
`;

const AlgoliaSearchLight = connectHits(Hits);

export default AlgoliaSearchLight;
