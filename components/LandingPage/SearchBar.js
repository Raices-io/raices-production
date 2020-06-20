import { InstantSearch, Configure, SearchBox } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import RoomType from './RoomType';
import CustomHits from './CustomHit';
import styled from 'styled-components';

const searchClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_SEARCH_ID);

const SearchBar = ({ input, setInput }) => {
	return (
		<InstantSearch indexName="prod_HOMES" searchClient={searchClient}>
			<Configure hitsPerPage={8} />
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
		</InstantSearch>
	);
};

const StyledSearchBox = styled(SearchBox)`
	width: 500px;
	border: 1px solid red;
	padding: 1rem;
`;

export default SearchBar;
