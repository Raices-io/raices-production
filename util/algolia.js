import algoliasearch from 'algoliasearch/lite';
import qs from 'qs';

export const createURL = state => `?${qs.stringify(state)}`;

export const pathToSearchState = path =>
	path.includes('?') ? qs.parse(path.substring(path.indexOf('?') + 1)) : {};

export const searchClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_SEARCH_ID);

export const updateAfter = 700;

export const searchStateToURL = searchState => {
	delete searchState.page;
	return searchState ? `${window.location.pathname}?${qs.stringify(searchState)}` : '';
};

export const DEFAULT_PROPS = {
	searchClient,
	indexName: 'prod_HOMES',
};
