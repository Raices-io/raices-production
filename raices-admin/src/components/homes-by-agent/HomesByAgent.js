import React, { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import Search from './Search';
import { withRouter } from 'next/router';
const searchClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_SEARCH_ID);

const updateAfter = 700;

const createURL = state => `?${qs.stringify(state)}`;

const pathToSearchState = path => (path.includes('?') ? qs.parse(path.substring(path.indexOf('?') + 1)) : {});

const searchStateToURL = searchState => {
	return searchState ? `${window.location.pathname}?${qs.stringify(searchState)}` : '';
};

const DEFAULT_PROPS = {
	searchClient,
	indexName: 'prod_HOMES',
};

const HomesByAgent = props => {
	const [lastRouter, setLastRouter] = useState(props.router);
	const [searchState, setSearchState] = useState(props.searchState);
	const [resultsState, setResultsState] = useState(props.resultsState);

	const getDerivedStateFromProps = (props, state) => {
		if (!isEqual(lastRouter, router)) {
			return {
				searchState: pathToSearchState(router.asPath),
				lastRouter: router,
			};
		}

		return null;
	};
	const onSearchStateChange = searchState => {
		clearTimeout(debouncedSetState);
		const debouncedSetState = setTimeout(() => {
			const href = searchStateToURL(searchState);
			console.log(href);
			props.router.push(href, href, {
				shallow: true,
			});
		}, updateAfter);

		// Set search state
		setSearchState(p => searchState);
	};

	return (
		<Search
			{...DEFAULT_PROPS}
			searchState={searchState}
			resultsState={resultsState}
			onSearchStateChange={onSearchStateChange}
			createURL={createURL}
		/>
	);
};

export default withRouter(HomesByAgent);
