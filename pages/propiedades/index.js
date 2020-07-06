import { useState } from 'react';
import { findResultsState } from 'react-instantsearch-dom/server';
import { isEqual } from 'lodash';
import { useRouter } from 'next/router';

import {
	DEFAULT_PROPS,
	createURL,
	searchStateToURL,
	updateAfter,
	pathToSearchState,
} from '../../util/algolia';

import Search from '../../components/Search/Algolia/Search';
import Layout from '../../components/Layout';

const Page = props => {
	const router = useRouter();

	const [lastRouter, setLastRouter] = useState(router);
	const [searchState, setSearchState] = useState(props.searchState ? props.searchState : {});
	const [resultsState, setResultsState] = useState(props.resultsState);

	const [hideBottomNav, setHideBottomNav] = useState(false);
	const [modal, setModal] = useState(false);

	const isRouteDiff = () => (!isEqual(lastRouter, router) ? true : null);

	const onSearchStateChange = searchState => {
		clearTimeout(debouncedSetState);
		const debouncedSetState = setTimeout(() => {
			const href = searchStateToURL(searchState);
			router.push(href, href, { shallow: true });
		}, updateAfter);

		// Set search state
		setSearchState(p => searchState);
	};

	const toggleModal = () => {
		setModal(p => !p);
	};

	return (
		<Layout modal={modal} hideBottomNav={hideBottomNav}>
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

export default Page;
