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
		<SearchDropdown onClick={e => e.stopPropagation()} input={input}>
			{hits.map(hit => (
				<Hit hit={hit} />
			))}
		</SearchDropdown>
	) : null;
});

const SearchDropdown = styled.ol`
	background: white;
	position: absolute;
	top: 5;
	overflow-y: scroll;
	height: 400px;
	z-index: 20;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 0.5rem;
	border-radius: 0.25rem;
	box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);

	.hit:first-child {
		padding-top: 0.2rem;
	}
	.hit {
		flex: 1 1 auto; /* formerly flex: 1 0 auto; */
		width: 97%;
		overflow: hidden; /* new */
		min-height: min-content;
	}

	${props =>
		props.input &&
		css`
			@media (max-width: 768px) {
				margin-top: 3rem;
			}
		`}
`;

const CustomHits = connectHits(Hits);

export default CustomHits;
