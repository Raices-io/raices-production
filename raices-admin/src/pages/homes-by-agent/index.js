import { isEqual } from 'lodash';
import React, { Fragment, useState } from 'react';
import { withRouter } from 'next/router';
import qs from 'qs';
import algoliasearch from 'algoliasearch/lite';
import { findResultsState } from 'react-instantsearch-dom/server';
import Search from '../../components/homes-by-agent/Search';
import styled from 'styled-components';
import SideNav from '../../components/SideNav';
import Layout from '../../components/Layout';
const searchClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_SEARCH_ID);

const updateAfter = 700;

const createURL = state => `?${qs.stringify(state)}`;

const pathToSearchState = path => (path.includes('?') ? qs.parse(path.substring(path.indexOf('?') + 1)) : {});

const searchStateToURL = searchState => {
	delete searchState.page;
	return searchState ? `${window.location.pathname}?${qs.stringify(searchState)}` : '';
};

const DEFAULT_PROPS = {
	searchClient,
	indexName: 'prod_HOMES',
};

const SearchPage = styled.div`
	display: inline-block;
	vertical-align: top;
	height: 100%;
	width: 100%;
	overflow: auto;
`;

const Page = props => {
	const [lastRouter, setLastRouter] = useState(props.router);
	const [searchState, setSearchState] = useState(props.searchState);
	const [resultsState, setResultsState] = useState(props.resultsState);
	const [hideBottomNav, setHideBottomNav] = useState(false);
	const [modal, setModal] = useState(false);
	const getDerivedStateFromProps = (props, state) => {
		if (!isEqual(lastRouter, router)) {
			return {
				searchState: pathToSearchState(router.asPath),
				lastRouter: router,
			};
		}

		return null;
	};
	const toggleModal = () => {
		setModal(p => !p);
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
		<Fragment>
			<SideNav />
			<Layout>
				<Search
					{...DEFAULT_PROPS}
					searchState={searchState}
					resultsState={resultsState}
					onSearchStateChange={onSearchStateChange}
					createURL={createURL}
					hideBottomNav={hideBottomNav}
					setHideBottomNav={setHideBottomNav}
					modal={modal}
					toggleModal={toggleModal}
				/>
			</Layout>
		</Fragment>
	);
};
Page.getInitialProps = async ({ asPath }) => {
	const searchState = pathToSearchState(asPath);
	const resultsState = await findResultsState(Search, {
		...DEFAULT_PROPS,
		searchState,
	});

	return {
		resultsState,
		searchState,
	};
};
export default withRouter(Page);
